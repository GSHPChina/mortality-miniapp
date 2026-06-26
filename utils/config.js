const CONFIG = {
  lifeTable: {
    male: [
      {age:0, qx:0.00287}, {age:1, qx:0.00177}, {age:5, qx:0.00057},
      {age:10, qx:0.00042}, {age:15, qx:0.00059}, {age:20, qx:0.00090},
      {age:25, qx:0.00105}, {age:30, qx:0.00133}, {age:35, qx:0.00190},
      {age:40, qx:0.00310}, {age:45, qx:0.00490}, {age:50, qx:0.00780},
      {age:55, qx:0.01280}, {age:60, qx:0.02200}, {age:65, qx:0.03600},
      {age:70, qx:0.05800}, {age:75, qx:0.09500}, {age:80, qx:0.15500},
      {age:85, qx:0.25000}, {age:90, qx:0.38000}, {age:95, qx:0.52000},
      {age:100, qx:0.70000}
    ],
    female: [
      {age:0, qx:0.00227}, {age:1, qx:0.00133}, {age:5, qx:0.00041},
      {age:10, qx:0.00031}, {age:15, qx:0.00038}, {age:20, qx:0.00052},
      {age:25, qx:0.00058}, {age:30, qx:0.00080}, {age:35, qx:0.00120},
      {age:40, qx:0.00200}, {age:45, qx:0.00320}, {age:50, qx:0.00500},
      {age:55, qx:0.00800}, {age:60, qx:0.01400}, {age:65, qx:0.02300},
      {age:70, qx:0.03900}, {age:75, qx:0.06800}, {age:80, qx:0.11800},
      {age:85, qx:0.20000}, {age:90, qx:0.32000}, {age:95, qx:0.47000},
      {age:100, qx:0.65000}
    ]
  },

  diseaseRR: {
    hypertension: [1.0, 1.5, 2.0, 3.0],
    diabetes_type1: 3.0,
    diabetes_type2: 1.8,
    coronary_heart: 2.5,
    stroke: 2.0,
    copd: 2.5,
    asthma: 1.2,
    cancer_dx: 5.0,
    liver_cirrhosis: 4.0,
    ckd: 2.5,
    hiv: 1.8,
    hepatitis: 1.5,
    tuberculosis: 1.8,
    depression: 1.5,
    heartfailure: 3.5,
    family_cancer_one: 1.2,
    family_cancer_multi: 1.5,
    genetic_mutation: 1.5
  },

  smokingRR: {
    all_cause_current: {light: 1.5, moderate: 2.0, heavy: 2.8},
    all_cause_former: 1.3,
    cessation_decay: 0.04
  },

  alcoholRR: {
    none: 1.0,
    occasional: 0.95,
    moderate: 1.1,
    heavy: 1.6
  },

  exerciseRR: {
    levels: [1.3, 1.15, 1.05, 1.0, 1.0]
  },

  occupationRR: {
    office: 1.0, teacher: 0.95, service: 1.05, healthcare: 1.0,
    construction: 1.8, agriculture: 1.3, transport: 1.6, factory: 1.3,
    chemical: 1.4, military: 1.5, it: 1.0, finance: 1.0,
    freelance: 1.05, retired: 1.0, student: 1.0, unemployed: 1.2, homemaker: 1.0
  },

  commuteRR: {walk: 1.0, public: 1.0, car: 1.1, motorcycle: 2.5, taxi: 1.05},
  safetyRR: {good: 1.0, moderate: 1.05, poor: 1.15},

  causes: [
    {id:'i25', name:'缺血性心脏病', cat:'心血管', share:0.1450},
    {id:'i63', name:'脑卒中', cat:'心血管', share:0.1150},
    {id:'i50', name:'心力衰竭', cat:'心血管', share:0.0250},
    {id:'i10', name:'高血压性心脏病', cat:'心血管', share:0.0200},
    {id:'i64', name:'出血性脑卒中', cat:'心血管', share:0.0280},
    {id:'i20', name:'急性心肌梗死', cat:'心血管', share:0.0300},
    {id:'c_lung', name:'肺癌', cat:'恶性肿瘤', share:0.0570},
    {id:'c_liver', name:'肝癌', cat:'恶性肿瘤', share:0.0320},
    {id:'c_stomach', name:'胃癌', cat:'恶性肿瘤', share:0.0280},
    {id:'c_colon', name:'结直肠癌', cat:'恶性肿瘤', share:0.0180},
    {id:'c_esophagus', name:'食管癌', cat:'恶性肿瘤', share:0.0150},
    {id:'c_pancreas', name:'胰腺癌', cat:'恶性肿瘤', share:0.0100},
    {id:'c_breast', name:'乳腺癌', cat:'恶性肿瘤', share:0.0080},
    {id:'c_leukemia', name:'白血病', cat:'恶性肿瘤', share:0.0070},
    {id:'j44', name:'COPD', cat:'呼吸系统', share:0.0500},
    {id:'j18', name:'肺炎', cat:'呼吸系统', share:0.0200},
    {id:'k74', name:'肝硬化', cat:'消化系统', share:0.0100},
    {id:'e11', name:'2型糖尿病', cat:'内分泌代谢', share:0.0200},
    {id:'n18', name:'慢性肾脏病', cat:'泌尿生殖', share:0.0100},
    {id:'g30', name:'阿尔茨海默病', cat:'神经系统', share:0.0180},
    {id:'v00', name:'交通事故', cat:'意外伤害', share:0.0250},
    {id:'w00', name:'跌倒', cat:'意外伤害', share:0.0120},
    {id:'x60', name:'自杀/自伤', cat:'精神行为', share:0.0120},
    {id:'b20', name:'HIV/AIDS', cat:'传染病', share:0.0030},
    {id:'a15', name:'结核病', cat:'传染病', share:0.0040}
  ]
};

module.exports = CONFIG;
