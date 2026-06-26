const CONFIG = require('./config.js');

function getBaselineQx(age, sex) {
  const table = CONFIG.lifeTable[sex];
  let low = table[0], high = table[table.length - 1];
  
  for (let i = 0; i < table.length - 1; i++) {
    if (age >= table[i].age && age < table[i+1].age) {
      low = table[i]; 
      high = table[i+1]; 
      break;
    }
  }
  
  if (age >= high.age) return high.qx;
  
  const ratio = (age - low.age) / (high.age - low.age);
  return low.qx + ratio * (high.qx - low.qx);
}

function calculateRisk(data) {
  const age = data.age || 30;
  const sex = data.sex || 'male';
  const qx = getBaselineQx(age, sex);

  let diseaseRR = 1.0;
  const diseaseDetails = {};

  if (data.hypertension > 0) {
    const rr = CONFIG.diseaseRR.hypertension[data.hypertension];
    diseaseRR *= rr;
    diseaseDetails['高血压'] = rr;
  }

  if (data.diabetes === 'type1') {
    diseaseRR *= CONFIG.diseaseRR.diabetes_type1;
    diseaseDetails['1型糖尿病'] = CONFIG.diseaseRR.diabetes_type1;
  } else if (data.diabetes === 'type2') {
    diseaseRR *= CONFIG.diseaseRR.diabetes_type2;
    diseaseDetails['2型糖尿病'] = CONFIG.diseaseRR.diabetes_type2;
  }

  if (data.hasCHD) { diseaseRR *= CONFIG.diseaseRR.coronary_heart; diseaseDetails['冠心病'] = CONFIG.diseaseRR.coronary_heart; }
  if (data.hasStroke) { diseaseRR *= CONFIG.diseaseRR.stroke; diseaseDetails['脑卒中'] = CONFIG.diseaseRR.stroke; }
  if (data.hasCOPD) { diseaseRR *= CONFIG.diseaseRR.copd; diseaseDetails['COPD'] = CONFIG.diseaseRR.copd; }
  if (data.hasCancer) { diseaseRR *= CONFIG.diseaseRR.cancer_dx; diseaseDetails['恶性肿瘤'] = CONFIG.diseaseRR.cancer_dx; }
  if (data.hasLiverCirrhosis) { diseaseRR *= CONFIG.diseaseRR.liver_cirrhosis; diseaseDetails['肝硬化'] = CONFIG.diseaseRR.liver_cirrhosis; }
  if (data.hasCKD) { diseaseRR *= CONFIG.diseaseRR.ckd; diseaseDetails['慢性肾病'] = CONFIG.diseaseRR.ckd; }
  if (data.hasHeartFailure) { diseaseRR *= CONFIG.diseaseRR.heartfailure; diseaseDetails['心力衰竭'] = CONFIG.diseaseRR.heartfailure; }

  const smoke = data.smoke || 'never';
  const cigarettes = data.cigarettes || 0;
  let smokeRR = 1.0;

  if (smoke === 'current') {
    const intensity = cigarettes <= 10 ? 'light' : (cigarettes <= 20 ? 'moderate' : 'heavy');
    smokeRR = CONFIG.smokingRR.all_cause_current[intensity];
  } else if (smoke === 'former') {
    smokeRR = CONFIG.smokingRR.all_cause_former;
  }

  const alcohol = data.alcohol || 'none';
  const alcoholRR = CONFIG.alcoholRR[alcohol] || 1.0;

  const exercise = data.exercise || 0;
  let exerciseRR = 1.0;
  if (exercise < 30) exerciseRR = CONFIG.exerciseRR.levels[0];
  else if (exercise < 75) exerciseRR = CONFIG.exerciseRR.levels[1];
  else if (exercise < 150) exerciseRR = CONFIG.exerciseRR.levels[2];
  else if (exercise < 300) exerciseRR = CONFIG.exerciseRR.levels[3];
  else exerciseRR = CONFIG.exerciseRR.levels[4];

  const height = (data.height || 170) / 100;
  const weight = data.weight || 65;
  const bmi = height > 0 ? weight / (height * height) : 22;
  let bmiRR = 1.0;
  if (bmi < 18.5) bmiRR = 1.3;
  else if (bmi < 25) bmiRR = 1.0;
  else if (bmi < 28) bmiRR = 1.15;
  else if (bmi < 32) bmiRR = 1.4;
  else bmiRR = 1.8;

  const occupation = data.occupation || 'office';
  const occRR = CONFIG.occupationRR[occupation] || 1.0;

  const commute = data.commute || 'walk';
  const commuteRR = CONFIG.commuteRR[commute] || 1.0;

  const safety = data.safety || 'good';
  const safetyRR = CONFIG.safetyRR[safety] || 1.0;

  const airQuality = data.airQuality || 'moderate';
  const airRR = {good:1.0, moderate:1.08, poor:1.20, very_poor:1.35}[airQuality] || 1.0;

  const income = data.income || 'medium';
  const incomeRR = {poverty:1.35, low:1.2, medium_low:1.1, medium:1.0, medium_high:0.95, high:0.90, very_high:0.88}[income] || 1.0;

  const marriage = data.marriage || 'married';
  const marriageRR = {married:1.0, single:1.2, divorced:1.3, widowed:1.4}[marriage] || 1.0;

  const sleep = data.sleep || 7;
  let sleepRR = 1.0;
  if (sleep < 5) sleepRR = 1.35;
  else if (sleep < 6) sleepRR = 1.15;
  else if (sleep <= 8) sleepRR = 1.0;
  else if (sleep <= 9) sleepRR = 1.05;
  else sleepRR = 1.2;

  const totalRR = diseaseRR * smokeRR * alcoholRR * exerciseRR * bmiRR * occRR * commuteRR * safetyRR * airRR * incomeRR * marriageRR * sleepRR;
  const totalAnnualDeathProb = Math.min(qx * totalRR, 0.95);

  function nYearDeathProb(n) {
    return 1 - Math.pow(1 - totalAnnualDeathProb, n);
  }

  function estimateRemainingLife(currentAge, annualDeathRate) {
    let survival = 1.0;
    for (let y = 1; y <= 100; y++) {
      const ageAdjustedRate = annualDeathRate * Math.pow(1.05, y);
      survival *= (1 - Math.min(ageAdjustedRate, 0.95));
      if (survival < 0.5) return y;
    }
    return 100;
  }

  const remainingLife = estimateRemainingLife(age, totalAnnualDeathProb);
  const avgAnnualRate = qx;
  const riskRatio = totalAnnualDeathProb / Math.max(avgAnnualRate, 0.00001);

  const modifiable = [];
  if (smoke === 'current') {
    modifiable.push({factor: '戒烟', years: (remainingLife * 0.1).toFixed(1)});
  }
  if (exercise < 150) {
    modifiable.push({factor: '增加运动', years: (remainingLife * 0.05).toFixed(1)});
  }
  if (bmi >= 28) {
    modifiable.push({factor: '控制体重', years: (remainingLife * 0.04).toFixed(1)});
  }

  const causeProbs = CONFIG.causes.map(c => {
    const prob = qx * c.share * totalRR;
    return {name: c.name, cat: c.cat, prob: Math.min(prob, 0.95)};
  }).sort((a, b) => b.prob - a.prob);

  return {
    age,
    sex,
    remainingLife: remainingLife.toFixed(1),
    p1: nYearDeathProb(1),
    p5: nYearDeathProb(5),
    p10: nYearDeathProb(10),
    p20: nYearDeathProb(20),
    riskRatio: riskRatio.toFixed(1),
    totalAnnualRate: totalAnnualDeathProb,
    causes: causeProbs.slice(0, 10),
    modifiable,
    diseaseDetails
  };
}

module.exports = {
  calculateRisk
};
