import { EntityTypes } from "@bullhorn/bullhorn-types";
import axios from "axios";

export const mainEntities = [
  EntityTypes.Candidate,
  EntityTypes.ClientContact,
  EntityTypes.JobOrder,
  EntityTypes.Placement,
  EntityTypes.Appointment,
  EntityTypes.Sendout,
  EntityTypes.JobSubmission,
  EntityTypes.Note,
  EntityTypes.ClientCorporation,
  EntityTypes.Lead,
  EntityTypes.Opportunity,
  EntityTypes.Task,
];

export const isSearchable = (entity: string): boolean => {
  return (
    [
      "Candidate",
      "ClientContact",
      "ClientCorporation",
      "JobOrder",
      "Opportunity",
      "JobSubmission",
      "Placement",
      "Note",
      "Task",
    ].indexOf(entity) >= 0
  );
};

export const getTotal = async (
  e: string,
  restUrl: string,
  BhRestToken: string
): Promise<number> => {
  const method = isSearchable(e) ? "search" : "query";
  const filter = isSearchable(e) ? "query=id[* TO *]" : "where=id>0";
  const queryPath = `${method}/${e}?${filter}&fields=id&count=1&totalOnly=true`;
  const instance = axios.create({ baseURL: restUrl, params: { BhRestToken } });
  const { data } = await instance.get<{ total: number }>(queryPath);
  return data.total as number;
};

