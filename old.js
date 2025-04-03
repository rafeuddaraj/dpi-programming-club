function parseResultData(text) {
  const result = {
    passed: [],
    referred: [],
    semester: "6th Semester",
    institute: "Bangladesh Technical Education Board",
  };

  // পাস করা শিক্ষার্থীদের ডাটা বের করা
  const passedRegex = /(\d{6})\s*\(\s*([\d.]+)\s*\)/g;
  let match;
  while ((match = passedRegex.exec(text)) !== null) {
    result.passed.push({ roll: match[1], cgpa: parseFloat(match[2]) });
  }

  // রেফার্ড শিক্ষার্থীদের ডাটা বের করা
  const referredRegex = /(\d{6})\s*\{\s*([\d\s(),T]+)\s*\}/g;
  while ((match = referredRegex.exec(text)) !== null) {
    const subjects = match[2].split(",").map((s) => s.trim());
    result.referred.push({ roll: match[1], subjects });
  }

  return result;
}

// ইনপুট টেক্সট
const inputText = `2
It is to be notified all concerned that roll numbers who have passed in all subjects in the 6th semester examination of Diploma in Textile Engineering 2024, held in December-2024,
January-2025 are listed bellow in accordance with the 4 years Diploma in Textile Engineering curriculum regulation - 2022, of the board.

It is to be notified all concerned that roll numbers who have failed upto three subjects in the 6th semester examination of Diploma in Textile Engineering 2024, held in December-2024,
January-2025 are listed bellow in accordance with the 4 years Diploma in Textile Engineering curriculum regulation - 2022, of the board. These examinees are permitted to appear in all
failed subjects in the next examination as irregular examinees.
247037 ( 2.88 ) 247038 ( 3.15 ) 247041 ( 3.31 ) 247042 ( 3.81 )
247043 ( 3.35 ) 247044 ( 3.21 ) 247045 ( 3.54 ) 247046 ( 3.85 )
247047 ( 3.18 ) 247048 ( 3.10 ) 247051 ( 3.29 ) 247054 ( 3.10 )
247055 ( 2.75 ) 247057 ( 2.60 ) 247060 ( 2.85 ) 247068 ( 3.85 )
247069 ( 2.75 ) 247071 ( 3.05 ) 247074 ( 3.89 ) 247075 ( 3.23 )
247082 ( 3.24 ) 247083 ( 3.68 ) 247085 ( 4.00 ) 247086 ( 3.97 )
247087 ( 3.36 ) 247088 ( 3.27 ) 247091 ( 3.90 ) 247092 ( 3.93 )
247093 ( 2.95 ) 247094 ( 3.02 ) 247095 ( 3.61 ) 247096 ( 3.43 )
247098 ( 3.33 ) 247099 ( 3.18 ) 247100 ( 3.08 ) 247101 ( 3.14 )
247103 ( 3.50 ) 247104 ( 3.43 ) 247106 ( 3.30 ) 247107 ( 2.89 )
247108 ( 3.00 ) 247109 ( 3.27 ) 247110 ( 2.90 ) 247111 ( 3.70 )
247112 ( 3.47 ) 247113 ( 3.98 ) 247114 ( 2.92 ) 247115 ( 3.22 )
247116 ( 3.72 ) 247117 ( 3.97 ) 247118 ( 3.65 ) 247119 ( 3.33 )
247120 ( 3.32 ) 247121 ( 3.24 ) 247122 ( 3.88 ) 247123 ( 3.59 )
247124 ( 3.82 ) 247126 ( 3.63 ) 247127 ( 3.34 ) 247128 ( 3.20 )
247129 ( 3.25 ) 247131 ( 3.01 ) 247133 ( 3.23 ) 247134 ( 3.27 )
247135 ( 2.99 ) 247136 ( 3.21 ) 247137 ( 3.24 ) 247139 ( 2.76 )
247142 ( 2.63 ) 247143 ( 2.83 ) 247147 ( 2.95 ) 247149 ( 2.58 )
247150 ( 3.60 ) 247151 ( 3.00 ) 247152 ( 3.36 ) 247153 ( 3.93 )
247154 ( 2.83 ) 247155 ( 3.36 ) 247157 ( 3.87 ) 247160 ( 3.51 )
247161 ( 3.01 ) 247162 ( 3.52 ) 247163 ( 3.00 ) 247164 ( 2.95 )
247166 ( 3.54 ) 247169 ( 3.02 ) 247170 ( 2.83 ) 247171 ( 2.99 )
247172 ( 2.98 ) 247174 ( 3.19 ) 247175 ( 3.52 ) 247176 ( 3.18 )
247177 ( 2.48 ) 247178 ( 3.82 ) 247181 ( 3.69 ) 247190 ( 3.50 )
247192 ( 2.90 ) 247193 ( 3.74 ) 247194 ( 3.78 ) 247195 ( 3.21 )
247196 ( 3.98 ) 247197 ( 3.48 ) 247198 ( 3.46 ) 247199 ( 3.28 )
247200 ( 3.46 ) 247201 ( 3.88 ) 247203 ( 3.86 ) 247204 ( 3.40 )
247207 ( 3.05 ) 247208 ( 3.43 ) 247210 ( 4.00 ) 247211 ( 3.38 )
247212 ( 2.96 ) 247214 ( 3.83 ) 247215 ( 2.96 ) 247218 ( 3.70 )
247219 ( 4.00 ) 247221 ( 3.18 ) 247223 ( 3.45 ) 247224 ( 3.36 )
247225 ( 3.28 ) 247226 ( 3.34 ) 247228 ( 3.23 ) 250418 ( 3.71 )
250469 ( 3.39 ) 253876 ( 3.13 ) 253957 ( 3.38 ) 254104 ( 3.39 )
254167 ( 3.46 ) 254168 ( 2.70 )

247040 { 21161 (T), 21462 (T) } 247049 { 21161 (T), 21262 (T), 21462

(T) }

247050 { 21161 (T), 21462 (T) } 247053 { 29041 (T) }

247056 { 21161 (T), 21262 (T), 21462
(T) }

247058 { 21161 (T), 21462 (T), 21761
(T) }

247059 { 21161 (T), 29041 (T) } 247064 { 21161 (T), 21262 (T) }
247066 { 21161 (T) } 247072 { 21161 (T) } 247076 { 21161 (T) } 247080 { 21161 (T), 21262 (T), 21761

(T) }

247097 { 29041 (T) } 247140 { 21164 (T), 29041 (T) } 247156 { 21164 (T), 29041 (T) } 247158 { 21161 (T), 21164 (T) }
247159 { 21164 (T) } 247165 { 21164 (T) } 247173 { 21164 (T) } 247182 { 21362 (T) }
247183 { 21161 (T), 21362 (T) } 247186 { 21161 (T) } 247187 { 21362 (T) } 247188 { 21362 (T) }

Bangladesh Technical Education Board
Office of the Controller of Examinations
Agargaon, Sherebangla Nagar, Dhaka-1207

Diploma in Textile Engineering 6th Semester Examination, 2024 (Held in December-2024, January-2025`;

const parsedResult = parseResultData(inputText);
console.log(parsedResult);