export const countries = [
  {
    value: 2378,
    label: "- None Specified -",
  },
  {
    value: 2185,
    label: "Afghanistan",
  },
  {
    value: 2407,
    label: "Åland Islands",
  },
  {
    value: 2186,
    label: "Albania",
  },
  {
    value: 2187,
    label: "Algeria",
  },
  {
    value: 2408,
    label: "American Samoa",
  },
  {
    value: 2188,
    label: "Andorra",
  },
  {
    value: 2189,
    label: "Angola",
  },
  {
    value: 2409,
    label: "Anguilla",
  },
  {
    value: 2190,
    label: "Antarctica",
  },
  {
    value: 2191,
    label: "Antigua and Barbuda",
  },
  {
    value: 2192,
    label: "Argentina",
  },
  {
    value: 2193,
    label: "Armenia",
  },
  {
    value: 2373,
    label: "Aruba",
  },
  {
    value: 2194,
    label: "Australia",
  },
  {
    value: 2195,
    label: "Austria",
  },
  {
    value: 2196,
    label: "Azerbaijan",
  },
  {
    value: 2197,
    label: "Bahamas",
  },
  {
    value: 2198,
    label: "Bahrain",
  },
  {
    value: 2199,
    label: "Bangladesh",
  },
  {
    value: 2200,
    label: "Barbados",
  },
  {
    value: 2201,
    label: "Belarus",
  },
  {
    value: 2202,
    label: "Belgium",
  },
  {
    value: 2203,
    label: "Belize",
  },
  {
    value: 2204,
    label: "Benin",
  },
  {
    value: 2372,
    label: "Bermuda",
  },
  {
    value: 2205,
    label: "Bhutan",
  },
  {
    value: 2206,
    label: "Bolivia; Plurinational State",
  },
  {
    value: 2449,
    label: "Bonaire",
  },
  {
    value: 2207,
    label: "Bosnia and Herzegovina",
  },
  {
    value: 2208,
    label: "Botswana",
  },
  {
    value: 2410,
    label: "Bouvet Island",
  },
  {
    value: 2209,
    label: "Brazil",
  },
  {
    value: 2411,
    label: "British Indian Ocean Territory",
  },
  {
    value: 2210,
    label: "Brunei Darussalam",
  },
  {
    value: 2211,
    label: "Bulgaria",
  },
  {
    value: 2212,
    label: "Burkina Faso",
  },
  {
    value: 2385,
    label: "Burma",
  },
  {
    value: 2213,
    label: "Burundi",
  },
  {
    value: 2214,
    label: "Cambodia",
  },
  {
    value: 2215,
    label: "Cameroon",
  },
  {
    value: 2216,
    label: "Canada",
  },
  {
    value: 2217,
    label: "Cape Verde",
  },
  {
    value: 2379,
    label: "Cayman Islands",
  },
  {
    value: 2218,
    label: "Central African Republic",
  },
  {
    value: 2219,
    label: "Chad",
  },
  {
    value: 2386,
    label: "Channel Islands",
  },
  {
    value: 2220,
    label: "Chile",
  },
  {
    value: 2221,
    label: "China",
  },
  {
    value: 2412,
    label: "Christmas Island",
  },
  {
    value: 2413,
    label: "Cocos (Keeling) Islands",
  },
  {
    value: 2222,
    label: "Colombia",
  },
  {
    value: 2223,
    label: "Comoros",
  },
  {
    value: 2368,
    label: "Congo; Democratic Republic of",
  },
  {
    value: 2383,
    label: "Congo; Republic of",
  },
  {
    value: 2414,
    label: "Cook Islands",
  },
  {
    value: 2226,
    label: "Costa Rica",
  },
  {
    value: 2227,
    label: "Cote D'Ivoire",
  },
  {
    value: 2228,
    label: "Croatia",
  },
  {
    value: 2229,
    label: "Cuba",
  },
  {
    value: 2387,
    label: "Curacao",
  },
  {
    value: 2230,
    label: "Cyprus",
  },
  {
    value: 2231,
    label: "Czech Republic",
  },
  {
    value: 2232,
    label: "Denmark",
  },
  {
    value: 2233,
    label: "Djibouti",
  },
  {
    value: 2234,
    label: "Dominica",
  },
  {
    value: 2235,
    label: "Dominican Republic",
  },
  {
    value: 2236,
    label: "Ecuador",
  },
  {
    value: 2237,
    label: "Egypt",
  },
  {
    value: 2238,
    label: "El Salvador",
  },
  {
    value: 2239,
    label: "Equatorial Guinea",
  },
  {
    value: 2240,
    label: "Eritrea",
  },
  {
    value: 2241,
    label: "Estonia",
  },
  {
    value: 2343,
    label: "Eswatini",
  },
  {
    value: 2242,
    label: "Ethiopia",
  },
  {
    value: 2415,
    label: "Falkland Islands (Malvinas)",
  },
  {
    value: 2388,
    label: "Faroe Islands",
  },
  {
    value: 2243,
    label: "Fiji",
  },
  {
    value: 2244,
    label: "Finland",
  },
  {
    value: 2245,
    label: "France",
  },
  {
    value: 2416,
    label: "French Guiana",
  },
  {
    value: 2417,
    label: "French Polynesia",
  },
  {
    value: 2418,
    label: "French Southern Territories",
  },
  {
    value: 2246,
    label: "Gabon",
  },
  {
    value: 2389,
    label: "Gambia",
  },
  {
    value: 2248,
    label: "Georgia",
  },
  {
    value: 2249,
    label: "Germany",
  },
  {
    value: 2250,
    label: "Ghana",
  },
  {
    value: 2390,
    label: "Gibraltar",
  },
  {
    value: 2251,
    label: "Greece",
  },
  {
    value: 2252,
    label: "Greenland",
  },
  {
    value: 2253,
    label: "Grenada",
  },
  {
    value: 2419,
    label: "Guadeloupe",
  },
  {
    value: 2376,
    label: "Guam",
  },
  {
    value: 2371,
    label: "Guatemala",
  },
  {
    value: 2420,
    label: "Guernsey",
  },
  {
    value: 2255,
    label: "Guinea",
  },
  {
    value: 2256,
    label: "Guinea-Bissau",
  },
  {
    value: 2257,
    label: "Guyana",
  },
  {
    value: 2258,
    label: "Haiti",
  },
  {
    value: 2421,
    label: "Heard and McDonald Islands",
  },
  {
    value: 2362,
    label: "Holy See (Vatican City State)",
  },
  {
    value: 2259,
    label: "Honduras",
  },
  {
    value: 2377,
    label: "Hong Kong",
  },
  {
    value: 2260,
    label: "Hungary",
  },
  {
    value: 2261,
    label: "Iceland",
  },
  {
    value: 2262,
    label: "India",
  },
  {
    value: 2263,
    label: "Indonesia",
  },
  {
    value: 2264,
    label: "Iran; Islamic Republic of",
  },
  {
    value: 2265,
    label: "Iraq",
  },
  {
    value: 2266,
    label: "Ireland",
  },
  {
    value: 2445,
    label: "Isle of Man",
  },
  {
    value: 2267,
    label: "Israel",
  },
  {
    value: 2268,
    label: "Italy",
  },
  {
    value: 2269,
    label: "Jamaica",
  },
  {
    value: 2270,
    label: "Japan",
  },
  {
    value: 2422,
    label: "Jersey",
  },
  {
    value: 2271,
    label: "Jordan",
  },
  {
    value: 2272,
    label: "Kazakhstan",
  },
  {
    value: 2273,
    label: "Kenya",
  },
  {
    value: 2391,
    label: "Kiribati",
  },
  {
    value: 2274,
    label: "Korea; Democratic People's Republic Of (North)",
  },
  {
    value: 2275,
    label: "Korea; Republic Of (South)",
  },
  {
    value: 2392,
    label: "Kosovo",
  },
  {
    value: 2276,
    label: "Kuwait",
  },
  {
    value: 2277,
    label: "Kyrgyzstan",
  },
  {
    value: 2278,
    label: "Lao People's Democratic Republic",
  },
  {
    value: 2279,
    label: "Latvia",
  },
  {
    value: 2280,
    label: "Lebanon",
  },
  {
    value: 2281,
    label: "Lesotho",
  },
  {
    value: 2282,
    label: "Liberia",
  },
  {
    value: 2380,
    label: "Libya",
  },
  {
    value: 2284,
    label: "Liechtenstein",
  },
  {
    value: 2285,
    label: "Lithuania",
  },
  {
    value: 2286,
    label: "Luxembourg",
  },
  {
    value: 2287,
    label: "Macau",
  },
  {
    value: 2288,
    label: "Macedonia",
  },
  {
    value: 2367,
    label: "Macedonia; the Former Yugoslav Republic",
  },
  {
    value: 2289,
    label: "Madagascar",
  },
  {
    value: 2290,
    label: "Malawi",
  },
  {
    value: 2291,
    label: "Malaysia",
  },
  {
    value: 2384,
    label: "Maldives; Republic of",
  },
  {
    value: 2292,
    label: "Mali",
  },
  {
    value: 2293,
    label: "Malta",
  },
  {
    value: 2394,
    label: "Marshall Islands",
  },
  {
    value: 2423,
    label: "Martinique",
  },
  {
    value: 2294,
    label: "Mauritania",
  },
  {
    value: 2295,
    label: "Mauritius",
  },
  {
    value: 2393,
    label: "Mayotte",
  },
  {
    value: 2296,
    label: "Mexico",
  },
  {
    value: 2297,
    label: "Micronesia; Federated States of",
  },
  {
    value: 2395,
    label: "Moldova; Republic of",
  },
  {
    value: 2299,
    label: "Monaco",
  },
  {
    value: 2300,
    label: "Mongolia",
  },
  {
    value: 2396,
    label: "Montenegro",
  },
  {
    value: 2424,
    label: "Montserrat",
  },
  {
    value: 2301,
    label: "Morocco",
  },
  {
    value: 2302,
    label: "Mozambique",
  },
  {
    value: 2303,
    label: "Myanmar",
  },
  {
    value: 2304,
    label: "Namibia",
  },
  {
    value: 2397,
    label: "Nauru",
  },
  {
    value: 2305,
    label: "Nepal",
  },
  {
    value: 2306,
    label: "Netherlands",
  },
  {
    value: 2425,
    label: "Netherlands Antilles",
  },
  {
    value: 2426,
    label: "New Caledonia",
  },
  {
    value: 2307,
    label: "New Zealand",
  },
  {
    value: 2308,
    label: "Nicaragua",
  },
  {
    value: 2309,
    label: "Niger",
  },
  {
    value: 2310,
    label: "Nigeria",
  },
  {
    value: 2427,
    label: "Niue",
  },
  {
    value: 2428,
    label: "Norfolk Island",
  },
  {
    value: 2429,
    label: "Northern Mariana Islands",
  },
  {
    value: 2311,
    label: "Norway",
  },
  {
    value: 2312,
    label: "Oman",
  },
  {
    value: 2313,
    label: "Pakistan",
  },
  {
    value: 2314,
    label: "Palau",
  },
  {
    value: 2430,
    label: "Palestinian Territory; Occupied",
  },
  {
    value: 2315,
    label: "Panama",
  },
  {
    value: 2316,
    label: "Papua New Guinea",
  },
  {
    value: 2317,
    label: "Paraguay",
  },
  {
    value: 2318,
    label: "Peru",
  },
  {
    value: 2319,
    label: "Philippines",
  },
  {
    value: 2431,
    label: "Pitcairn",
  },
  {
    value: 2320,
    label: "Poland",
  },
  {
    value: 2321,
    label: "Portugal",
  },
  {
    value: 2374,
    label: "Puerto Rico",
  },
  {
    value: 2322,
    label: "Qatar",
  },
  {
    value: 2398,
    label: "Reunion",
  },
  {
    value: 2323,
    label: "Romania",
  },
  {
    value: 2324,
    label: "Russian Federation",
  },
  {
    value: 2325,
    label: "Rwanda",
  },
  {
    value: 2432,
    label: "Saint Barthélemy",
  },
  {
    value: 2433,
    label: "Saint Helena; Ascension and Tristan Da Cunha",
  },
  {
    value: 2399,
    label: "Saint Kitts and Nevis",
  },
  {
    value: 2326,
    label: "Saint Lucia",
  },
  {
    value: 2434,
    label: "Saint Martin",
  },
  {
    value: 2435,
    label: "Saint Pierre And Miquelon",
  },
  {
    value: 2400,
    label: "Saint Vincent and Grenadines",
  },
  {
    value: 2401,
    label: "Samoa",
  },
  {
    value: 2327,
    label: "San Marino",
  },
  {
    value: 2403,
    label: "Sao Tome and Principe",
  },
  {
    value: 2328,
    label: "Saudi Arabia",
  },
  {
    value: 2329,
    label: "Senegal",
  },
  {
    value: 2402,
    label: "Serbia",
  },
  {
    value: 2331,
    label: "Seychelles",
  },
  {
    value: 2332,
    label: "Sierra Leone",
  },
  {
    value: 2333,
    label: "Singapore",
  },
  {
    value: 2448,
    label: "Sint Maarten",
  },
  {
    value: 2334,
    label: "Slovakia",
  },
  {
    value: 2335,
    label: "Slovenia",
  },
  {
    value: 2336,
    label: "Solomon Islands",
  },
  {
    value: 2337,
    label: "Somalia",
  },
  {
    value: 2338,
    label: "South Africa",
  },
  {
    value: 2436,
    label: "South Georgia and the South Sandwich Islands",
  },
  {
    value: 2447,
    label: "South Sudan",
  },
  {
    value: 2339,
    label: "Spain",
  },
  {
    value: 2340,
    label: "Sri Lanka",
  },
  {
    value: 2341,
    label: "Sudan",
  },
  {
    value: 2342,
    label: "Suriname",
  },
  {
    value: 2437,
    label: "Svalbard And Jan Mayen",
  },
  {
    value: 2344,
    label: "Sweden",
  },
  {
    value: 2345,
    label: "Switzerland",
  },
  {
    value: 2381,
    label: "Syrian Arab Republic",
  },
  {
    value: 2375,
    label: "Taiwan",
  },
  {
    value: 2348,
    label: "Tajikistan",
  },
  {
    value: 2349,
    label: "Tanzania",
  },
  {
    value: 2350,
    label: "Thailand",
  },
  {
    value: 2404,
    label: "Timor-Leste",
  },
  {
    value: 2351,
    label: "Togo",
  },
  {
    value: 2438,
    label: "Tokelau",
  },
  {
    value: 2405,
    label: "Tonga",
  },
  {
    value: 2352,
    label: "Trinidad and Tobago",
  },
  {
    value: 2353,
    label: "Tunisia",
  },
  {
    value: 2354,
    label: "Turkey",
  },
  {
    value: 2355,
    label: "Turkmenistan",
  },
  {
    value: 2439,
    label: "Turks and Caicos Islands",
  },
  {
    value: 2440,
    label: "Tuvalu",
  },
  {
    value: 2356,
    label: "Uganda",
  },
  {
    value: 2357,
    label: "Ukraine",
  },
  {
    value: 2358,
    label: "United Arab Emirates",
  },
  {
    value: 2359,
    label: "United Kingdom",
  },
  {
    value: 1,
    label: "United States",
  },
  {
    value: 2441,
    label: "United States Minor Outlying Islands",
  },
  {
    value: 2360,
    label: "Uruguay",
  },
  {
    value: 2361,
    label: "Uzbekistan",
  },
  {
    value: 2406,
    label: "Vanuatu",
  },
  {
    value: 2363,
    label: "Venezuela; Bolivarian Republic of",
  },
  {
    value: 2364,
    label: "Vietnam",
  },
  {
    value: 2446,
    label: "Virgin Islands; British",
  },
  {
    value: 2442,
    label: "Virgin Islands; U.S.",
  },
  {
    value: 2443,
    label: "Wallis and Futuna",
  },
  {
    value: 2444,
    label: "Western Sahara",
  },
  {
    value: 2382,
    label: "Yemen",
  },
  {
    value: 2369,
    label: "Zambia",
  },
  {
    value: 2370,
    label: "Zimbabwe",
  },
];
export const telephoneNumberFields = [
  "mobile",
  "fax",
  "phone2",
  "workPhone",
  "phone",
  "fax2",
  "fax3",
];
