import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const MarketPriceForecasting = () => {
  const [commodityData, setCommodityData] = useState({});
  const [selectedCommodity, setSelectedCommodity] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedMarket, setSelectedMarket] = useState('');
  const [selectedVariety, setSelectedVariety] = useState('Hybrid');
  const [selectedGrade, setSelectedGrade] = useState('FAQ');
  const [predictionDate, setPredictionDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [markets, setMarkets] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [currentUnit, setCurrentUnit] = useState('quintal');

  const varieties = ['Hybrid', 'Desi', 'Local'];
  const grades = ['FAQ', 'A', 'B'];

  const conversionFactors = {
    quintal: 1,
    tonne: 0.1,
    kg: 100,
    pound: 220.462,
    ounce: 3527.396
  };

  const unitLabels = {
    quintal: 'Quintal (100kg)',
    tonne: 'Tonne',
    kg: 'Kilogram',
    pound: 'Pound (lb)',
    ounce: 'Ounce (oz)'
  };

  // Fetch commodity data on component mount
  useEffect(() => {
    fetchCommodityData();
  }, []);

  const fetchCommodityData = async () => {
    setDataLoading(true);
    try {
      // Replace with your actual API endpoint to get commodity data
      // For now, using a placeholder structure
      const dummyData = {
       "Bajra(Pearl Millet/Cumbu)": {
        "Uttar Pradesh": {
            "Agra": [
                "Achnera",
                "Agra",
                "Fatehabad",
                "Fatehpur Sikri",
                "Jagnair",
                "Khairagarh",
                "Samsabad"
            ],
            "Aligarh": [
                "Aligarh",
                "Atrauli",
                "Charra",
                "Khair"
            ],
            "Auraiya": [
                "Achalda",
                "Dibiapur"
            ],
            "Badaun": [
                "Badayoun",
                "Babrala",
                "Bilsi",
                "Ujhani",
                "Visoli",
                "Wazirganj",
                "Shahaswan"
            ],
            "Bareilly": [
                "Bareilly"
            ],
            "Etah": [
                "Aliganj",
                "Etah",
                "Awagarh"
            ],
            "Etawah": [
                "Jasvantnagar"
            ],
            "Fatehpur": [
                "Bindki",
                "Jahanabad",
                "Kishunpur",
                "Khaga"
            ],
            "Firozabad": [
                "Firozabad",
                "Shikohabad",
                "Tundla",
                "Sirsaganj"
            ],
            "Ghazipur": [
                "Yusufpur"
            ],
            "Gonda": [
                "Gonda"
            ],
            "Hathras": [
                "Haathras",
                "Sikandraraau"
            ],
            "Kanpur Dehat": [
                "Jhijhank",
                "Pukharayan",
                "Rura"
            ],
            "Kasganj": [
                "Kasganj"
            ],
            "Mahoba": [
                "Charkhari"
            ],
            "Mainpuri": [
                "Bewar",
                "Ghiraur",
                "Mainpuri"
            ],
            "Mathura": [
                "Mathura"
            ],
            "Prayagraj": [
                "Sirsa"
            ],
            "Sambhal": [
                "Bhehjoi",
                "Chandausi"
            ],
            "Unnao": [
                "Bangarmau"
            ]
        },
        "Gujarat": {
            "Ahmedabad": [
                "Bavla",
                "Viramgam",
                "Ahmedabad"
            ],
            "Amreli": [
                "Amreli",
                "Bagasara",
                "Dhari",
                "Khambha",
                "Rajula",
                "Savarkundla"
            ],
            "Anand": [
                "Anand",
                "Borsad",
                "Khambhat(Grain Market)",
                "Umreth",
                "Tarapur"
            ],
            "Bharuch": [
                "Jambusar",
                "Jambusar(Kaavi)"
            ],
            "Bhavnagar": [
                "Bhavnagar",
                "Mahuva(Station Road)",
                "Palitana",
                "Taleja"
            ],
            "Botad": [
                "Botad"
            ],
            "Dahod": [
                "Dahod",
                "Zalod(Sanjeli)",
                "Zalod(Zalod)"
            ],
            "Gandhinagar": [
                "Dehgam",
                "Dehgam(Rekhiyal)",
                "Kalol",
                "Mansa"
            ],
            "Gir Somnath": [
                "Kodinar",
                "Una"
            ],
            "Jamnagar": [
                "Dhrol",
                "Jam Jodhpur",
                "Jamnagar",
                "Kalawad"
            ],
            "Kheda": [
                "Kapadvanj",
                "Kathlal",
                "Matar(Limbasi)",
                "Thasara"
            ],
            "Mehsana": [
                "Kadi",
                "Mehsana",
                "Mehsana(Jornang)",
                "Visnagar",
                "Vijapur",
                "Becharaji",
                "Vijapur(Kukarvada)",
                "Vijapur(Gojjariya)"
            ],
            "Morbi": [
                "Halvad",
                "Morbi",
                "Vankaner"
            ],
            "Patan": [
                "Chansama",
                "Harij",
                "Patan",
                "Radhanpur",
                "Sami",
                "Siddhpur"
            ],
            "Porbandar": [
                "Porbandar"
            ],
            "Rajkot": [
                "Dhoraji",
                "Gondal",
                "Jasdan",
                "Rajkot",
                "Upleta",
                "Jetpur(Dist.Rajkot)"
            ],
            "Sabarkantha": [
                "Bayad",
                "Bayad(Demai)",
                "Bhiloda",
                "Dhansura",
                "Himatnagar",
                "Khedbrahma",
                "Modasa",
                "Modasa(Tintoi)",
                "Prantij",
                "Talod",
                "Vadali",
                "Bayad(Sadamba)",
                "Idar"
            ],
            "Surat": [
                "Nizar",
                "Nizar(Kukarmuda)",
                "Nizar(Pumkitalov)"
            ],
            "Surendranagar": [
                "Chotila",
                "Dhragradhra",
                "Dasada Patadi"
            ]
        },
        "Maharashtra": {
            "Ahmednagar": [
                "Ahmednagar",
                "Jamkhed",
                "Karjat",
                "Kopargaon",
                "Om Chaitanya Multistate Agro Purpose CoOp Society ",
                "Pathardi",
                "Rahata",
                "Rahuri",
                "Rahuri(Vambori)",
                "Sangamner",
                "Shevgaon",
                "Shevgaon(Bodhegaon)",
                "Shrigonda",
                "Shrirampur",
                "Shrirampur(Belapur)",
                "Shrigonda(Gogargaon)"
            ],
            "Akola": [
                "Akola"
            ],
            "Beed": [
                "Beed",
                "Gevrai",
                "Kada",
                "Kaij",
                "Kille Dharur",
                "Majalgaon",
                "Parali Vaijyanath",
                "Vadvani",
                "Patoda"
            ],
            "Buldhana": [
                "Chikali",
                "Deoulgaon Raja",
                "Jaykissan Krushi Uttpan Khajgi Bazar ",
                "Khamgaon",
                "Lonar",
                "Nandura",
                "Malkapur"
            ],
            "Dhule": [
                "Dhule",
                "Dondaicha",
                "Dondaicha(Sindhkheda)",
                "Sakri",
                "Shirpur"
            ],
            "Latur": [
                "Ahmedpur"
            ],
            "Nandurbar": [
                "Nandurbar",
                "Shahada",
                "Taloda"
            ],
            "Nashik": [
                "Devala",
                "Kalvan",
                "Lasalgaon",
                "Lasalgaon(Niphad)",
                "Malegaon",
                "Manmad",
                "Nandgaon",
                "Satana",
                "Sinner",
                "Yeola",
                "Lasalgaon(Vinchur)",
                "Nampur"
            ],
            "Parbhani": [
                "Manwat",
                "Pathari",
                "Sonpeth",
                "Selu"
            ],
            "Pune": [
                "Dound",
                "Indapur(Nimgaon Ketki)",
                "Pune",
                "Nira(Saswad)",
                "Shirur",
                "Indapur",
                "Indapur(Bhigwan)"
            ],
            "Raigad": [
                "Karjat(Raigad)"
            ],
            "Sangli": [
                "Sangli"
            ],
            "Satara": [
                "Phaltan"
            ],
            "Thane": [
                "Kalyan",
                "Ulhasnagar"
            ],
            "Yavatmal": [
                "Digras",
                "Kisan Market Yard",
                "Mahesh Krushi Utpanna Bazar, Digras",
                "Ramdev Krushi Bazaar",
                "Pusad"
            ]
        },
        "Rajasthan": {
            "Ajmer": [
                "Madanganj Kishangarh"
            ],
            "Alwar": [
                "Alwar",
                "Bahror",
                "Barodamev",
                "Kherli",
                "Laxmangarh (Barodamev)"
            ],
            "Baran": [
                "Baran",
                "Anta",
                "Nahargarh"
            ],
            "Barmer": [
                "Barmer"
            ],
            "Bharatpur": [
                "Bayana",
                "Bharatpur",
                "Bhusawar Bair",
                "Nadwai"
            ],
            "Bhilwara": [
                "Bhilwara",
                "Gangapur",
                "Gulabpura"
            ],
            "Bikaner": [
                "Bikaner (Grain)",
                "Nokha",
                "Pugal Road (Grain)",
                "Khajuwala",
                "Sridungargarh"
            ],
            "Bundi": [
                "Bundi",
                "Keshoraipatan",
                "Sumerganj"
            ],
            "Churu": [
                "Sadulpur",
                "Sardar Shahar",
                "Sujangarh"
            ],
            "Dausa": [
                "Bandikui",
                "Bandikui(Geejgarh)",
                "Dausa",
                "Lalsot",
                "Madanganj Mahuwa",
                "Madanganj Mandawar",
                "Mandawari"
            ],
            "Dholpur": [
                "Dholpur"
            ],
            "Hanumangarh": [
                "Bhadara",
                "Goluwala",
                "Hanumangarh",
                "Hanumangarh Town",
                "Hanumangarh(Urlivas)",
                "Nohar",
                "Pilibanga",
                "Rawatsar",
                "Sangriya",
                "Tibbi"
            ],
            "Jaipur": [
                "Jaipur (Grain)",
                "Kishan Renwal(Fulera)"
            ],
            "Jaisalmer": [
                "Jaisalmer"
            ],
            "Jalore": [
                "Bhinmal"
            ],
            "Jhunjhunu": [
                "Chirawa",
                "Gudhagorji",
                "Jhunjhunu",
                "Nawalgarh",
                "Surajgarh"
            ],
            "Jodhpur": [
                "Bhagat Ki Kothi",
                "Jodhpur (Grain)"
            ],
            "Karauli": [
                "Hindoun"
            ],
            "Kota": [
                "Kota"
            ],
            "Nagaur": [
                "Deedwana(Choti Khatu)",
                "Degana",
                "Jayal",
                "Nagaur(Jayal)",
                "Nagaur"
            ],
            "Pali": [
                "Sumerpur",
                "Sojat Road"
            ],
            "Sikar": [
                "Fatehpur",
                "Palsana",
                "Sikar"
            ],
            "Tonk": [
                "Deoli",
                "Dooni",
                "Malpura",
                "Malpura(Todaraisingh)",
                "Niwai",
                "Tonk",
                "Uniyara"
            ],
            "Udaipur": [
                "Udaipur (Grain)"
            ]
        },
        "Madhya Pradesh": {
            "Alirajpur": [
                "Alirajpur",
                "Jobat(F&V)",
                "Jobat"
            ],
            "Ashoknagar": [
                "Ashoknagar"
            ],
            "Betul": [
                "Betul"
            ],
            "Bhind": [
                "Alampur",
                "Bhind",
                "Gohad",
                "Lahar",
                "Mehgaon",
                "Mow",
                "Gohad(F&V)"
            ],
            "Burhanpur": [
                "Burhanpur"
            ],
            "Chhatarpur": [
                "Chhatarpur",
                "Naugaon"
            ],
            "Chhindwara": [
                "Pandhurna"
            ],
            "Datia": [
                "Sevda"
            ],
            "Dhar": [
                "Kukshi"
            ],
            "Guna": [
                "Guna",
                "Raghogarh"
            ],
            "Gwalior": [
                "Dabra",
                "Lashkar"
            ],
            "Indore": [
                "Indore",
                "Mhow"
            ],
            "Jabalpur": [
                "Paatan"
            ],
            "Katni": [
                "Katni"
            ],
            "Khandwa": [
                "Khandwa",
                "Pandhana"
            ],
            "Khargone": [
                "Bhikangaon"
            ],
            "Mandla": [
                "Mandla"
            ],
            "Morena": [
                "Ambaha",
                "Banmorkalan",
                "Jora",
                "Kailaras",
                "Morena",
                "Porsa",
                "Sabalgarh"
            ],
            "Neemuch": [
                "Neemuch"
            ],
            "Satna": [
                "Satna",
                "Nagod"
            ],
            "Seoni": [
                "Seoni"
            ],
            "Sheopur": [
                "Vijaypur",
                "Sheopurkalan"
            ],
            "Shivpuri": [
                "Pohari",
                "Badarwas",
                "Kolaras",
                "Barad",
                "Pichhour",
                "Shivpuri"
            ],
            "Tikamgarh": [
                "Niwadi"
            ],
            "Ujjain": [
                "Ujjain"
            ]
        },
        "Tamil Nadu": {
            "Ariyalur": [
                "Andimadom",
                "Ariyalur Market",
                "Jayamkondam"
            ],
            "Coimbatore": [
                "Karamadai",
                "Pethappampatti",
                "Thiruppur",
                "Kianthukadavu",
                "Sulur"
            ],
            "Cuddalore": [
                "Panruti",
                "Shrimushnam",
                "Virudhachalam",
                "Cuddalore",
                "Sethiathoppu"
            ],
            "Dindigul": [
                "Oddunchairum"
            ],
            "Karur": [
                "Karur"
            ],
            "Madurai": [
                "Madurai"
            ],
            "Namakkal": [
                "Tiruchengode",
                "Namakkal",
                "Namagiripettai"
            ],
            "Ramanathapuram": [
                "Kamuthi"
            ],
            "Salem": [
                "Thammampati"
            ],
            "Theni": [
                "Cumbum"
            ],
            "Vellore": [
                "Vellore"
            ]
        },
        "Karnataka": {
            "Bagalkot": [
                "Bagalakot",
                "Bagalkot(Bilagi)",
                "Badami"
            ],
            "Bangalore": [
                "Bangalore"
            ],
            "Bellary": [
                "Bellary",
                "Kottur",
                "H.B. Halli"
            ],
            "Bidar": [
                "Basava Kalayana"
            ],
            "Chitradurga": [
                "Chitradurga"
            ],
            "Dharwad": [
                "Annigeri",
                "Hubli (Amaragol)"
            ],
            "Gadag": [
                "Mundaragi",
                "Rona"
            ],
            "Kolar": [
                "Chintamani"
            ],
            "Koppal": [
                "Gangavathi",
                "Koppal",
                "Kustagi",
                "Yalburga"
            ],
            "Mandya": [
                "Nagamangala"
            ],
            "Raichur": [
                "Lingasugur",
                "Raichur",
                "Sindhanur",
                "Manvi"
            ]
        },
        "Haryana": {
            "Bhiwani": [
                "Ch. Dadri",
                "Loharu",
                "Siwani",
                "Tosham",
                "Bhiwani",
                "Behal"
            ],
            "Faridabad": [
                "Ballabhgarh"
            ],
            "Fatehabad": [
                "Bhattu Kalan"
            ],
            "Jind": [
                "Jullana",
                "New Grain Market , Jind",
                "Uchana"
            ],
            "Palwal": [
                "Palwal"
            ],
            "Rewari": [
                "Rewari"
            ],
            "Sirsa": [
                "Ellanabad",
                "Ding",
                "New Grain Market , Sirsa"
            ],
            "Sonipat": [
                "New Grain Market , Sonipat"
            ]
        },
        "Bihar": {
            "Gaya": [
                "Gaya"
            ]
        },
        "Himachal Pradesh": {
            "Hamirpur": [
                "Bharuasumerpur",
                "Kurara"
            ]
        },
        "Andhra Pradesh": {
            "Kurnool": [
                "Kurnool"
            ]
        },
        "Telangana": {
            "Medak": [
                "Zaheerabad"
            ],
            "Nalgonda": [
                "Nidamanoor"
            ],
            "Nizamabad": [
                "Nizamabad"
            ]
        },
        "Odisha": {
            "Rayagada": [
                "Gunpur",
                "Rayagada(Muniguda)"
            ]
        }
    },
    "Barley (Jau)": {
        "Uttar Pradesh": {
            "Agra": [
                "Achnera",
                "Agra",
                "Fatehpur Sikri",
                "Fatehabad",
                "Samsabad"
            ],
            "Aligarh": [
                "Aligarh"
            ],
            "Azamgarh": [
                "Azamgarh"
            ],
            "Badaun": [
                "Babrala",
                "Bilsi",
                "Shahaswan"
            ],
            "Baghpat": [
                "Baraut"
            ],
            "Ballia": [
                "Ballia",
                "Rasda"
            ],
            "Balrampur": [
                "Ramanujganj"
            ],
            "Deoria": [
                "Barhaj"
            ],
            "Etah": [
                "Etah"
            ],
            "Etawah": [
                "Etawah"
            ],
            "Fatehpur": [
                "Kishunpur",
                "Bindki"
            ],
            "Firozabad": [
                "Firozabad",
                "Tundla",
                "Shikohabad",
                "Sirsaganj"
            ],
            "Ghaziabad": [
                "Ghaziabad",
                "Noida"
            ],
            "Ghazipur": [
                "Gazipur",
                "Jangipura",
                "Jamanian"
            ],
            "Gorakhpur": [
                "Gorakhpur"
            ],
            "Jhansi": [
                "Gurusarai",
                "Jhansi (Grain)",
                "Mauranipur",
                "Jhansi",
                "Chirgaon"
            ],
            "Kanpur Dehat": [
                "Rura",
                "Jhijhank"
            ],
            "Kasganj": [
                "Kasganj"
            ],
            "Lalitpur": [
                "Lalitpur",
                "Mehrauni"
            ],
            "Maharajganj": [
                "Partaval"
            ],
            "Mahoba": [
                "Charkhari",
                "Mahoba"
            ],
            "Mathura": [
                "Mathura"
            ],
            "Meerut": [
                "Meerut"
            ],
            "Muzaffarnagar": [
                "Muzzafarnagar",
                "Shahpur"
            ],
            "Prayagraj": [
                "Allahabad"
            ],
            "Saharanpur": [
                "Saharanpur"
            ],
            "Sambhal": [
                "Bhehjoi"
            ],
            "Shamli": [
                "Shamli"
            ],
            "Sonbhadra": [
                "Robertsganj"
            ],
            "Varanasi": [
                "Varanasi"
            ]
        },
        "Rajasthan": {
            "Ajmer": [
                "Madanganj Kishangarh"
            ],
            "Alwar": [
                "Alwar",
                "Kherli",
                "Bahror",
                "Barodamev",
                "Laxmangarh (Barodamev)"
            ],
            "Baran": [
                "Baran",
                "Samraniyan",
                "Nahargarh"
            ],
            "Bharatpur": [
                "Nadwai",
                "Bayana",
                "Bharatpur"
            ],
            "Bhilwara": [
                "Bhilwara",
                "Gulabpura",
                "Bijolia"
            ],
            "Bikaner": [
                "Bikaner (Grain)",
                "Lunkaransar",
                "Nokha",
                "Pugal Road (Grain)",
                "Sridungargarh",
                "Khajuwala"
            ],
            "Bundi": [
                "Bundi",
                "Dei",
                "Keshoraipatan",
                "Sumerganj"
            ],
            "Chittorgarh": [
                "Barisadri",
                "Begu",
                "Nimbahera"
            ],
            "Churu": [
                "Sardar Shahar",
                "Sujangarh"
            ],
            "Dausa": [
                "Bandikui",
                "Bandikui(Geejgarh)",
                "Dausa",
                "Lalsot",
                "Madanganj Mandawar",
                "Mandawari",
                "Madanganj Mahuwa"
            ],
            "Hanumangarh": [
                "Goluwala",
                "Hanumangarh",
                "Bhadara",
                "Hanumangarh Town",
                "Pilibanga",
                "Nohar",
                "Rawatsar",
                "Sangriya",
                "Hanumangarh(Urlivas)"
            ],
            "Jaipur": [
                "Jaipur (Grain)",
                "Kishan Renwal(Fulera)"
            ],
            "Jhalawar": [
                "Khanpur"
            ],
            "Jhunjhunu": [
                "Gudhagorji",
                "Jhunjhunu",
                "Nawalgarh",
                "Chirawa",
                "Surajgarh"
            ],
            "Jodhpur": [
                "Bhagat Ki Kothi",
                "Jodhpur (Grain)"
            ],
            "Karauli": [
                "Hindoun"
            ],
            "Kota": [
                "Itawa",
                "Kota",
                "Ramganjmandi"
            ],
            "Nagaur": [
                "Nagaur",
                "Degana"
            ],
            "Pali": [
                "Sumerpur",
                "Rani"
            ],
            "Pratapgarh": [
                "Chhotisadri",
                "Pratapgarh"
            ],
            "Sikar": [
                "Palsana",
                "Sikar",
                "Fatehpur"
            ],
            "Tonk": [
                "Deoli",
                "Dooni",
                "Malpura",
                "Malpura(Todaraisingh)",
                "Niwai",
                "Tonk",
                "Uniyara"
            ],
            "Udaipur": [
                "Fatehnagar",
                "Udaipur (Grain)"
            ]
        },
        "Madhya Pradesh": {
            "Ashoknagar": [
                "Ashoknagar",
                "Chanderi",
                "Shadora"
            ],
            "Balaghat": [
                "Balaghat"
            ],
            "Bhind": [
                "Gohad",
                "Mow"
            ],
            "Chhatarpur": [
                "Badamalhera",
                "Bakswaha",
                "Bijawar",
                "Chhatarpur",
                "Harpalpur",
                "Naugaon",
                "LavKush Nagar(Laundi)",
                "Rajnagar"
            ],
            "Damoh": [
                "Javera"
            ],
            "Datia": [
                "Datia",
                "Bhander"
            ],
            "Guna": [
                "Guna"
            ],
            "Gwalior": [
                "Dabra",
                "Lashkar"
            ],
            "Indore": [
                "Indore"
            ],
            "Katni": [
                "Katni"
            ],
            "Khargone": [
                "Badwaha"
            ],
            "Mandsaur": [
                "Mandsaur",
                "Piplya"
            ],
            "Morena": [
                "Banmorkalan",
                "Morena"
            ],
            "Neemuch": [
                "Manasa",
                "Neemuch",
                "Javad"
            ],
            "Panna": [
                "Ajaygarh",
                "Devandranagar",
                "Panna"
            ],
            "Raisen": [
                "Obedullaganj"
            ],
            "Rewa": [
                "Baikunthpur",
                "Rewa",
                "Chaakghat"
            ],
            "Sagar": [
                "Shahagarh",
                "Sagar"
            ],
            "Satna": [
                "Amarpatan",
                "Mehar",
                "Nagod",
                "Satna",
                "Ramnagar"
            ],
            "Sehore": [
                "Rehati"
            ],
            "Shajapur": [
                "Agar",
                "Soyatkalan"
            ],
            "Sheopur": [
                "Sheopurkalan"
            ],
            "Shivpuri": [
                "Khanyadhana",
                "Pichhour",
                "Karera",
                "Kolaras",
                "Khaniadhana"
            ],
            "Sidhi": [
                "Sidhi"
            ],
            "Tikamgarh": [
                "Khargapur",
                "Jatara",
                "Prithvipur",
                "Tikamgarh",
                "Niwadi",
                "Tikamgarh(F&V)",
                "Palera"
            ]
        },
        "Haryana": {
            "Bhiwani": [
                "Siwani",
                "Ch. Dadri",
                "Tosham",
                "Jui"
            ],
            "Fatehabad": [
                "Fatehabad",
                "Bhattu Kalan"
            ],
            "Jind": [
                "Uchana"
            ],
            "Kurukshetra": [
                "Ladwa"
            ],
            "Rewari": [
                "Rewari"
            ],
            "Sirsa": [
                "New Grain Market , Sirsa",
                "Ellanabad",
                "kalanwali"
            ]
        },
        "Gujarat": {
            "Dahod": [
                "Dahod"
            ],
            "Gandhinagar": [
                "Kalol",
                "Mansa"
            ],
            "Mehsana": [
                "Kadi",
                "Visnagar"
            ],
            "Patan": [
                "Siddhpur"
            ],
            "Sabarkantha": [
                "Bhiloda"
            ]
        },
        "Himachal Pradesh": {
            "Hamirpur": [
                "Bharuasumerpur",
                "Kurara",
                "Muskara",
                "Raath"
            ]
        }
    },
    "Black Gram (Urd Beans)(Whole)": {
        "Telangana": {
            "Adilabad": [
                "Bhainsa",
                "Boath"
            ],
            "Karimnagar": [
                "Karimnagar"
            ],
            "Khammam": [
                "Burgampadu",
                "Khammam",
                "Charla"
            ],
            "Medak": [
                "Zaheerabad",
                "Sadasivpet"
            ],
            "Nalgonda": [
                "Tirumalagiri"
            ],
            "Warangal": [
                "Mahabubabad",
                "Mulugu",
                "Warangal"
            ]
        },
        "Uttar Pradesh": {
            "Agra": [
                "Agra"
            ],
            "Amethi": [
                "Jafarganj",
                "Sultanpur"
            ],
            "Ayodhya": [
                "Faizabad"
            ],
            "Azamgarh": [
                "Azamgarh"
            ],
            "Badaun": [
                "Badayoun",
                "Bilsi",
                "Visoli",
                "Wazirganj"
            ],
            "Bahraich": [
                "Bahraich",
                "Naanpara"
            ],
            "Balrampur": [
                "Balrampur",
                "Tulsipur"
            ],
            "Barabanki": [
                "Safdarganj"
            ],
            "Bareilly": [
                "Bareilly"
            ],
            "Deoria": [
                "Devariya"
            ],
            "Etah": [
                "Etah"
            ],
            "Firozabad": [
                "Shikohabad",
                "Sirsaganj",
                "Tundla"
            ],
            "Ghaziabad": [
                "Ghaziabad"
            ],
            "Gonda": [
                "Gonda"
            ],
            "Gorakhpur": [
                "Gorakhpur"
            ],
            "Hardoi": [
                "Hardoi",
                "Madhoganj"
            ],
            "Hathras": [
                "Haathras"
            ],
            "Jaunpur": [
                "Jaunpur",
                "Shahganj"
            ],
            "Jhansi": [
                "Chirgaon",
                "Jhansi",
                "Mauranipur",
                "Jhansi (Grain)"
            ],
            "Kanpur Dehat": [
                "Rura"
            ],
            "Kasganj": [
                "Kasganj"
            ],
            "Lalitpur": [
                "Lalitpur",
                "Mehrauni"
            ],
            "Lucknow": [
                "Lucknow"
            ],
            "Maharajganj": [
                "Anandnagar"
            ],
            "Mahoba": [
                "Mahoba"
            ],
            "Mathura": [
                "Mathura",
                "Kosikalan"
            ],
            "Meerut": [
                "Meerut"
            ],
            "Muzaffarnagar": [
                "Muzzafarnagar"
            ],
            "Prayagraj": [
                "Allahabad",
                "Sirsa"
            ],
            "Saharanpur": [
                "Saharanpur"
            ],
            "Sambhal": [
                "Bhehjoi"
            ],
            "Shamli": [
                "Shamli"
            ],
            "Shravasti": [
                "Bhinga"
            ],
            "Varanasi": [
                "Varanasi"
            ]
        },
        "Gujarat": {
            "Ahmedabad": [
                "Mandal"
            ],
            "Amreli": [
                "Amreli",
                "Bagasara",
                "Dhari",
                "Rajula",
                "Savarkundla"
            ],
            "Bharuch": [
                "Valia"
            ],
            "Bhavnagar": [
                "Bhavnagar",
                "Palitana",
                "Taleja"
            ],
            "Botad": [
                "Botad"
            ],
            "Dahod": [
                "Dahod",
                "Zalod(Zalod)"
            ],
            "Gandhinagar": [
                "Kalol",
                "Mansa"
            ],
            "Gir Somnath": [
                "Kodinar",
                "Una",
                "Veraval"
            ],
            "Jamnagar": [
                "Dhrol",
                "Jam Jodhpur",
                "Jamnagar",
                "Kalawad"
            ],
            "Mehsana": [
                "Becharaji",
                "Kadi",
                "Visnagar"
            ],
            "Morbi": [
                "Halvad",
                "Morbi"
            ],
            "Patan": [
                "Harij",
                "Patan",
                "Radhanpur",
                "Sami",
                "Siddhpur"
            ],
            "Porbandar": [
                "Kutiyana",
                "Porbandar"
            ],
            "Rajkot": [
                "Dhoraji",
                "Gondal",
                "Jasdan",
                "Jetpur(Dist.Rajkot)",
                "Rajkot",
                "Upleta"
            ],
            "Sabarkantha": [
                "Bhiloda",
                "Dhansura",
                "Himatnagar",
                "Idar",
                "Khedbrahma",
                "Modasa",
                "Modasa(Tintoi)",
                "Talod",
                "Vadali"
            ],
            "Surat": [
                "Mandvi",
                "Songadh",
                "Vyra"
            ],
            "Surendranagar": [
                "Dasada Patadi"
            ]
        },
        "Maharashtra": {
            "Ahmednagar": [
                "Ahmednagar",
                "Jamkhed",
                "Karjat",
                "Om Chaitanya Multistate Agro Purpose CoOp Society ",
                "Pathardi",
                "Rahuri",
                "Rahuri(Vambori)",
                "Shevgaon",
                "Shevgaon(Bodhegaon)",
                "Shrigonda",
                "Shrigonda(Gogargaon)",
                "Shrirampur"
            ],
            "Akola": [
                "Akola",
                "Akot",
                "Balapur",
                "Patur",
                "Telhara"
            ],
            "Beed": [
                "Beed",
                "Gevrai",
                "Kada",
                "Kille Dharur",
                "Majalgaon",
                "Kaij",
                "Patoda"
            ],
            "Bhandara": [
                "Bhandara",
                "Lakhandur",
                "Pavani",
                "Tumsar"
            ],
            "Buldhana": [
                "BSK Krishi Bazar Private Ltd",
                "Buldhana(Dhad)",
                "Chikali",
                "Deoulgaon Raja",
                "Jaykissan Krushi Uttpan Khajgi Bazar ",
                "Khamgaon",
                "Lonar",
                "Jalgaon Jamod(Aasalgaon)",
                "Malkapur",
                "Nandura",
                "Shegaon"
            ],
            "Dhule": [
                "Dhule",
                "Dondaicha",
                "Shirpur",
                "Sakri"
            ],
            "Hingoli": [
                "Akhadabalapur",
                "Hingoli",
                "Sengoan",
                "Vitthal Krushi Utpanna Bazar "
            ],
            "Latur": [
                "Ahmedpur",
                "Aurad Shahajani",
                "Ausa",
                "Chakur",
                "Devani",
                "Latur",
                "Nilanga",
                "Latur(Murud)",
                "Udgir"
            ],
            "Nagpur": [
                "Nagpur",
                "Bhiwapur"
            ],
            "Nanded": [
                "Bhokar",
                "Deglur",
                "Dharmabad",
                "Mukhed",
                "Nanded",
                "Kandhar",
                "Loha",
                "Naigaon"
            ],
            "Nandurbar": [
                "Shahada",
                "Nandurbar"
            ],
            "Nashik": [
                "Devala",
                "Lasalgaon",
                "Lasalgaon(Niphad)",
                "Malegaon",
                "Sinner",
                "Yeola"
            ],
            "Parbhani": [
                "Pathari",
                "Jintur",
                "Selu",
                "Manwat"
            ],
            "Pune": [
                "Baramati",
                "Dound",
                "Indapur(Bhigwan)",
                "Pune",
                "Indapur",
                "Shirur",
                "Indapur(Nimgaon Ketki)"
            ],
            "Raigad": [
                "Karjat(Raigad)"
            ],
            "Sangli": [
                "Sangli",
                "Tasgaon",
                "Palus"
            ],
            "Satara": [
                "Vaduj"
            ],
            "Thane": [
                "Kalyan"
            ],
            "Yavatmal": [
                "Cottoncity Agro Foods Private Ltd",
                "Digras",
                "Ramdev Krushi Bazaar",
                "Pusad",
                "Yeotmal",
                "Vani",
                "Kisan Market Yard",
                "Mahesh Krushi Utpanna Bazar, Digras"
            ]
        },
        "Madhya Pradesh": {
            "Alirajpur": [
                "Alirajpur",
                "Jobat"
            ],
            "Ashoknagar": [
                "Ashoknagar",
                "Chanderi",
                "Isagarh",
                "Mungawali",
                "Shadora"
            ],
            "Balaghat": [
                "Balaghat",
                "Lalbarra"
            ],
            "Betul": [
                "Betul",
                "Multai"
            ],
            "Bhind": [
                "Lahar"
            ],
            "Bhopal": [
                "Bhopal",
                "Berasia"
            ],
            "Burhanpur": [
                "Burhanpur"
            ],
            "Chhatarpur": [
                "Badamalhera",
                "Chhatarpur",
                "Bijawar",
                "Bakswaha",
                "Rajnagar",
                "Naugaon"
            ],
            "Chhindwara": [
                "Chhindwara"
            ],
            "Damoh": [
                "Damoh",
                "Hata",
                "Javera",
                "Patharia"
            ],
            "Datia": [
                "Bhander",
                "Datia"
            ],
            "Dewas": [
                "Dewas",
                "Khategaon",
                "Loharda",
                "Kannod"
            ],
            "Dhar": [
                "Badnawar",
                "Dhar",
                "Kukshi"
            ],
            "Dindori": [
                "Dindori",
                "Shahpura"
            ],
            "Guna": [
                "Aron",
                "Binaganj",
                "Guna",
                "Kumbhraj",
                "Maksudangarh",
                "Raghogarh"
            ],
            "Gwalior": [
                "Lashkar",
                "Dabra"
            ],
            "Hoshangabad": [
                "Banapura",
                "Bankhedi",
                "Itarsi",
                "Pipariya",
                "Semriharchand"
            ],
            "Indore": [
                "Indore",
                "Mhow"
            ],
            "Jabalpur": [
                "Jabalpur",
                "Paatan",
                "Sehora",
                "Shahpura Bhitoni (F&V)",
                "Shahpura(Jabalpur)",
                "Sihora"
            ],
            "Jhabua": [
                "Jhabua"
            ],
            "Katni": [
                "Katni"
            ],
            "Khandwa": [
                "Harsood",
                "Khandwa",
                "Pandhana"
            ],
            "Khargone": [
                "Kasrawad",
                "Karhi",
                "Khargone",
                "Bhikangaon",
                "Sanawad"
            ],
            "Mandla": [
                "Mandla",
                "Nainpur"
            ],
            "Mandsaur": [
                "Garoth",
                "Mandsaur",
                "Shamgarh",
                "Bhanpura",
                "Sitmau",
                "Suvasra",
                "Piplya"
            ],
            "Morena": [
                "Morena"
            ],
            "Narsinghpur": [
                "Gadarwada",
                "Gotegaon",
                "Gotegaon(F&V)",
                "Kareli",
                "Narsinghpur",
                "Tendukheda"
            ],
            "Neemuch": [
                "Manasa",
                "Neemuch",
                "Javad"
            ],
            "Panna": [
                "Devandranagar",
                "Panna",
                "Simariya"
            ],
            "Raisen": [
                "Begamganj",
                "Obedullaganj",
                "Gairatganj",
                "Udaipura"
            ],
            "Rajgarh": [
                "Jeerapur",
                "Kurawar",
                "Suthalia",
                "Narsinghgarh",
                "Pachaur"
            ],
            "Ratlam": [
                "Jaora",
                "Ratlam",
                "Sailana"
            ],
            "Rewa": [
                "Baikunthpur",
                "Rewa"
            ],
            "Sagar": [
                "Bamora",
                "Banda",
                "Bina",
                "Garhakota",
                "Deori",
                "Khurai",
                "Sagar",
                "Shahagarh",
                "Rehli",
                "Rahatgarh",
                "Malthone"
            ],
            "Satna": [
                "Amarpatan",
                "Nagod",
                "Satna",
                "Ramnagar"
            ],
            "Sehore": [
                "Nasrullaganj",
                "Shyampur",
                "Sehore"
            ],
            "Seoni": [
                "Ghansour",
                "Chhpara"
            ],
            "Shajapur": [
                "Agar",
                "Badod",
                "Nalkehda",
                "Shajapur",
                "Susner",
                "Soyatkalan"
            ],
            "Sheopur": [
                "Sheopurbadod",
                "Sheopurkalan"
            ],
            "Shivpuri": [
                "Badarwas",
                "Khaniadhana",
                "Khatora",
                "Kolaras",
                "Shivpuri",
                "Pohari",
                "Rannod"
            ],
            "Tikamgarh": [
                "Khargapur",
                "Niwadi",
                "Prithvipur",
                "Jatara",
                "Tikamgarh"
            ],
            "Ujjain": [
                "Badnagar",
                "Ujjain"
            ],
            "Vidisha": [
                "Ganjbasoda",
                "Kurwai",
                "Lateri",
                "Shamshabad",
                "Sironj",
                "Vidisha"
            ]
        },
        "Odisha": {
            "Angul": [
                "Angul(Jarapada)",
                "Angul"
            ],
            "Bargarh": [
                "Attabira"
            ],
            "Gajapati": [
                "Kasinagar",
                "Parlakhemundi"
            ],
            "Ganjam": [
                "Digapahandi"
            ],
            "Rayagada": [
                "Gunpur",
                "Rayagada(Muniguda)"
            ]
        },
        "Tamil Nadu": {
            "Ariyalur": [
                "Ariyalur Market",
                "Andimadom",
                "Jayamkondam"
            ],
            "Cuddalore": [
                "Cuddalore",
                "Kurinchipadi",
                "Panruti",
                "Virudhachalam",
                "Sethiathoppu",
                "Shrimushnam",
                "Tittakudi"
            ],
            "Erode": [
                "Anthiyur",
                "Chithode",
                "Dharapuram"
            ],
            "Namakkal": [
                "Namagiripettai",
                "Namakkal",
                "Rasipuram",
                "Tiruchengode"
            ],
            "Pudukkottai": [
                "Alangudi"
            ],
            "Salem": [
                "Gangavalli",
                "Kolathur",
                "Omalur",
                "Thammampati",
                "Thalaivasal",
                "Konganapuram",
                "Vazhapadi"
            ],
            "Thanjavur": [
                "Kumbakonam",
                "Thanjavur",
                "Papanasam"
            ],
            "Vellore": [
                "Ammoor",
                "Vellore"
            ]
        },
        "Karnataka": {
            "Bagalkot": [
                "Bagalakot"
            ],
            "Bangalore": [
                "Bangalore"
            ],
            "Bellary": [
                "Bellary",
                "H.B. Halli"
            ],
            "Bidar": [
                "Basava Kalayana",
                "Bhalki",
                "Bidar",
                "Humanabad"
            ],
            "Dharwad": [
                "Dharwar",
                "Hubli (Amaragol)",
                "Kundagol",
                "Kalagategi"
            ],
            "Gadag": [
                "Gadag",
                "Laxmeshwar",
                "Nargunda"
            ],
            "Hassan": [
                "Arasikere",
                "Hassan",
                "Channarayapatna"
            ],
            "Koppal": [
                "Gangavathi",
                "Koppal"
            ],
            "Mandya": [
                "Nagamangala"
            ],
            "Mysore": [
                "Mysore (Bandipalya)",
                "K.R.Nagar"
            ],
            "Raichur": [
                "Sindhanur"
            ],
            "Shimoga": [
                "Shimoga"
            ],
            "Tumkur": [
                "Sira"
            ]
        },
        "Rajasthan": {
            "Baran": [
                "Anta",
                "Atru",
                "Baran",
                "Chhipabarod (Chhabra)",
                "Chhabra",
                "Kawai Salpura (Atru)",
                "Nahargarh",
                "Samraniyan"
            ],
            "Bhilwara": [
                "Bhilwara",
                "Gulabpura"
            ],
            "Bundi": [
                "Bundi",
                "Dei",
                "Keshoraipatan",
                "Sumerganj"
            ],
            "Hanumangarh": [
                "Goluwala"
            ],
            "Jhalawar": [
                "Bhawani Mandi",
                "Jhalarapatan",
                "Khanpur"
            ],
            "Jodhpur": [
                "Bhagat Ki Kothi"
            ],
            "Kota": [
                "Itawa",
                "Kota",
                "Ramganjmandi"
            ],
            "Pali": [
                "Sumerpur"
            ],
            "Pratapgarh": [
                "Pratapgarh"
            ],
            "Tonk": [
                "Deoli",
                "Dooni",
                "Malpura",
                "Malpura(Todaraisingh)",
                "Niwai",
                "Tonk",
                "Uniyara"
            ]
        },
        "Tripura": {
            "Gomati": [
                "Nutanbazar"
            ]
        },
        "Andhra Pradesh": {
            "Guntur": [
                "Tenali"
            ],
            "Kurnool": [
                "Kurnool"
            ]
        },
        "Himachal Pradesh": {
            "Hamirpur": [
                "Bharuasumerpur",
                "Raath",
                "Muskara"
            ]
        },
        "Kerala": {
            "Idukki": [
                "Vandiperiyar"
            ],
            "Kottayam": [
                "Kottayam"
            ],
            "Malappuram": [
                "Perinthalmanna"
            ]
        },
        "Manipur": {
            "Imphal West": [
                "Imphal"
            ]
        }
    },
    "Chili Red": {
        "Maharashtra": {
            "Ahmednagar": [
                "Ahmednagar",
                "Rahata"
            ],
            "Akola": [
                "Akola"
            ],
            "Chandrapur": [
                "Chandrapur"
            ],
            "Dhule": [
                "Dhule",
                "Dondaicha",
                "Shirpur"
            ],
            "Gadchiroli": [
                "Armori(Desaiganj)",
                "Sironcha"
            ],
            "Kolhapur": [
                "Gadhinglaj"
            ],
            "Nagpur": [
                "Bhiwapur",
                "Mandhal",
                "Nagpur",
                "Ramtek",
                "Hingna"
            ],
            "Nanded": [
                "Dharmabad"
            ],
            "Nandurbar": [
                "Nandurbar"
            ],
            "Pune": [
                "Pune",
                "Indapur(Bhigwan)",
                "Shirur"
            ],
            "Sangli": [
                "Sangli"
            ]
        },
        "Gujarat": {
            "Amreli": [
                "Amreli"
            ],
            "Porbandar": [
                "Porbandar"
            ],
            "Rajkot": [
                "Jetpur(Dist.Rajkot)"
            ],
            "Surat": [
                "Nizar",
                "Nizar(Pumkitalov)"
            ]
        },
        "Uttar Pradesh": {
            "Ayodhya": [
                "Faizabad"
            ],
            "Balrampur": [
                "Ramanujganj"
            ],
            "Fatehpur": [
                "Jahanabad"
            ],
            "Gonda": [
                "Gonda"
            ]
        },
        "Odisha": {
            "Balasore": [
                "Jaleswar"
            ],
            "Gajapati": [
                "Parlakhemundi"
            ]
        },
        "Tamil Nadu": {
            "Coimbatore": [
                "Singanallur(Uzhavar Sandhai )"
            ],
            "Dindigul": [
                "Palani(Uzhavar Sandhai )"
            ],
            "Erode": [
                "Dharapuram"
            ],
            "Karur": [
                "Kulithalai(Uzhavar Sandhai )"
            ],
            "Madurai": [
                "Anna nagar(Uzhavar Sandhai )"
            ],
            "Namakkal": [
                "Rasipuram(Uzhavar Sandhai )",
                "Tiruchengode",
                "Rasipuram",
                "Namakkal(Uzhavar Sandhai )"
            ],
            "Perambalur": [
                "Perambalur(Uzhavar Sandhai )"
            ],
            "Salem": [
                "Sooramangalam(Uzhavar Sandhai )",
                "Ammapet(Uzhavar Sandhai )",
                "Thathakapatti(Uzhavar Sandhai )",
                "Athur(Uzhavar Sandhai )"
            ],
            "Vellore": [
                "Gudiyatham",
                "Gudiyatham(Uzhavar Sandhai )",
                "Katpadi (Uzhavar Sandhai )",
                "Katpadi(Uzhavar Santhai)"
            ]
        },
        "Tripura": {
            "Dhalai": [
                "Kulai"
            ]
        },
        "Madhya Pradesh": {
            "Dhar": [
                "Dhamnod",
                "Dhar",
                "Kukshi",
                "Manawar"
            ],
            "Guna": [
                "Guna"
            ],
            "Gwalior": [
                "Lashkar"
            ],
            "Indore": [
                "Indore",
                "Sanwer"
            ],
            "Jhabua": [
                "Petlawad"
            ],
            "Khandwa": [
                "Khandwa"
            ],
            "Khargone": [
                "Bedia",
                "Sanawad",
                "Khargone",
                "Kasrawad"
            ],
            "Mandsaur": [
                "Mandsaur"
            ],
            "Morena": [
                "Porsa"
            ],
            "Shivpuri": [
                "Barad"
            ]
        },
        "Haryana": {
            "Fatehabad": [
                "Tohana"
            ]
        },
        "Rajasthan": {
            "Jodhpur": [
                "Jodhpur(F&V)(Paota)"
            ],
            "Udaipur": [
                "Udaipur (Grain)"
            ]
        },
        "Telangana": {
            "Khammam": [
                "Bhadrachalam",
                "Madhira",
                "Yellandu"
            ],
            "Warangal": [
                "Kesamudram"
            ]
        },
        "Karnataka": {
            "Kolar": [
                "Malur"
            ],
            "Raichur": [
                "Lingasugur"
            ],
            "Shimoga": [
                "Shimoga"
            ],
            "Tumkur": [
                "Madhugiri"
            ]
        },
        "Assam": {
            "Lakhimpur": [
                "Paliakala"
            ]
        },
        "Nagaland": {
            "Phek": [
                "Phek"
            ]
        },
        "Bihar": {
            "Samastipur": [
                "Samastipur"
            ]
        },
        "Kerala": {
            "Thiruvananthapuram": [
                "Chala"
            ]
        },
        "Meghalaya": {
            "West Khasi Hills": [
                "Nongstoin"
            ]
        }
    },
    "Copra": {
        "Tamil Nadu": {
            "Ariyalur": [
                "Andimadom"
            ],
            "Coimbatore": [
                "Anaimalai",
                "Chengeri",
                "Kianthukadavu",
                "Madathukulam",
                "Negamam",
                "Palladam",
                "Pethappampatti",
                "Pollachi",
                "Pongalur",
                "Udumalpet"
            ],
            "Cuddalore": [
                "Cuddalore",
                "Kurinchipadi",
                "Sethiathoppu",
                "Shrimushnam",
                "Tittakudi",
                "Virudhachalam"
            ],
            "Dindigul": [
                "Dindigul",
                "Gopalpatti",
                "Natham",
                "Palani"
            ],
            "Erode": [
                "Anthiyur",
                "Avalpoonthurai",
                "Boothapadi",
                "Chithode",
                "Elumathur",
                "Gobichettipalayam",
                "Kangeyam",
                "Kavunthapadi",
                "Kodumudi",
                "Muthur",
                "Mylampadi",
                "Nambiyur",
                "Punchaipuliyampatti",
                "Sathyamangalam",
                "Sivagiri",
                "Thalavadi",
                "Vellakkoil"
            ],
            "Nagapattinam": [
                "Sembanarkoil",
                "Thirupoondi",
                "Vedaranyam"
            ],
            "Namakkal": [
                "Namagiripettai",
                "Namakkal",
                "Rasipuram",
                "Tiruchengode",
                "Velur"
            ],
            "Pudukkottai": [
                "Alangudi",
                "Aranthangi"
            ],
            "Salem": [
                "Attur",
                "Konganapuram",
                "Omalur",
                "Salem",
                "Thammampati",
                "Vazhapadi"
            ],
            "Sivaganga": [
                "Singampuneri"
            ],
            "Thanjavur": [
                "Papanasam",
                "Thanjavur"
            ],
            "Theni": [
                "Theni"
            ],
            "Vellore": [
                "Ammoor",
                "Gudiyatham",
                "Katpadi",
                "Vaniyambadi",
                "Vellore"
            ],
            "Virudhunagar": [
                "Rajapalayam",
                "Virudhunagar"
            ]
        },
        "Karnataka": {
            "Bangalore": [
                "Bangalore",
                "Ramanagara"
            ],
            "Chitradurga": [
                "Hiriyur",
                "Holalkere"
            ],
            "Hassan": [
                "Arasikere",
                "Belur",
                "Channarayapatna",
                "Hassan"
            ],
            "Kolar": [
                "Malur"
            ],
            "Mandya": [
                "K.R. Pet",
                "Maddur",
                "Malavalli",
                "Nagamangala"
            ],
            "Shimoga": [
                "Bhadravathi"
            ],
            "Tumkur": [
                "Gubbi",
                "Huliyar",
                "Kunigal",
                "Madhugiri",
                "Sira",
                "Tiptur",
                "Tumkur",
                "Turvekere"
            ]
        },
        "Kerala": {
            "Idukki": [
                "Thodupuzha"
            ]
        },
        "Goa": {
            "North Goa": [
                "Mapusa",
                "Pernem"
            ],
            "South Goa": [
                "Canacona"
            ]
        }
    },
    "Gram Raw(Chholia)": {
        "Punjab": {
            "Amritsar": [
                "Amritsar(Amritsar Mewa Mandi)"
            ],
            "Faridkot": [
                "Jaitu"
            ],
            "Hoshiarpur": [
                "Dasuya"
            ],
            "Jalandhar": [
                "Jalandhar City(Jalandhar)"
            ],
            "Ludhiana": [
                "Ludhiana"
            ],
            "Mansa": [
                "Mansa"
            ],
            "Moga": [
                "Dharamkot"
            ],
            "Patiala": [
                "Patran"
            ],
            "Sangrur": [
                "Bhawanigarh",
                "Lehra Gaga",
                "Malerkotla",
                "Sangrur"
            ]
        },
        "Gujarat": {
            "Gandhinagar": [
                "Mansa(Manas Veg Yard)"
            ],
            "Surat": [
                "Vyra"
            ]
        },
        "Madhya Pradesh": {
            "Jhabua": [
                "Thandla"
            ],
            "Katni": [
                "Katni(F&V)"
            ],
            "Sheopur": [
                "Syopurkalan(F&V)"
            ],
            "Shivpuri": [
                "Kolaras"
            ]
        },
        "Rajasthan": {
            "Jodhpur": [
                "Jodhpur(F&V)(Paota)"
            ]
        }
    },
    "Green Gram (Moong)(Whole)": {
        "Telangana": {
            "Adilabad": [
                "Bhainsa",
                "Chinnoar",
                "Boath"
            ],
            "Karimnagar": [
                "Choppadandi",
                "Jagtial"
            ],
            "Khammam": [
                "Khammam"
            ],
            "Medak": [
                "Jogipet",
                "Sadasivpet",
                "Siddipet",
                "Zaheerabad"
            ],
            "Nalgonda": [
                "Suryapeta",
                "Tirumalagiri"
            ],
            "Nizamabad": [
                "Nizamabad"
            ],
            "Warangal": [
                "Jangaon",
                "Kesamudram",
                "Mahabubabad",
                "Warangal",
                "Thorrur"
            ]
        },
        "Uttar Pradesh": {
            "Agra": [
                "Achnera"
            ],
            "Aligarh": [
                "Aligarh"
            ],
            "Amethi": [
                "Sultanpur"
            ],
            "Auraiya": [
                "Achalda",
                "Auraiya",
                "Dibiapur"
            ],
            "Azamgarh": [
                "Azamgarh"
            ],
            "Badaun": [
                "Badayoun"
            ],
            "Bahraich": [
                "Bahraich"
            ],
            "Ballia": [
                "Rasda"
            ],
            "Deoria": [
                "Devariya"
            ],
            "Etah": [
                "Etah"
            ],
            "Etawah": [
                "Bharthna",
                "Etawah",
                "Jasvantnagar"
            ],
            "Fatehpur": [
                "Bindki",
                "Khaga",
                "Kishunpur"
            ],
            "Firozabad": [
                "Shikohabad",
                "Tundla",
                "Sirsaganj"
            ],
            "Gonda": [
                "Gonda"
            ],
            "Gorakhpur": [
                "Gorakhpur"
            ],
            "Hathras": [
                "Haathras"
            ],
            "Jaunpur": [
                "Jaunpur"
            ],
            "Jhansi": [
                "Jhansi (Grain)",
                "Mauranipur",
                "Moth"
            ],
            "Kanpur Dehat": [
                "Jhijhank",
                "Pukharayan",
                "Rura"
            ],
            "Kasganj": [
                "Kasganj"
            ],
            "Lalitpur": [
                "Lalitpur",
                "Mehrauni"
            ],
            "Lucknow": [
                "Lucknow"
            ],
            "Maharajganj": [
                "Anandnagar"
            ],
            "Mahoba": [
                "Mahoba"
            ],
            "Mainpuri": [
                "Mainpuri"
            ],
            "Mathura": [
                "Kosikalan",
                "Mathura"
            ],
            "Meerut": [
                "Meerut"
            ],
            "Muzaffarnagar": [
                "Muzzafarnagar"
            ],
            "Prayagraj": [
                "Allahabad",
                "Sirsa"
            ],
            "Saharanpur": [
                "Saharanpur"
            ],
            "Shamli": [
                "Shamli"
            ],
            "Varanasi": [
                "Varanasi"
            ]
        },
        "Maharashtra": {
            "Ahmednagar": [
                "Ahmednagar",
                "Jamkhed",
                "Karjat",
                "Kopargaon",
                "Om Chaitanya Multistate Agro Purpose CoOp Society ",
                "Rahuri",
                "Rahuri(Vambori)",
                "Shevgaon",
                "Shevgaon(Bodhegaon)",
                "Shrirampur",
                "Pathardi",
                "Shrigonda",
                "Rahata"
            ],
            "Akola": [
                "Akola",
                "Balapur",
                "Murtizapur",
                "Patur",
                "Telhara"
            ],
            "Beed": [
                "Beed",
                "Gevrai",
                "Kaij",
                "Kille Dharur",
                "Kada",
                "Majalgaon",
                "Parali Vaijyanath",
                "Vadvani"
            ],
            "Bhandara": [
                "Bhandara",
                "Lakhandur",
                "Pavani",
                "Tumsar"
            ],
            "Buldhana": [
                "BSK Krishi Bazar Private Ltd",
                "Buldhana(Dhad)",
                "Chikali",
                "Deoulgaon Raja",
                "Jalgaon Jamod(Aasalgaon)",
                "Jaykissan Krushi Uttpan Khajgi Bazar ",
                "Khamgaon",
                "Lonar",
                "Malkapur",
                "Mehekar",
                "Nandura",
                "Shegaon",
                "Sindkhed Raja"
            ],
            "Chandrapur": [
                "Chandrapur",
                "Varora",
                "Rajura"
            ],
            "Dhule": [
                "Dhule",
                "Dondaicha",
                "Dondaicha(Sindhkheda)",
                "Shirpur",
                "Sakri"
            ],
            "Gadchiroli": [
                "Aheri",
                "Sironcha"
            ],
            "Hingoli": [
                "Akhadabalapur",
                "Hingoli",
                "Hingoli(Kanegoan Naka)",
                "Jawala-Bajar",
                "Sengoan",
                "Vitthal Krushi Utpanna Bazar "
            ],
            "Latur": [
                "Ahmedpur",
                "Aurad Shahajani",
                "Ausa",
                "Chakur",
                "Devani",
                "Jalkot",
                "Latur",
                "Latur(Murud)",
                "Nilanga",
                "Udgir"
            ],
            "Nagpur": [
                "Bhiwapur",
                "Katol",
                "MS Kalpana Agri Commodities Marketing",
                "Nagpur",
                "Ramtek",
                "Umared"
            ],
            "Nanded": [
                "Bhokar",
                "Deglur",
                "Dharmabad",
                "Kandhar",
                "Loha",
                "Mukhed",
                "Nanded"
            ],
            "Nandurbar": [
                "Nandurbar",
                "Navapur",
                "Shahada",
                "Taloda"
            ],
            "Nashik": [
                "Devala",
                "Lasalgaon",
                "Kalvan",
                "Lasalgaon(Niphad)",
                "Lasalgaon(Vinchur)",
                "Malegaon",
                "Manmad",
                "Nandgaon",
                "Sinner",
                "Yeola",
                "Mankamneshwar Farmar Producer CoLtd Sanchalit Mank",
                "Satana"
            ],
            "Parbhani": [
                "Pathari",
                "Jintur",
                "Selu",
                "Sonpeth",
                "Manwat",
                "Parbhani",
                "Palam",
                "Shree Salasar Krushi Bazar ",
                "Tadkalas",
                "Purna"
            ],
            "Pune": [
                "Baramati",
                "Dound",
                "Indapur(Bhigwan)",
                "Pune",
                "Shirur"
            ],
            "Sangli": [
                "Palus",
                "Sangli"
            ],
            "Satara": [
                "Vaduj"
            ],
            "Thane": [
                "Kalyan",
                "Ulhasnagar"
            ],
            "Wardha": [
                "Hinganghat",
                "Sindi(Selu)",
                "Wardha"
            ],
            "Yavatmal": [
                "Cottoncity Agro Foods Private Ltd",
                "Digras",
                "Kisan Market Yard",
                "Mahesh Krushi Utpanna Bazar, Digras",
                "Pandhakawada",
                "Pusad",
                "Vani",
                "Yeotmal",
                "Ramdev Krushi Bazaar",
                "Shekari Krushi Khajgi Bazar",
                "Ner Parasopant"
            ]
        },
        "Rajasthan": {
            "Ajmer": [
                "Madanganj Kishangarh"
            ],
            "Baran": [
                "Atru",
                "Baran",
                "Chhabra",
                "Chhipabarod (Chhabra)",
                "Kawai Salpura (Atru)",
                "Samraniyan",
                "Nahargarh"
            ],
            "Barmer": [
                "Barmer"
            ],
            "Bhilwara": [
                "Bhilwara",
                "Gulabpura"
            ],
            "Bikaner": [
                "Bikaner (Grain)",
                "Khajuwala",
                "Nokha",
                "Lunkaransar",
                "Pugal Road (Grain)"
            ],
            "Bundi": [
                "Bundi",
                "Keshoraipatan"
            ],
            "Churu": [
                "Sadulpur",
                "Sujangarh",
                "Sardar Shahar"
            ],
            "Hanumangarh": [
                "Bhadara",
                "Goluwala",
                "Hanumangarh",
                "Hanumangarh Town",
                "Hanumangarh(Urlivas)",
                "Nohar",
                "Pilibanga",
                "Rawatsar",
                "Sangriya"
            ],
            "Jaipur": [
                "Kishan Renwal(Fulera)"
            ],
            "Jalore": [
                "Bhinmal"
            ],
            "Jhalawar": [
                "Iklera",
                "Khanpur",
                "Jhalarapatan"
            ],
            "Jhunjhunu": [
                "Jhunjhunu",
                "Gudhagorji",
                "Nawalgarh"
            ],
            "Jodhpur": [
                "Bhagat Ki Kothi",
                "Jodhpur (Grain)"
            ],
            "Kota": [
                "Itawa",
                "Kota",
                "Ramganjmandi"
            ],
            "Nagaur": [
                "Deedwana(Choti Khatu)",
                "Degana",
                "Jayal",
                "Merta City",
                "Nagaur",
                "Nagaur(Jayal)"
            ],
            "Pali": [
                "Rani",
                "Sojat Road",
                "Sumerpur"
            ],
            "Pratapgarh": [
                "Pratapgarh"
            ],
            "Sikar": [
                "Fatehpur",
                "Palsana"
            ],
            "Tonk": [
                "Deoli",
                "Dooni",
                "Malpura",
                "Malpura(Todaraisingh)",
                "Niwai",
                "Tonk",
                "Uniyara"
            ],
            "Udaipur": [
                "Udaipur (Grain)"
            ]
        },
        "Madhya Pradesh": {
            "Alirajpur": [
                "Alirajpur",
                "Jobat"
            ],
            "Ashoknagar": [
                "Ashoknagar",
                "Shadora"
            ],
            "Betul": [
                "Betul"
            ],
            "Bhind": [
                "Bhind",
                "Mow"
            ],
            "Bhopal": [
                "Berasia",
                "Bhopal"
            ],
            "Burhanpur": [
                "Burhanpur"
            ],
            "Chhatarpur": [
                "Badamalhera",
                "Chhatarpur",
                "Rajnagar"
            ],
            "Chhindwara": [
                "Chhindwara",
                "Saunsar"
            ],
            "Damoh": [
                "Damoh",
                "Javera",
                "Hata",
                "Patharia"
            ],
            "Datia": [
                "Sevda"
            ],
            "Dewas": [
                "Bagli",
                "Dewas",
                "Kannod",
                "Khategaon",
                "Loharda",
                "Sonkatch"
            ],
            "Dhar": [
                "Dhamnod",
                "Dhar",
                "Manawar"
            ],
            "Dindori": [
                "Shahpura"
            ],
            "Guna": [
                "Aron",
                "Binaganj",
                "Guna",
                "Kumbhraj",
                "Maksudangarh",
                "Raghogarh"
            ],
            "Hoshangabad": [
                "Babai",
                "Banapura",
                "Bankhedi",
                "Itarsi",
                "Hoshangabad",
                "Pipariya",
                "Semriharchand"
            ],
            "Indore": [
                "Mhow"
            ],
            "Jabalpur": [
                "Jabalpur",
                "Paatan",
                "Shahpura(Jabalpur)",
                "Sihora"
            ],
            "Jhabua": [
                "Jhabua"
            ],
            "Katni": [
                "Katni"
            ],
            "Khandwa": [
                "Harsood",
                "Khandwa",
                "Pandhana"
            ],
            "Khargone": [
                "Badwaha",
                "Bhikangaon",
                "Karhi",
                "Khargone",
                "Sanawad"
            ],
            "Mandla": [
                "Mandla"
            ],
            "Morena": [
                "Morena"
            ],
            "Narsinghpur": [
                "Gadarwada",
                "Kareli",
                "Gotegaon",
                "Narsinghpur",
                "Tendukheda"
            ],
            "Neemuch": [
                "Neemuch"
            ],
            "Raisen": [
                "Bareli",
                "Begamganj",
                "Gairatganj",
                "Obedullaganj",
                "Raisen",
                "Silvani",
                "Udaipura"
            ],
            "Rajgarh": [
                "Biaora",
                "Pachaur",
                "Kurawar"
            ],
            "Ratlam": [
                "Sailana",
                "Ratlam"
            ],
            "Rewa": [
                "Hanumana",
                "Rewa"
            ],
            "Sagar": [
                "Bamora",
                "Bina",
                "Garhakota",
                "Deori",
                "Khurai",
                "Rehli",
                "Sagar",
                "Rahatgarh"
            ],
            "Satna": [
                "Amarpatan",
                "Satna"
            ],
            "Sehore": [
                "Baktara",
                "Ichhawar",
                "Nasrullaganj",
                "Rehati",
                "Sehore",
                "Shyampur"
            ],
            "Shajapur": [
                "Agar",
                "Shujalpur"
            ],
            "Sheopur": [
                "Sheopurbadod",
                "Sheopurkalan"
            ],
            "Shivpuri": [
                "Kolaras"
            ],
            "Sidhi": [
                "Sidhi"
            ],
            "Tikamgarh": [
                "Tikamgarh"
            ],
            "Ujjain": [
                "Badnagar",
                "Ujjain"
            ],
            "Vidisha": [
                "Ganjbasoda",
                "Lateri",
                "Shamshabad",
                "Vidisha",
                "Kurwai"
            ]
        },
        "Gujarat": {
            "Amreli": [
                "Amreli",
                "Bagasara",
                "Dhari",
                "Rajula",
                "Savarkundla"
            ],
            "Anand": [
                "Tarapur"
            ],
            "Bharuch": [
                "Amod"
            ],
            "Bhavnagar": [
                "Bhavnagar",
                "Mahuva(Station Road)",
                "Palitana",
                "Taleja"
            ],
            "Botad": [
                "Botad"
            ],
            "Dahod": [
                "Dahod",
                "Zalod(Zalod)"
            ],
            "Gandhinagar": [
                "Kalol",
                "Mansa"
            ],
            "Gir Somnath": [
                "Kodinar",
                "Veraval",
                "Una"
            ],
            "Jamnagar": [
                "Dhrol",
                "Jam Jodhpur",
                "Jamnagar",
                "Kalawad"
            ],
            "Mehsana": [
                "Kadi",
                "Visnagar"
            ],
            "Morbi": [
                "Halvad",
                "Morbi"
            ],
            "Patan": [
                "Patan",
                "Harij",
                "Siddhpur",
                "Sami"
            ],
            "Porbandar": [
                "Porbandar",
                "Kutiyana"
            ],
            "Rajkot": [
                "Dhoraji",
                "Gondal",
                "Jasdan",
                "Jetpur(Dist.Rajkot)",
                "Rajkot",
                "Upleta"
            ],
            "Sabarkantha": [
                "Bhiloda",
                "Himatnagar",
                "Khedbrahma",
                "Idar",
                "Talod",
                "Vadali",
                "Modasa(Tintoi)",
                "Modasa"
            ],
            "Surat": [
                "Mandvi",
                "Songadh",
                "Uchhal",
                "Vyra"
            ],
            "Surendranagar": [
                "Dhragradhra",
                "Chotila",
                "Vadhvan"
            ]
        },
        "Tamil Nadu": {
            "Ariyalur": [
                "Ariyalur Market"
            ],
            "Cuddalore": [
                "Panruti",
                "Sethiathoppu"
            ],
            "Nagapattinam": [
                "Mailaduthurai",
                "Sembanarkoil"
            ],
            "Namakkal": [
                "Tiruchengode"
            ],
            "Salem": [
                "Konganapuram"
            ],
            "Vellore": [
                "Vellore"
            ]
        },
        "Bihar": {
            "Aurangabad": [
                "Aurangabad"
            ]
        },
        "Karnataka": {
            "Bagalkot": [
                "Bagalakot",
                "Hungund"
            ],
            "Bangalore": [
                "Bangalore"
            ],
            "Bellary": [
                "Bellary"
            ],
            "Bidar": [
                "Basava Kalayana",
                "Bhalki",
                "Bidar",
                "Humanabad"
            ],
            "Chitradurga": [
                "Chitradurga",
                "Hosadurga"
            ],
            "Dharwad": [
                "Annigeri",
                "Dharwar",
                "Hubli (Amaragol)",
                "Kundagol",
                "Kalagategi"
            ],
            "Gadag": [
                "Gadag",
                "Laxmeshwar",
                "Mundaragi",
                "Nargunda",
                "Rona"
            ],
            "Hassan": [
                "Arasikere",
                "Hassan",
                "Channarayapatna"
            ],
            "Haveri": [
                "Hirekerur",
                "Haveri",
                "Ranebennur"
            ],
            "Kolar": [
                "Bangarpet",
                "Malur"
            ],
            "Koppal": [
                "Gangavathi",
                "Koppal",
                "Kustagi",
                "Yalburga"
            ],
            "Mandya": [
                "Nagamangala"
            ],
            "Mysore": [
                "K.R.Nagar",
                "Mysore (Bandipalya)"
            ],
            "Raichur": [
                "Raichur",
                "Lingasugur"
            ],
            "Shimoga": [
                "Shimoga"
            ],
            "Tumkur": [
                "Huliyar",
                "Tumkur"
            ]
        },
        "Odisha": {
            "Bargarh": [
                "Attabira"
            ],
            "Gajapati": [
                "Parlakhemundi"
            ],
            "Kalahandi": [
                "Bhawanipatna"
            ],
            "Nayagarh": [
                "Bahadajholla",
                "Sarankul"
            ],
            "Rayagada": [
                "Gunpur",
                "Rayagada(Muniguda)"
            ]
        },
        "Punjab": {
            "Barnala": [
                "Barnala"
            ],
            "Mansa": [
                "Mansa"
            ],
            "Patiala": [
                "Dudhansadhan"
            ],
            "Sangrur": [
                "Ahmedgarh"
            ]
        },
        "Haryana": {
            "Bhiwani": [
                "Siwani"
            ],
            "Fatehabad": [
                "Tohana"
            ],
            "Sirsa": [
                "kalanwali",
                "New Grain Market , Sirsa",
                "Ellanabad"
            ]
        },
        "Himachal Pradesh": {
            "Hamirpur": [
                "Bharuasumerpur",
                "Kurara",
                "Raath"
            ]
        },
        "Kerala": {
            "Kottayam": [
                "Kottayam"
            ],
            "Malappuram": [
                "Manjeri"
            ],
            "Thiruvananthapuram": [
                "Chala"
            ]
        }
    },
    "Groundnut": {
        "Telangana": {
            "Adilabad": [
                "Bhainsa",
                "Boath"
            ],
            "Karimnagar": [
                "Jagtial"
            ],
            "Khammam": [
                "Bhadrachalam",
                "Dammapet"
            ],
            "Medak": [
                "Sadasivpet"
            ],
            "Nalgonda": [
                "Suryapeta",
                "Tirumalagiri"
            ],
            "Nizamabad": [
                "Nizamabad"
            ],
            "Warangal": [
                "Kesamudram",
                "Mahabubabad",
                "Warangal",
                "Jangaon"
            ]
        },
        "Uttar Pradesh": {
            "Agra": [
                "Samsabad"
            ],
            "Amethi": [
                "Sultanpur"
            ],
            "Ayodhya": [
                "Faizabad"
            ],
            "Balrampur": [
                "Ramanujganj"
            ],
            "Etah": [
                "Etah"
            ],
            "Firozabad": [
                "Shikohabad",
                "Sirsaganj"
            ],
            "Ghaziabad": [
                "Ghaziabad"
            ],
            "Gonda": [
                "Gonda"
            ],
            "Hardoi": [
                "Madhoganj"
            ],
            "Jhansi": [
                "Chirgaon",
                "Gurusarai",
                "Jhansi",
                "Jhansi (Grain)",
                "Mauranipur",
                "Moth"
            ],
            "Lalitpur": [
                "Lalitpur",
                "Mehrauni"
            ],
            "Maharajganj": [
                "Anandnagar"
            ],
            "Mahoba": [
                "Charkhari",
                "Mahoba"
            ],
            "Mainpuri": [
                "Bewar",
                "Mainpuri"
            ],
            "Meerut": [
                "Meerut"
            ],
            "Prayagraj": [
                "Allahabad"
            ],
            "Saharanpur": [
                "Saharanpur"
            ],
            "Shahjahanpur": [
                "Jalalabad"
            ],
            "Shamli": [
                "Shamli"
            ],
            "Unnao": [
                "Purwa"
            ]
        },
        "Maharashtra": {
            "Ahmednagar": [
                "Ahmednagar",
                "Jamkhed",
                "Om Chaitanya Multistate Agro Purpose CoOp Society ",
                "Rahuri(Vambori)",
                "Sangamner",
                "Karjat",
                "Shrigonda",
                "Shevgaon"
            ],
            "Akola": [
                "Patur"
            ],
            "Beed": [
                "Kille Dharur",
                "Parali Vaijyanath",
                "Gevrai",
                "Majalgaon",
                "Vadvani"
            ],
            "Buldhana": [
                "Khamgaon",
                "Jaykissan Krushi Uttpan Khajgi Bazar "
            ],
            "Dhule": [
                "Dhule",
                "Dondaicha",
                "Sakri",
                "Shirpur",
                "Dondaicha(Sindhkheda)"
            ],
            "Gadchiroli": [
                "Sironcha"
            ],
            "Hingoli": [
                "Akhadabalapur",
                "Basmat",
                "Hingoli",
                "Sengoan",
                "Jawala-Bajar"
            ],
            "Latur": [
                "Ahmedpur",
                "Ausa",
                "Jalkot",
                "Nilanga"
            ],
            "Nagpur": [
                "Katol",
                "Nagpur",
                "Savner",
                "Ramtek"
            ],
            "Nanded": [
                "Bhokar",
                "Loha",
                "Dharmabad",
                "Nanded",
                "Mudkhed",
                "Naigaon"
            ],
            "Nandurbar": [
                "Navapur",
                "Taloda",
                "Nandurbar"
            ],
            "Nashik": [
                "Lasalgaon",
                "Lasalgaon(Niphad)",
                "Malegaon",
                "Nandgaon",
                "Nasik",
                "Sinner"
            ],
            "Parbhani": [
                "Gangakhed",
                "Jintur",
                "Parbhani",
                "Purna",
                "Manwat",
                "Pathari",
                "Tadkalas"
            ],
            "Pune": [
                "Baramati",
                "Indapur(Bhigwan)",
                "Shirur",
                "Indapur",
                "Indapur(Nimgaon Ketki)"
            ],
            "Raigad": [
                "Karjat(Raigad)"
            ],
            "Sangli": [
                "Palus"
            ],
            "Wardha": [
                "Ashti(Karanja)",
                "Sindi(Selu)"
            ],
            "Yavatmal": [
                "Aarni",
                "Kisan Market Yard",
                "Ramdev Krushi Bazaar",
                "Cottoncity Agro Foods Private Ltd",
                "Yeotmal",
                "Pandhakawada",
                "Pusad",
                "Umarked(Danki)"
            ]
        },
        "Madhya Pradesh": {
            "Alirajpur": [
                "Alirajpur",
                "Jobat",
                "Jobat(F&V)"
            ],
            "Ashoknagar": [
                "Ashoknagar"
            ],
            "Bhind": [
                "Bhind"
            ],
            "Chhatarpur": [
                "Badamalhera",
                "Bijawar",
                "Chhatarpur",
                "Harpalpur",
                "LavKush Nagar(Laundi)",
                "Naugaon",
                "Rajnagar"
            ],
            "Chhindwara": [
                "Chhindwara(F&V)",
                "Pandhurna",
                "Saunsar",
                "Sounsar(F&V)"
            ],
            "Datia": [
                "Bhander",
                "Datia"
            ],
            "Dewas": [
                "Khategaon"
            ],
            "Dhar": [
                "Kukshi",
                "Rajgarh"
            ],
            "Gwalior": [
                "Lashkar"
            ],
            "Indore": [
                "Indore",
                "Mhow",
                "Sanwer"
            ],
            "Jhabua": [
                "Jhabua",
                "Jhabua(F&V)",
                "Petlawad"
            ],
            "Katni": [
                "Katni(F&V)"
            ],
            "Khargone": [
                "Bhikangaon",
                "Kasrawad",
                "Khargone"
            ],
            "Mandsaur": [
                "Mandsaur",
                "Piplya",
                "Sitmau"
            ],
            "Morena": [
                "Morena"
            ],
            "Neemuch": [
                "Neemuch",
                "Javad"
            ],
            "Panna": [
                "Ajaygarh",
                "Panna"
            ],
            "Ratlam": [
                "Ratlam",
                "Jaora"
            ],
            "Rewa": [
                "Rewa"
            ],
            "Sagar": [
                "Shahagarh",
                "Jaisinagar"
            ],
            "Satna": [
                "Satna"
            ],
            "Shajapur": [
                "Agar",
                "Soyatkalan"
            ],
            "Sheopur": [
                "Syopurkalan(F&V)"
            ],
            "Shivpuri": [
                "Badarwas",
                "Barad",
                "Karera",
                "Khanyadhana",
                "Kolaras",
                "Magroni",
                "Pichhour",
                "Pohari",
                "Shivpuri",
                "Khaniadhana"
            ],
            "Tikamgarh": [
                "Khargapur",
                "Niwadi",
                "Prithvipur",
                "Tikamgarh",
                "Tikamgarh(F&V)",
                "Jatara",
                "Palera"
            ],
            "Ujjain": [
                "Badnagar",
                "Ujjain"
            ]
        },
        "Gujarat": {
            "Amreli": [
                "Amreli",
                "Babra",
                "Bagasara",
                "Dhari",
                "Rajula",
                "Savarkundla",
                "Khambha"
            ],
            "Bhavnagar": [
                "Bhavnagar",
                "Mahuva(Station Road)",
                "Palitana",
                "Taleja"
            ],
            "Botad": [
                "Botad"
            ],
            "Dahod": [
                "Dahod"
            ],
            "Gir Somnath": [
                "Kodinar",
                "Veraval"
            ],
            "Jamnagar": [
                "Dhrol",
                "Jam Jodhpur",
                "Jamnagar",
                "Kalawad"
            ],
            "Mehsana": [
                "Vijapur",
                "Visnagar",
                "Vijapur(Gojjariya)",
                "Vijapur(Kukarvada)"
            ],
            "Morbi": [
                "Halvad",
                "Morbi",
                "Vankaner"
            ],
            "Patan": [
                "Patan",
                "Siddhpur"
            ],
            "Porbandar": [
                "Kutiyana",
                "Porbandar"
            ],
            "Rajkot": [
                "Dhoraji",
                "Gondal",
                "Jasdan",
                "Jetpur(Dist.Rajkot)",
                "Rajkot",
                "Upleta"
            ],
            "Sabarkantha": [
                "Bayad",
                "Bhiloda",
                "Dhansura",
                "Himatnagar",
                "Khedbrahma",
                "Modasa",
                "Modasa(Tintoi)",
                "Talod",
                "Idar",
                "Vadali",
                "Vijaynagar(Kundlakap)",
                "Malpur",
                "Prantij"
            ],
            "Surat": [
                "Mandvi",
                "Songadh",
                "Vyra",
                "Uchhal"
            ],
            "Surendranagar": [
                "Dhragradhra",
                "Chotila"
            ]
        },
        "Andhra Pradesh": {
            "Anantapur": [
                "Tenakallu",
                "Kadiri"
            ],
            "Guntur": [
                "Narasaraopet"
            ],
            "Kurnool": [
                "Adoni",
                "Kurnool"
            ],
            "Nellore": [
                "Gudur",
                "Venkatagiri"
            ]
        },
        "Odisha": {
            "Angul": [
                "Talcher"
            ],
            "Gajapati": [
                "Parlakhemundi"
            ],
            "Ganjam": [
                "Digapahandi"
            ],
            "Kalahandi": [
                "Kesinga"
            ],
            "Koraput": [
                "Koraput(Semilguda)"
            ]
        },
        "Tamil Nadu": {
            "Ariyalur": [
                "Andimadom",
                "Ariyalur Market",
                "Jayamkondam"
            ],
            "Chengalpattu": [
                "Guduvancheri(Uzhavar Sandhai )",
                "Jameenrayapettai(Uzhavar Sandhai )",
                "Madhuranthagam(Uzhavar Sandhai )",
                "Pallavaram(Uzhavar Sandhai )",
                "Medavakkam(Uzhavar Sandhai )",
                "Nanganallur(Uzhavar Sandhai )"
            ],
            "Coimbatore": [
                "Anaimalai",
                "Mettupalayam(Uzhavar Sandhai )",
                "Palladam",
                "Pudupalayam",
                "RSPuram(Uzhavar Sandhai )",
                "Sevur",
                "Udumalpet",
                "Vadavalli(Uzhavar Sandhai )",
                "Sundarapuram(Uzhavar Sandhai )",
                "Kurichi(Uzhavar Sandhai )",
                "Singanallur(Uzhavar Sandhai )",
                "Karamadai"
            ],
            "Cuddalore": [
                "Cuddalore",
                "Cuddalore(Uzhavar Sandhai )",
                "Kurinchipadi",
                "Panruti",
                "Virudhachalam",
                "Tittakudi",
                "Shrimushnam"
            ],
            "Dharmapuri": [
                "AJattihalli(Uzhavar Sandhai )",
                "Dharmapuri(Uzhavar Sandhai )",
                "Pennagaram(Uzhavar Sandhai )",
                "Harur(Uzhavar Sandhai )"
            ],
            "Dindigul": [
                "Dindigul",
                "Dindigul(Uzhavar Sandhai )",
                "Palani(Uzhavar Sandhai )",
                "Palani"
            ],
            "Erode": [
                "Anthiyur",
                "Avalpoonthurai",
                "Bhavani",
                "Boothapadi",
                "Chithode",
                "Dharapuram",
                "Kodumudi",
                "Muthur",
                "Periyar Nagar(Uzhavar Sandhai )",
                "Perundurai(Uzhavar Sandhai )",
                "Punchaipuliyampatti",
                "Sampath Nagar(Uzhavar Sandhai )",
                "Sathiyamagalam(Uzhavar Sandhai )",
                "Sivagiri",
                "Vellankoil",
                "Erode",
                "Gobichettipalayam",
                "Mylampadi",
                "Nambiyur",
                "Vellakkoil",
                "Perundurai"
            ],
            "Krishnagiri": [
                "Hosur(Uzhavar Sandhai )",
                "Krishnagiri(Uzhavar Sandhai )",
                "Hosur",
                "Krishnagiri",
                "Denkanikottai(Uzhavar Sandhai )"
            ],
            "Madurai": [
                "Anaiyur(Uzhavar Sandhai )",
                "Anna nagar(Uzhavar Sandhai )",
                "Chokkikulam(Uzhavar Sandhai )",
                "Melur(Uzhavar Sandhai )",
                "Palanganatham(Uzhavar Sandhai )",
                "Melur"
            ],
            "Nagapattinam": [
                "Nagapattinam(Uzhavar Sandhai )",
                "Sirkali(Uzhavar Sandhai )",
                "Nagapattinam",
                "Sirkali",
                "Vedaranyam"
            ],
            "Namakkal": [
                "Kumarapalayam(Uzhavar Sandhai )",
                "Mohanur(Uzhavar Sandhai )",
                "Namagiripettai",
                "Namakkal",
                "Namakkal(Uzhavar Sandhai )",
                "Paramathivelur(Uzhavar Sandhai )",
                "Rasipuram",
                "Rasipuram(Uzhavar Sandhai )",
                "Tiruchengode"
            ],
            "Perambalur": [
                "Perambalur(Uzhavar Sandhai )"
            ],
            "Pudukkottai": [
                "Alangudi",
                "Alangudi(Uzhavar Sandhai )",
                "Pudukottai(Uzhavar Sandhai )",
                "Pudukottai"
            ],
            "Ranipet": [
                "Arcot(Uzhavar Sandhai )",
                "Ranipettai(Uzhavar Sandhai )"
            ],
            "Salem": [
                "Ammapet(Uzhavar Sandhai )",
                "Athur(Uzhavar Sandhai )",
                "Attur",
                "Attayampatti(Uzhavar Sandhai )",
                "Elampillai(Uzhavar Sandhai )",
                "Gangavalli",
                "Hasthampatti(Uzhavar Sandhai )",
                "Jalagandapuram(Uzhavar Sandhai )",
                "Kolathur",
                "Konganapuram",
                "Mettur(Uzhavar Sandhai )",
                "Omalur",
                "Thalaivasal",
                "Thammampati",
                "Thathakapatti(Uzhavar Sandhai )",
                "Salem",
                "Edappadi",
                "Vazhapadi",
                "Sankagiri",
                "Karumanturai"
            ],
            "Theni": [
                "Chinnamanur(Uzhavar Sandhai )"
            ],
            "Vellore": [
                "Arcot",
                "Ammoor",
                "Gudiyatham(Uzhavar Sandhai )",
                "Kahithapattarai(Uzhavar Sandhai )",
                "Katpadi (Uzhavar Sandhai )",
                "Thirupathur",
                "Vaniyambadi",
                "Vellore",
                "Gudiyatham",
                "Katpadi(Uzhavar Santhai)"
            ],
            "Virudhunagar": [
                "Aruppukottai(Uzhavar Sandhai )",
                "Aruppukottai"
            ]
        },
        "Karnataka": {
            "Bagalkot": [
                "Bagalakot",
                "Badami",
                "Bagalkot(Bilagi)"
            ],
            "Bangalore": [
                "Bangalore",
                "Ramanagara"
            ],
            "Bellary": [
                "Bellary",
                "Kottur",
                "H.B. Halli"
            ],
            "Bidar": [
                "Basava Kalayana"
            ],
            "Chitradurga": [
                "Challakere",
                "Chitradurga",
                "Hiriyur"
            ],
            "Dharwad": [
                "Hubli (Amaragol)",
                "Kundagol",
                "Dharwar"
            ],
            "Gadag": [
                "Gadag",
                "Laxmeshwar",
                "Mundaragi",
                "Rona"
            ],
            "Haveri": [
                "Ranebennur",
                "Savanur",
                "Haveri"
            ],
            "Kolar": [
                "Chickkaballapura",
                "Mulabagilu",
                "Gowribidanoor",
                "Chintamani",
                "Kolar"
            ],
            "Koppal": [
                "Gangavathi",
                "Koppal",
                "Kustagi",
                "Yalburga"
            ],
            "Mysore": [
                "Mysore (Bandipalya)"
            ],
            "Raichur": [
                "Lingasugur",
                "Raichur"
            ],
            "Shimoga": [
                "Sorabha"
            ],
            "Tumkur": [
                "Madhugiri",
                "Pavagada",
                "Sira",
                "Tumkur",
                "Gubbi"
            ]
        },
        "Rajasthan": {
            "Baran": [
                "Kawai Salpura (Atru)"
            ],
            "Bhilwara": [
                "Bhilwara"
            ],
            "Bikaner": [
                "Bikaner (Grain)",
                "Khajuwala",
                "Lunkaransar",
                "Nokha",
                "Pugal Road (Grain)",
                "Sridungargarh"
            ],
            "Chittorgarh": [
                "Barisadri",
                "Chittorgarh",
                "Nimbahera",
                "Begu"
            ],
            "Churu": [
                "Sardar Shahar",
                "Sujangarh"
            ],
            "Dausa": [
                "Dausa",
                "Lalsot"
            ],
            "Hanumangarh": [
                "Hanumangarh Town",
                "Nohar",
                "Rawatsar"
            ],
            "Jaisalmer": [
                "Mohangarh"
            ],
            "Jhunjhunu": [
                "Gudhagorji",
                "Chirawa",
                "Nawalgarh"
            ],
            "Jodhpur": [
                "Jodhpur (Grain)"
            ],
            "Sikar": [
                "Palsana",
                "Sikar"
            ],
            "Tonk": [
                "Dooni",
                "Malpura",
                "Niwai"
            ],
            "Udaipur": [
                "Fatehnagar"
            ]
        },
        "Haryana": {
            "Fatehabad": [
                "Bhattu Kalan"
            ],
            "Sirsa": [
                "Ding",
                "Ellanabad"
            ]
        },
        "Himachal Pradesh": {
            "Hamirpur": [
                "Muskara",
                "Raath"
            ]
        },
        "Uttarakhand": {
            "Haridwar": [
                "Lakshar",
                "Roorkee"
            ]
        },
        "West Bengal": {
            "Malda": [
                "Gajol"
            ]
        }
    },
    "Jowar(Sorghum)": {
        "Telangana": {
            "Adilabad": [
                "Bhainsa",
                "Boath",
                "Indravelly(Utnoor)"
            ],
            "Khammam": [
                "Bhadrachalam"
            ],
            "Medak": [
                "Jogipet",
                "Sadasivpet",
                "Zaheerabad"
            ],
            "Nalgonda": [
                "Suryapeta"
            ],
            "Nizamabad": [
                "Nizamabad"
            ],
            "Warangal": [
                "Warangal"
            ]
        },
        "Maharashtra": {
            "Ahmednagar": [
                "Ahmednagar",
                "Jamkhed",
                "Karjat",
                "Kopargaon",
                "Om Chaitanya Multistate Agro Purpose CoOp Society ",
                "Pathardi",
                "Rahata",
                "Rahuri(Vambori)",
                "Sangamner",
                "Shevgaon",
                "Shevgaon(Bodhegaon)",
                "Shrigonda",
                "Shrirampur",
                "Shrigonda(Gogargaon)",
                "Rahuri"
            ],
            "Akola": [
                "Akola",
                "Akot",
                "Balapur",
                "Murtizapur",
                "Patur",
                "Telhara"
            ],
            "Beed": [
                "Ambejaogai",
                "Beed",
                "Gevrai",
                "Kada",
                "Kaij",
                "Kille Dharur",
                "Majalgaon",
                "Parali Vaijyanath",
                "Vadvani"
            ],
            "Buldhana": [
                "Buldhana(Dhad)",
                "Chikali",
                "Deoulgaon Raja",
                "Jalgaon Jamod(Aasalgaon)",
                "Jaykissan Krushi Uttpan Khajgi Bazar ",
                "Khamgaon",
                "Lonar",
                "Malkapur",
                "Nandura",
                "Shegaon",
                "Mehekar",
                "Motala",
                "Sangrampur(Varvatbakal)"
            ],
            "Chandrapur": [
                "Varora"
            ],
            "Dhule": [
                "Dhule",
                "Dondaicha",
                "Dondaicha(Sindhkheda)",
                "Shirpur",
                "Sakri"
            ],
            "Gadchiroli": [
                "Aheri",
                "Sironcha"
            ],
            "Hingoli": [
                "Akhadabalapur",
                "Hingoli"
            ],
            "Latur": [
                "Ahmedpur",
                "Aurad Shahajani",
                "Ausa",
                "Chakur",
                "Devani",
                "Jalkot",
                "Latur",
                "Nilanga",
                "Latur(Murud)"
            ],
            "Nagpur": [
                "Katol",
                "Nagpur",
                "Savner"
            ],
            "Nanded": [
                "Bhokar",
                "Himalyatnagar",
                "Kandhar",
                "Loha",
                "Mudkhed",
                "Mukhed",
                "Nanded",
                "Umari",
                "Dharmabad"
            ],
            "Nandurbar": [
                "Akkalkuwa",
                "Dhadgaon",
                "Nandurbar",
                "Navapur",
                "Shahada",
                "Taloda"
            ],
            "Nashik": [
                "Devala",
                "Kalvan",
                "Lasalgaon",
                "Lasalgaon(Niphad)",
                "Malegaon",
                "Manmad",
                "Nandgaon",
                "Sinner",
                "Yeola"
            ],
            "Parbhani": [
                "Jintur",
                "Manwat",
                "Palam",
                "Parbhani",
                "Pathari",
                "Shree Salasar Krushi Bazar ",
                "Sonpeth",
                "Tadkalas",
                "Selu",
                "Purna",
                "Gangakhed",
                "Bori"
            ],
            "Pune": [
                "Dound",
                "Indapur",
                "Indapur(Bhigwan)",
                "Indapur(Nimgaon Ketki)",
                "Nira(Saswad)",
                "Pune",
                "Shirur"
            ],
            "Raigad": [
                "Karjat(Raigad)"
            ],
            "Sangli": [
                "Sangli",
                "Tasgaon",
                "Palus"
            ],
            "Satara": [
                "Phaltan",
                "Vaduj"
            ],
            "Thane": [
                "Kalyan",
                "Ulhasnagar"
            ],
            "Wardha": [
                "Hinganghat",
                "Wardha"
            ],
            "Yavatmal": [
                "Cottoncity Agro Foods Private Ltd",
                "Digras",
                "Kalamb",
                "Kisan Market Yard",
                "Mahesh Krushi Utpanna Bazar, Digras",
                "Pusad",
                "Ramdev Krushi Bazaar",
                "Shekari Krushi Khajgi Bazar",
                "Umarked(Danki)",
                "Yeotmal",
                "Pandhakawada",
                "Umarkhed",
                "Vani"
            ]
        },
        "Rajasthan": {
            "Ajmer": [
                "Madanganj Kishangarh"
            ],
            "Alwar": [
                "Alwar",
                "Kherli",
                "Laxmangarh (Barodamev)"
            ],
            "Baran": [
                "Baran"
            ],
            "Bharatpur": [
                "Bharatpur",
                "Nadwai"
            ],
            "Bhilwara": [
                "Bhilwara",
                "Gulabpura",
                "Gangapur"
            ],
            "Bundi": [
                "Bundi",
                "Sumerganj"
            ],
            "Dausa": [
                "Dausa",
                "Bandikui",
                "Lalsot",
                "Madanganj Mahuwa",
                "Madanganj Mandawar"
            ],
            "Jaipur": [
                "Jaipur (Grain)"
            ],
            "Jodhpur": [
                "Bhagat Ki Kothi",
                "Jodhpur (Grain)"
            ],
            "Karauli": [
                "Hindoun"
            ],
            "Kota": [
                "Kota",
                "Ramganjmandi"
            ],
            "Nagaur": [
                "Degana",
                "Nagaur",
                "Jayal"
            ],
            "Pali": [
                "Sumerpur",
                "Rani"
            ],
            "Tonk": [
                "Deoli",
                "Dooni",
                "Malpura",
                "Malpura(Todaraisingh)",
                "Niwai",
                "Tonk",
                "Uniyara"
            ],
            "Udaipur": [
                "Fatehnagar",
                "Udaipur (Grain)"
            ]
        },
        "Madhya Pradesh": {
            "Alirajpur": [
                "Alirajpur"
            ],
            "Ashoknagar": [
                "Ashoknagar"
            ],
            "Balaghat": [
                "Balaghat"
            ],
            "Betul": [
                "Bhensdehi",
                "Betul"
            ],
            "Bhind": [
                "Bhind",
                "Alampur",
                "Gohad",
                "Lahar",
                "Mehgaon",
                "Mow"
            ],
            "Burhanpur": [
                "Burhanpur"
            ],
            "Chhatarpur": [
                "LavKush Nagar(Laundi)"
            ],
            "Chhindwara": [
                "Saunsar",
                "Pandhurna",
                "Chhindwara",
                "Sounsar(F&V)"
            ],
            "Damoh": [
                "Damoh",
                "Hata"
            ],
            "Datia": [
                "Sevda"
            ],
            "Dewas": [
                "Dewas",
                "Khategaon",
                "Sonkatch"
            ],
            "Dhar": [
                "Dhamnod"
            ],
            "Guna": [
                "Guna"
            ],
            "Gwalior": [
                "Dabra",
                "Lashkar"
            ],
            "Hoshangabad": [
                "Banapura",
                "Itarsi",
                "Pipariya"
            ],
            "Indore": [
                "Indore",
                "Mhow",
                "Indore(F&V)"
            ],
            "Katni": [
                "Katni"
            ],
            "Khandwa": [
                "Khandwa"
            ],
            "Khargone": [
                "Badwaha",
                "Bhikangaon",
                "Khargone",
                "Sanawad",
                "Kasrawad",
                "Karhi"
            ],
            "Morena": [
                "Banmorkalan",
                "Porsa"
            ],
            "Narsinghpur": [
                "Narsinghpur"
            ],
            "Neemuch": [
                "Neemuch",
                "Manasa"
            ],
            "Panna": [
                "Ajaygarh"
            ],
            "Raisen": [
                "Obedullaganj",
                "Raisen"
            ],
            "Rajgarh": [
                "Biaora",
                "Jeerapur",
                "Khilchipur"
            ],
            "Sagar": [
                "Sagar",
                "Bina",
                "Khurai"
            ],
            "Satna": [
                "Satna"
            ],
            "Seoni": [
                "Chhpara",
                "Seoni"
            ],
            "Shajapur": [
                "Agar",
                "Shujalpur",
                "Susner"
            ],
            "Sheopur": [
                "Sheopurkalan"
            ],
            "Shivpuri": [
                "Kolaras",
                "Rannod"
            ],
            "Sidhi": [
                "Sidhi"
            ],
            "Ujjain": [
                "Ujjain"
            ],
            "Vidisha": [
                "Ganjbasoda",
                "Vidisha",
                "Shamshabad",
                "Sironj"
            ]
        },
        "Gujarat": {
            "Amreli": [
                "Amreli",
                "Bagasara",
                "Dhari",
                "Babra",
                "Khambha",
                "Rajula",
                "Savarkundla"
            ],
            "Bharuch": [
                "Jambusar",
                "Jambusar(Kaavi)",
                "Amod"
            ],
            "Bhavnagar": [
                "Bhavnagar",
                "Mahuva(Station Road)",
                "Palitana",
                "Taleja"
            ],
            "Botad": [
                "Botad"
            ],
            "Dahod": [
                "Dahod"
            ],
            "Gandhinagar": [
                "Kalol",
                "Mansa"
            ],
            "Gir Somnath": [
                "Kodinar",
                "Veraval"
            ],
            "Jamnagar": [
                "Dhrol",
                "Jam Jodhpur",
                "Jamnagar"
            ],
            "Mehsana": [
                "Kadi",
                "Vijapur",
                "Visnagar",
                "Vijapur(Gojjariya)",
                "Vijapur(Kukarvada)"
            ],
            "Morbi": [
                "Halvad",
                "Morbi",
                "Vankaner"
            ],
            "Patan": [
                "Harij",
                "Patan",
                "Radhanpur",
                "Siddhpur",
                "Sami"
            ],
            "Porbandar": [
                "Porbandar"
            ],
            "Rajkot": [
                "Dhoraji",
                "Gondal",
                "Jasdan",
                "Rajkot",
                "Upleta"
            ],
            "Sabarkantha": [
                "Himatnagar",
                "Khedbrahma",
                "Talod",
                "Vadali"
            ],
            "Surat": [
                "Mandvi",
                "Nizar",
                "Nizar(Kukarmuda)",
                "Songadh",
                "Vyra",
                "Nizar(Pumkitalov)",
                "Kosamba"
            ],
            "Surendranagar": [
                "Chotila",
                "Dhragradhra",
                "Dasada Patadi"
            ]
        },
        "Tamil Nadu": {
            "Ariyalur": [
                "Ariyalur Market"
            ],
            "Coimbatore": [
                "Annur",
                "Chengeri",
                "Thiruppur"
            ],
            "Erode": [
                "Alangeyam",
                "Punchaipuliyampatti",
                "Sathyamangalam"
            ],
            "Madurai": [
                "Usilampatty"
            ],
            "Namakkal": [
                "Namakkal",
                "Namagiripettai",
                "Tiruchengode"
            ],
            "Ramanathapuram": [
                "Kamuthi",
                "Ramanathapuram(phase 3)"
            ],
            "Salem": [
                "Thammampati"
            ],
            "Vellore": [
                "Vellore"
            ],
            "Virudhunagar": [
                "Virudhunagar",
                "Sathur"
            ]
        },
        "Karnataka": {
            "Bagalkot": [
                "Bagalakot",
                "Badami",
                "Bagalkot(Bilagi)"
            ],
            "Bangalore": [
                "Bangalore"
            ],
            "Bellary": [
                "Bellary",
                "Kottur",
                "Hospet",
                "H.B. Halli"
            ],
            "Bidar": [
                "Basava Kalayana",
                "Bidar"
            ],
            "Dharwad": [
                "Dharwar",
                "Hubli (Amaragol)",
                "Kalagategi"
            ],
            "Gadag": [
                "Gadag",
                "Laxmeshwar",
                "Rona",
                "Mundaragi",
                "Nargunda"
            ],
            "Hassan": [
                "Arasikere",
                "Hassan",
                "Holenarsipura"
            ],
            "Haveri": [
                "Haveri",
                "Ranebennur",
                "Savanur",
                "Shiggauv",
                "Hirekerur"
            ],
            "Kolar": [
                "Bangarpet",
                "Malur"
            ],
            "Koppal": [
                "Gangavathi",
                "Koppal",
                "Kustagi",
                "Yalburga"
            ],
            "Mysore": [
                "Mysore (Bandipalya)"
            ],
            "Raichur": [
                "Lingasugur",
                "Raichur",
                "Sindhanur",
                "Manvi"
            ],
            "Shimoga": [
                "Shimoga",
                "Bhadravathi"
            ],
            "Tumkur": [
                "Sira"
            ]
        },
        "Uttar Pradesh": {
            "Balrampur": [
                "Ramanujganj"
            ],
            "Fatehpur": [
                "Kishunpur"
            ],
            "Firozabad": [
                "Firozabad"
            ]
        },
        "Himachal Pradesh": {
            "Hamirpur": [
                "Bharuasumerpur",
                "Kurara",
                "Raath"
            ]
        },
        "Andhra Pradesh": {
            "Kurnool": [
                "Alur",
                "Banaganapalli"
            ]
        }
    },
    "Lentil (Masur)(Whole)": {
        "Uttar Pradesh": {
            "Aligarh": [
                "Aligarh"
            ],
            "Amethi": [
                "Jafarganj",
                "Sultanpur"
            ],
            "Ayodhya": [
                "Faizabad"
            ],
            "Azamgarh": [
                "Azamgarh"
            ],
            "Badaun": [
                "Badayoun",
                "Wazirganj"
            ],
            "Bahraich": [
                "Bahraich",
                "Naanpara"
            ],
            "Ballia": [
                "Ballia",
                "Rasda"
            ],
            "Balrampur": [
                "Balrampur",
                "Tulsipur",
                "Ramanujganj",
                "Panchpedwa"
            ],
            "Banda": [
                "Atarra",
                "Baberu",
                "Banda"
            ],
            "Barabanki": [
                "Safdarganj"
            ],
            "Bareilly": [
                "Bareilly"
            ],
            "Basti": [
                "Basti"
            ],
            "Deoria": [
                "Devariya"
            ],
            "Fatehpur": [
                "Fatehpur",
                "Kishunpur"
            ],
            "Firozabad": [
                "Shikohabad",
                "Sirsaganj"
            ],
            "Ghazipur": [
                "Gazipur",
                "Jangipura",
                "Yusufpur"
            ],
            "Gonda": [
                "Gonda",
                "Karnailganj",
                "Nawabganj"
            ],
            "Gorakhpur": [
                "Gorakhpur"
            ],
            "Hardoi": [
                "Madhoganj",
                "Shahabad(New Mandi)"
            ],
            "Jaunpur": [
                "Jaunpur",
                "Mugrabaadshahpur"
            ],
            "Jhansi": [
                "Chirgaon",
                "Gurusarai",
                "Jhansi",
                "Jhansi (Grain)",
                "Mauranipur",
                "Moth"
            ],
            "Kushinagar": [
                "Tamkuhi road"
            ],
            "Lalitpur": [
                "Lalitpur",
                "Mehrauni"
            ],
            "Maharajganj": [
                "Partaval"
            ],
            "Mahoba": [
                "Charkhari",
                "Mahoba"
            ],
            "Mathura": [
                "Mathura"
            ],
            "Meerut": [
                "Meerut"
            ],
            "Mirzapur": [
                "Ahirora",
                "Mirzapur"
            ],
            "Muzaffarnagar": [
                "Muzzafarnagar"
            ],
            "Prayagraj": [
                "Allahabad",
                "Sirsa"
            ],
            "Rampur": [
                "Rampur"
            ],
            "Saharanpur": [
                "Saharanpur"
            ],
            "Sambhal": [
                "Bhehjoi"
            ],
            "Shahjahanpur": [
                "Puwaha",
                "Shahjahanpur"
            ],
            "Shamli": [
                "Shamli"
            ],
            "Sitapur": [
                "Sitapur"
            ],
            "Sonbhadra": [
                "Robertsganj"
            ],
            "Varanasi": [
                "Varanasi"
            ]
        },
        "Madhya Pradesh": {
            "Alirajpur": [
                "Alirajpur",
                "Jobat"
            ],
            "Ashoknagar": [
                "Ashoknagar",
                "Chanderi",
                "Isagarh",
                "Mungawali",
                "Piprai",
                "Shadora"
            ],
            "Betul": [
                "Betul"
            ],
            "Bhind": [
                "Alampur",
                "Gohad",
                "Mow",
                "Lahar"
            ],
            "Bhopal": [
                "Berasia",
                "Bhopal"
            ],
            "Chhatarpur": [
                "Bakswaha",
                "LavKush Nagar(Laundi)",
                "Chhatarpur"
            ],
            "Chhindwara": [
                "Amarwda",
                "Chaurai",
                "Chhindwara"
            ],
            "Damoh": [
                "Damoh",
                "Hata",
                "Javera",
                "Patharia"
            ],
            "Datia": [
                "Bhander",
                "Datia",
                "Sevda"
            ],
            "Dewas": [
                "Bagli",
                "Dewas",
                "Sonkatch",
                "Khategaon"
            ],
            "Dhar": [
                "Badnawar",
                "Dhar",
                "Rajgarh",
                "Manawar"
            ],
            "Dindori": [
                "Dindori",
                "Gorakhpur",
                "Shahpura"
            ],
            "Guna": [
                "Aron",
                "Binaganj",
                "Guna",
                "Kumbhraj",
                "Maksudangarh"
            ],
            "Hoshangabad": [
                "Itarsi",
                "Pipariya",
                "Pipariya(F&V)",
                "Bankhedi"
            ],
            "Indore": [
                "Indore",
                "Gautampura",
                "Mhow",
                "Sanwer"
            ],
            "Jabalpur": [
                "Jabalpur",
                "Paatan",
                "Sehora",
                "Shahpura Bhitoni (F&V)",
                "Shahpura(Jabalpur)",
                "Sihora",
                "Patan(F&V)"
            ],
            "Katni": [
                "Katni"
            ],
            "Khandwa": [
                "Khandwa",
                "Harsood"
            ],
            "Mandla": [
                "Bichhiya",
                "Mandla",
                "Nainpur"
            ],
            "Mandsaur": [
                "Daloda",
                "Garoth",
                "Mandsaur",
                "Piplya",
                "Shamgarh",
                "Sitmau"
            ],
            "Narsinghpur": [
                "Gadarwada",
                "Gotegaon",
                "Gotegaon(F&V)",
                "Kareli",
                "Kareli(F&V)",
                "Narsinghpur",
                "Tendukheda"
            ],
            "Neemuch": [
                "Manasa",
                "Neemuch"
            ],
            "Panna": [
                "Ajaygarh",
                "Devandranagar",
                "Panna",
                "Simariya",
                "Pawai"
            ],
            "Raisen": [
                "Bareli",
                "Begamganj",
                "Gairatganj",
                "Obedullaganj",
                "Raisen",
                "Silvani",
                "Udaipura"
            ],
            "Rajgarh": [
                "Biaora",
                "Chhapiheda",
                "Jeerapur",
                "Khilchipur",
                "Khujner",
                "Kurawar",
                "Narsinghgarh",
                "Pachaur",
                "Sarangpur",
                "Machalpur",
                "Suthalia"
            ],
            "Ratlam": [
                "Jaora",
                "Ratlam",
                "Sailana",
                "Sailana(F&V)"
            ],
            "Rewa": [
                "Baikunthpur",
                "Chaakghat",
                "Hanumana",
                "Rewa"
            ],
            "Sagar": [
                "Bamora",
                "Banda",
                "Bina",
                "Deori",
                "Garhakota",
                "Jaisinagar",
                "Khurai",
                "Kesli",
                "Rahatgarh",
                "Rehli",
                "Sagar",
                "Malthone",
                "Shahagarh"
            ],
            "Satna": [
                "Amarpatan",
                "Mehar",
                "Nagod",
                "Ramnagar",
                "Satna"
            ],
            "Sehore": [
                "Ashta",
                "Ichhawar",
                "Jawar",
                "Sehore",
                "Shyampur"
            ],
            "Seoni": [
                "Ghansour",
                "Chhpara",
                "Lakhnadon",
                "Barghat",
                "Seoni"
            ],
            "Shajapur": [
                "Agar",
                "Akodiya",
                "Badod",
                "Kalapipal",
                "Momanbadodiya",
                "Nalkehda",
                "Shajapur",
                "Shujalpur",
                "Soyatkalan",
                "Susner"
            ],
            "Sheopur": [
                "Vijaypur"
            ],
            "Shivpuri": [
                "Badarwas",
                "Khatora",
                "Kolaras",
                "Rannod",
                "Shivpuri",
                "Pohari"
            ],
            "Sidhi": [
                "Sidhi"
            ],
            "Tikamgarh": [
                "Jatara",
                "Tikamgarh",
                "Palera"
            ],
            "Ujjain": [
                "Badnagar",
                "Tarana",
                "Ujjain",
                "Mahidpur",
                "Khachrod"
            ],
            "Vidisha": [
                "Ganjbasoda",
                "Kurwai",
                "Lateri",
                "Gulabganj",
                "Shamshabad",
                "Sironj",
                "Vidisha"
            ]
        },
        "Bihar": {
            "Aurangabad": [
                "Aurangabad"
            ],
            "Buxar": [
                "Brahmpur"
            ]
        },
        "Rajasthan": {
            "Baran": [
                "Baran",
                "Samraniyan",
                "Nahargarh"
            ],
            "Bhilwara": [
                "Bhilwara",
                "Bijolia"
            ],
            "Bundi": [
                "Bundi",
                "Dei",
                "Keshoraipatan",
                "Sumerganj"
            ],
            "Jhalawar": [
                "Bhawani Mandi",
                "Jhalarapatan",
                "Choumahla"
            ],
            "Jhunjhunu": [
                "Gudhagorji"
            ],
            "Kota": [
                "Kota",
                "Ramganjmandi"
            ],
            "Pratapgarh": [
                "Pratapgarh"
            ],
            "Tonk": [
                "Deoli",
                "Dooni",
                "Uniyara"
            ]
        },
        "Maharashtra": {
            "Bhandara": [
                "Tumsar",
                "Bhandara"
            ],
            "Pune": [
                "Pune"
            ],
            "Sangli": [
                "Sangli"
            ]
        },
        "Himachal Pradesh": {
            "Bilaspur": [
                "Pendraroad"
            ],
            "Hamirpur": [
                "Bharuasumerpur",
                "Kurara",
                "Maudaha",
                "Muskara",
                "Raath"
            ]
        },
        "Uttarakhand": {
            "Champawat": [
                "Tanakpur"
            ],
            "Haridwar": [
                "Lakshar"
            ]
        },
        "Gujarat": {
            "Dahod": [
                "Dahod"
            ],
            "Surat": [
                "Vyra"
            ]
        },
        "Assam": {
            "Lakhimpur": [
                "Golagokarnath",
                "Lakhimpur",
                "Paliakala"
            ]
        },
        "West Bengal": {
            "Malda": [
                "English Bazar"
            ],
            "North 24 Parganas": [
                "Habra"
            ],
            "Paschim Bardhaman": [
                "Asansol",
                "Durgapur"
            ]
        }
    },
    "Maize": {
        "Telangana": {
            "Adilabad": [
                "Asifabad",
                "Bhainsa",
                "Indravelly(Utnoor)",
                "Jainath",
                "Kagaznagar",
                "Laxettipet",
                "Chinnoar",
                "Boath",
                "Sarangapur"
            ],
            "Karimnagar": [
                "Choppadandi",
                "Gopalraopet",
                "Husnabad",
                "Jagtial",
                "Karimnagar",
                "Mallial(Cheppial)",
                "Medipally",
                "Pudur",
                "Koratla",
                "Dharmapuri",
                "Gollapally",
                "Gangadhara",
                "Dharmaram",
                "Kathalapur",
                "Sultanabad",
                "Vemulawada"
            ],
            "Khammam": [
                "Dammapet",
                "Burgampadu",
                "Khammam",
                "Madhira",
                "Sattupalli",
                "Yellandu",
                "Nelakondapally",
                "Kothagudem",
                "Bhadrachalam",
                "Charla"
            ],
            "Medak": [
                "Gajwel",
                "Dubbak",
                "Jogipet",
                "Sadasivpet",
                "Siddipet",
                "Narsapur",
                "Zaheerabad"
            ],
            "Nalgonda": [
                "Suryapeta",
                "Tirumalagiri",
                "Halia",
                "Aler"
            ],
            "Nizamabad": [
                "Nizamabad",
                "Banswada",
                "Bichkunda",
                "Kamareddy",
                "Pitlam",
                "Yellareddy",
                "Gandhari"
            ],
            "Warangal": [
                "Jangaon",
                "Ghanpur",
                "Kesamudram",
                "Mahabubabad",
                "Narsampet",
                "Narsampet(Nekonda)",
                "Warangal",
                "Thorrur",
                "Mulugu",
                "Wardhannapet"
            ]
        },
        "Uttar Pradesh": {
            "Agra": [
                "Fatehpur Sikri",
                "Agra",
                "Fatehabad"
            ],
            "Aligarh": [
                "Aligarh",
                "Atrauli",
                "Charra",
                "Khair"
            ],
            "Auraiya": [
                "Achalda",
                "Auraiya",
                "Dibiapur"
            ],
            "Ayodhya": [
                "Faizabad"
            ],
            "Badaun": [
                "Babrala",
                "Badayoun",
                "Bilsi",
                "Dataganj",
                "Ujhani",
                "Visoli",
                "Wazirganj",
                "Shahaswan"
            ],
            "Bahraich": [
                "Bahraich",
                "Naanpara"
            ],
            "Balrampur": [
                "Balrampur",
                "Bariya",
                "Kusmee",
                "Ramanujganj",
                "Rajpur"
            ],
            "Barabanki": [
                "Barabanki"
            ],
            "Bareilly": [
                "Bareilly"
            ],
            "Bijnor": [
                "Bijnaur"
            ],
            "Deoria": [
                "Devariya"
            ],
            "Etah": [
                "Aliganj",
                "Etah"
            ],
            "Etawah": [
                "Bharthna",
                "Jasvantnagar"
            ],
            "Firozabad": [
                "Firozabad",
                "Shikohabad",
                "Tundla",
                "Sirsaganj"
            ],
            "Ghaziabad": [
                "Ghaziabad",
                "Hapur"
            ],
            "Gonda": [
                "Gonda",
                "Karnailganj",
                "Nawabganj"
            ],
            "Gorakhpur": [
                "Gorakhpur"
            ],
            "Hardoi": [
                "Hardoi",
                "Madhoganj",
                "Sandi",
                "Sandila",
                "Shahabad(New Mandi)"
            ],
            "Hathras": [
                "Haathras",
                "Sikandraraau"
            ],
            "Jaunpur": [
                "Jaunpur"
            ],
            "Kanpur Dehat": [
                "Pukharayan",
                "Rura",
                "Jhijhank"
            ],
            "Kasganj": [
                "Kasganj"
            ],
            "Lalitpur": [
                "Lalitpur"
            ],
            "Mainpuri": [
                "Bewar",
                "Ghiraur",
                "Mainpuri"
            ],
            "Mathura": [
                "Mathura"
            ],
            "Meerut": [
                "Meerut"
            ],
            "Prayagraj": [
                "Allahabad"
            ],
            "Saharanpur": [
                "Saharanpur"
            ],
            "Sambhal": [
                "Bhehjoi"
            ],
            "Shahjahanpur": [
                "Jalalabad",
                "Puwaha",
                "Shahjahanpur",
                "Tilhar"
            ],
            "Shamli": [
                "Shamli"
            ],
            "Shravasti": [
                "Bhinga"
            ],
            "Unnao": [
                "Bangarmau",
                "Unnao"
            ],
            "Varanasi": [
                "Varanasi"
            ]
        },
        "Maharashtra": {
            "Ahmednagar": [
                "Ahmednagar",
                "Jamkhed",
                "Karjat",
                "Kopargaon",
                "Om Chaitanya Multistate Agro Purpose CoOp Society ",
                "Rahata",
                "Rahuri",
                "Rahuri(Vambori)",
                "Shevgaon",
                "Shrigonda(Gogargaon)",
                "Shrirampur",
                "Shrirampur(Belapur)",
                "Sangamner",
                "Shrigonda",
                "Shevgaon(Bodhegaon)",
                "Akole",
                "Pathardi"
            ],
            "Akola": [
                "Akola",
                "Akot",
                "Telhara"
            ],
            "Beed": [
                "Beed",
                "Gevrai",
                "Kille Dharur",
                "Kada",
                "Majalgaon",
                "Parali Vaijyanath",
                "Kaij"
            ],
            "Bhandara": [
                "Bhandara"
            ],
            "Buldhana": [
                "Buldhana",
                "Buldhana(Dhad)",
                "Chikali",
                "Deoulgaon Raja",
                "Jalgaon Jamod(Aasalgaon)",
                "Khamgaon",
                "Jaykissan Krushi Uttpan Khajgi Bazar ",
                "Malkapur",
                "Nandura",
                "Lonar",
                "Motala",
                "Shegaon",
                "Sangrampur(Varvatbakal)"
            ],
            "Dhule": [
                "Dhule",
                "Dondaicha",
                "Dondaicha(Sindhkheda)",
                "Shirpur",
                "Sakri"
            ],
            "Gadchiroli": [
                "Sironcha"
            ],
            "Latur": [
                "Ahmedpur",
                "Ausa",
                "Chakur"
            ],
            "Nagpur": [
                "Katol",
                "Nagpur",
                "Savner"
            ],
            "Nanded": [
                "Bhokar",
                "Dharmabad"
            ],
            "Nandurbar": [
                "Akkalkuwa",
                "Dhadgaon",
                "Nandurbar",
                "Navapur",
                "Shahada",
                "Taloda"
            ],
            "Nashik": [
                "Chandvad",
                "Devala",
                "Kalvan",
                "Lasalgaon",
                "Lasalgaon(Niphad)",
                "Lasalgaon(Vinchur)",
                "Malegaon",
                "Manmad",
                "Nandgaon",
                "Nampur",
                "Satana",
                "Shivsiddha Govind Producer Company Limited Sanchal",
                "Sinner",
                "Yeola"
            ],
            "Parbhani": [
                "Pathari"
            ],
            "Pune": [
                "Baramati",
                "Indapur(Bhigwan)",
                "Indapur(Nimgaon Ketki)",
                "Dound",
                "Pune",
                "Shirur",
                "Indapur",
                "Nira(Saswad)"
            ],
            "Raigad": [
                "Karjat(Raigad)"
            ],
            "Sangli": [
                "Tasgaon",
                "Palus",
                "Sangli"
            ],
            "Satara": [
                "Vaduj",
                "Phaltan"
            ],
            "Yavatmal": [
                "Vani",
                "Kisan Market Yard"
            ]
        },
        "Rajasthan": {
            "Ajmer": [
                "Madanganj Kishangarh"
            ],
            "Alwar": [
                "Alwar"
            ],
            "Baran": [
                "Atru",
                "Baran",
                "Chhabra",
                "Chhipabarod (Chhabra)",
                "Kawai Salpura (Atru)",
                "Nahargarh",
                "Samraniyan"
            ],
            "Bhilwara": [
                "Bhilwara",
                "Bijolia",
                "Gangapur",
                "Gulabpura"
            ],
            "Bundi": [
                "Bundi",
                "Dei",
                "Keshoraipatan",
                "Sumerganj"
            ],
            "Chittorgarh": [
                "Barisadri",
                "Begu",
                "Kapasan",
                "Nimbahera"
            ],
            "Dausa": [
                "Dausa",
                "Lalsot",
                "Bandikui"
            ],
            "Hanumangarh": [
                "Hanumangarh",
                "Sangriya",
                "Hanumangarh Town",
                "Pilibanga"
            ],
            "Jaipur": [
                "Jaipur (Grain)"
            ],
            "Jhalawar": [
                "Bhawani Mandi",
                "Choumahla",
                "Iklera",
                "Jhalarapatan",
                "Khanpur",
                "Dag",
                "Manohar Thana"
            ],
            "Jodhpur": [
                "Jodhpur (Grain)"
            ],
            "Kota": [
                "Kota",
                "Ramganjmandi"
            ],
            "Pali": [
                "Sumerpur",
                "Rani"
            ],
            "Pratapgarh": [
                "Chhotisadri",
                "Pratapgarh"
            ],
            "Rajsamand": [
                "Rajsamand"
            ],
            "Tonk": [
                "Deoli",
                "Dooni",
                "Malpura",
                "Niwai",
                "Tonk",
                "Malpura(Todaraisingh)",
                "Uniyara"
            ],
            "Udaipur": [
                "Fatehnagar",
                "Udaipur (Grain)"
            ]
        },
        "Madhya Pradesh": {
            "Alirajpur": [
                "Alirajpur",
                "Jobat",
                "Jobat(F&V)"
            ],
            "Ashoknagar": [
                "Ashoknagar",
                "Chanderi",
                "Isagarh",
                "Mungawali",
                "Piprai",
                "Shadora"
            ],
            "Balaghat": [
                "Balaghat",
                "Mohgaon",
                "Varaseoni"
            ],
            "Betul": [
                "Betul",
                "Bhensdehi",
                "Multai"
            ],
            "Bhind": [
                "Bhind"
            ],
            "Bhopal": [
                "Bhopal",
                "Berasia"
            ],
            "Burhanpur": [
                "Burhanpur"
            ],
            "Chhatarpur": [
                "Badamalhera",
                "Bakswaha",
                "Bijawar",
                "Chhatarpur"
            ],
            "Chhindwara": [
                "Amarwda",
                "Chaurai",
                "Chhindwara",
                "Pandhurna",
                "Saunsar",
                "Sounsar(F&V)",
                "Chhindwara(F&V)"
            ],
            "Damoh": [
                "Damoh",
                "Hata",
                "Javera",
                "Patharia"
            ],
            "Datia": [
                "Datia"
            ],
            "Dewas": [
                "Bagli",
                "Dewas",
                "Haatpipliya",
                "Kannod",
                "Khategaon",
                "Loharda",
                "Sonkatch"
            ],
            "Dhar": [
                "Badnawar",
                "Dhamnod",
                "Dhar",
                "Gandhwani",
                "Kukshi",
                "Manawar",
                "Rajgarh"
            ],
            "Dindori": [
                "Dindori",
                "Gorakhpur",
                "Shahpura"
            ],
            "Guna": [
                "Aron",
                "Binaganj",
                "Guna",
                "Kumbhraj",
                "Maksudangarh",
                "Raghogarh"
            ],
            "Gwalior": [
                "Lashkar",
                "Dabra"
            ],
            "Hoshangabad": [
                "Banapura",
                "Banapura(F&V)",
                "Babai",
                "Bankhedi",
                "Hoshangabad",
                "Hoshangabad(F&V)",
                "Itarsi",
                "Pipariya",
                "Pipariya(F&V)",
                "Semriharchand"
            ],
            "Indore": [
                "Gautampura",
                "Indore",
                "Mhow",
                "Mhow(F&V)",
                "Sanwer",
                "Indore(F&V)"
            ],
            "Jabalpur": [
                "Jabalpur",
                "Paatan",
                "Shahpura Bhitoni (F&V)",
                "Shahpura(Jabalpur)",
                "Patan(F&V)",
                "Sehora",
                "Sihora"
            ],
            "Jhabua": [
                "Jhabua",
                "Jhabua(F&V)",
                "Petlawad",
                "Petlawad(F&V)",
                "Thandla"
            ],
            "Katni": [
                "Katni",
                "Katni(F&V)"
            ],
            "Khandwa": [
                "Harsood",
                "Khandwa",
                "Pandhana",
                "Badwah(F&V)",
                "Mundi"
            ],
            "Khargone": [
                "Badwaha",
                "Bhikangaon",
                "Karhi",
                "Kasrawad",
                "Khargone",
                "Sanawad",
                "Segaon"
            ],
            "Mandla": [
                "Bichhiya",
                "Mandla",
                "Nainpur"
            ],
            "Mandsaur": [
                "Bhanpura",
                "Garoth",
                "Daloda",
                "Mandsaur",
                "Shamgarh",
                "Sitamau(F&V)",
                "Sitmau",
                "Suvasra",
                "Piplya"
            ],
            "Narsinghpur": [
                "Gadarwara(F&V)",
                "Gotegaon",
                "Gotegaon(F&V)",
                "Kareli",
                "Kareli(F&V)",
                "Gadarwada",
                "Narsinghpur",
                "Tendukheda"
            ],
            "Neemuch": [
                "Javad",
                "Manasa",
                "Neemuch"
            ],
            "Raisen": [
                "Begamganj",
                "Gairatganj",
                "Obedullaganj",
                "Raisen",
                "Silvani"
            ],
            "Rajgarh": [
                "Biaora",
                "Chhapiheda",
                "Jeerapur",
                "Khilchipur",
                "Khujner",
                "Machalpur",
                "Pachaur",
                "Narsinghgarh",
                "Kurawar",
                "Suthalia",
                "Sarangpur"
            ],
            "Ratlam": [
                "A lot",
                "Ratlam",
                "Sailana",
                "Sailana(F&V)",
                "Jaora"
            ],
            "Rewa": [
                "Hanumana"
            ],
            "Sagar": [
                "Banda",
                "Bina",
                "Deori",
                "Garhakota",
                "Jaisinagar",
                "Kesli",
                "Rahatgarh",
                "Rehli",
                "Sagar",
                "Khurai",
                "Shahagarh"
            ],
            "Satna": [
                "Nagod",
                "Satna",
                "Mehar"
            ],
            "Sehore": [
                "Ashta",
                "Baktara",
                "Ichhawar",
                "Ichhawar(F&V)",
                "Nasrullaganj",
                "Rehati",
                "Sehore",
                "Jawar"
            ],
            "Seoni": [
                "Barghat",
                "Chhapara(F&V)",
                "Chhpara",
                "Ghansour",
                "Keolari",
                "Kewalri(F&V)",
                "Lakhnadon",
                "Palari",
                "Palari(F&V)",
                "Seoni"
            ],
            "Shajapur": [
                "Agar",
                "Soyatkalan",
                "Susner",
                "Kalapipal",
                "Shujalpur",
                "Badod",
                "Shajapur"
            ],
            "Sheopur": [
                "Sheopurbadod",
                "Sheopurkalan",
                "Syopurkalan(F&V)"
            ],
            "Shivpuri": [
                "Badarwas",
                "Khanyadhana",
                "Khatora",
                "Kolaras",
                "Rannod",
                "Shivpuri",
                "Karera",
                "Khaniadhana",
                "Pohari",
                "Barad"
            ],
            "Sidhi": [
                "Sidhi"
            ],
            "Tikamgarh": [
                "Tikamgarh"
            ],
            "Ujjain": [
                "Nagda",
                "Ujjain"
            ],
            "Vidisha": [
                "Ganjbasoda",
                "Lateri",
                "Kurwai",
                "Sironj",
                "Vidisha",
                "Shamshabad"
            ]
        },
        "Haryana": {
            "Ambala": [
                "Naraingarh",
                "Shahzadpur",
                "Mullana",
                "Mullana(saha)",
                "Barara",
                "Ambala Cantt."
            ],
            "Bhiwani": [
                "Tosham"
            ],
            "Fatehabad": [
                "Tohana",
                "Bhattu Kalan"
            ],
            "Jind": [
                "Pillukhera"
            ],
            "Kurukshetra": [
                "Babain",
                "Ladwa",
                "Pipli",
                "Shahabad"
            ],
            "Palwal": [
                "Hodal"
            ],
            "Panchkula": [
                "Raipur Rai",
                "Barwala"
            ],
            "Sirsa": [
                "kalanwali"
            ]
        },
        "Gujarat": {
            "Amreli": [
                "Amreli",
                "Bagasara",
                "Dhari",
                "Rajula",
                "Savarkundla"
            ],
            "Anand": [
                "Anand"
            ],
            "Bharuch": [
                "Jambusar",
                "Jambusar(Kaavi)"
            ],
            "Bhavnagar": [
                "Mahuva(Station Road)",
                "Palitana",
                "Bhavnagar",
                "Taleja"
            ],
            "Dahod": [
                "Dahod",
                "Limkheda",
                "Zalod(Sanjeli)",
                "Zalod(Zalod)",
                "Davgadbaria(Piplod)",
                "Devgadhbaria"
            ],
            "Jamnagar": [
                "Jamnagar"
            ],
            "Porbandar": [
                "Porbandar"
            ],
            "Rajkot": [
                "Gondal",
                "Jasdan",
                "Rajkot",
                "Dhoraji"
            ],
            "Sabarkantha": [
                "Bhiloda",
                "Bayad",
                "Dhansura",
                "Himatnagar",
                "Idar",
                "Khedbrahma",
                "Malpur",
                "Modasa",
                "Modasa(Tintoi)",
                "Talod",
                "Vadali",
                "Vijaynagar(Kundlakap)",
                "Idar(Jadar)",
                "Khedbrahma(Lambadia)"
            ],
            "Surat": [
                "Nizar",
                "Nizar(Kukarmuda)",
                "Nizar(Pumkitalov)",
                "Uchhal",
                "Vyra",
                "Songadh"
            ],
            "Surendranagar": [
                "Chotila"
            ]
        },
        "Punjab": {
            "Amritsar": [
                "Rayya",
                "Majitha",
                "Gehri(Jandiala mandi)",
                "Mehta"
            ],
            "Barnala": [
                "Tapa(Tapa Mandi)"
            ],
            "Fazilka": [
                "Fazilka"
            ],
            "Hoshiarpur": [
                "Garhshankar(Saila Khurd)"
            ],
            "Jalandhar": [
                "Jalandhar City",
                "Jalandhar City(Kartar Pur Dana mandi)",
                "Nakodar",
                "Nakodar(Sarih)",
                "Noor Mehal",
                "Shahkot",
                "Shakot (Malsian)",
                "Jalandhar Cantt."
            ],
            "Ludhiana": [
                "Khanna",
                "Nurpurbet",
                "Purain",
                "Sidhwan Bet",
                "Sidhwan Bet (Lodhiwala)",
                "Samrala",
                "Sahnewal",
                "Mansura"
            ],
            "Patiala": [
                "Rajpura"
            ],
            "Sangrur": [
                "Ahmedgarh",
                "Amargarh",
                "Malerkotla"
            ]
        },
        "Andhra Pradesh": {
            "Anantapur": [
                "Kadiri",
                "Tenakallu",
                "Rayadurg"
            ],
            "Krishna": [
                "Tiruvuru",
                "Nuzvid",
                "Mylavaram"
            ],
            "Kurnool": [
                "Kurnool",
                "Atmakur"
            ],
            "Nellore": [
                "Rapur"
            ],
            "West Godavari": [
                "Chintalapudi"
            ]
        },
        "Tamil Nadu": {
            "Ariyalur": [
                "Andimadom",
                "Ariyalur Market",
                "Jayamkondam"
            ],
            "Chengalpattu": [
                "Guduvancheri(Uzhavar Sandhai )",
                "Jameenrayapettai(Uzhavar Sandhai )",
                "Medavakkam(Uzhavar Sandhai )",
                "Pallavaram(Uzhavar Sandhai )"
            ],
            "Coimbatore": [
                "Mettupalayam(Uzhavar Sandhai )",
                "RSPuram(Uzhavar Sandhai )",
                "Singanallur(Uzhavar Sandhai )",
                "Udumalpet",
                "Vadavalli(Uzhavar Sandhai )",
                "Kurichi(Uzhavar Sandhai )",
                "Annur",
                "Pethappampatti",
                "Pongalur",
                "Madathukulam",
                "Pudupalayam",
                "Sulur",
                "Thiruppur",
                "Palladam",
                "Thondamuthur",
                "Anaimalai",
                "Chengeri",
                "Negamam"
            ],
            "Cuddalore": [
                "Shrimushnam",
                "Tittakudi",
                "Cuddalore",
                "Virudhachalam",
                "Panruti",
                "Sethiathoppu"
            ],
            "Dharmapuri": [
                "AJattihalli(Uzhavar Sandhai )",
                "Dharmapuri(Uzhavar Sandhai )",
                "Harur(Uzhavar Sandhai )",
                "Palacode(Uzhavar Sandhai )",
                "Palakode",
                "Pennagaram(Uzhavar Sandhai )",
                "Pennagaram"
            ],
            "Dindigul": [
                "Palani(Uzhavar Sandhai )",
                "Palani",
                "Dindigul",
                "Natham",
                "Oddunchairum",
                "Gopalpatti"
            ],
            "Erode": [
                "Gobichettipalayam(Uzhavar Sandhai )",
                "Periyar Nagar(Uzhavar Sandhai )",
                "Perundurai(Uzhavar Sandhai )",
                "Sathiyamagalam(Uzhavar Sandhai )",
                "Sampath Nagar(Uzhavar Sandhai )",
                "Thalavadi(Uzhavar Sandhai )",
                "Sathyamangalam",
                "Gobichettipalayam",
                "Perundurai",
                "Thalavadi",
                "Alangeyam",
                "Anthiyur",
                "Boothapadi",
                "Dharapuram",
                "Mylampadi",
                "Chithode",
                "Punchaipuliyampatti"
            ],
            "Karur": [
                "Pallapatti (Uzhavar Sandhai )"
            ],
            "Krishnagiri": [
                "Hosur(Uzhavar Sandhai )",
                "Krishnagiri",
                "Krishnagiri(Uzhavar Sandhai )",
                "Hosur"
            ],
            "Madurai": [
                "Anaiyur(Uzhavar Sandhai )",
                "Chokkikulam(Uzhavar Sandhai )"
            ],
            "Namakkal": [
                "Kumarapalayam(Uzhavar Sandhai )",
                "Namakkal(Uzhavar Sandhai )",
                "Rasipuram(Uzhavar Sandhai )",
                "Tiruchengode",
                "Mohanur(Uzhavar Sandhai )",
                "Namakkal",
                "Namagiripettai",
                "Velur",
                "Rasipuram"
            ],
            "Pudukkottai": [
                "Pudukottai(Uzhavar Sandhai )",
                "Alangudi"
            ],
            "Ranipet": [
                "Arcot(Uzhavar Sandhai )",
                "Ranipettai(Uzhavar Sandhai )"
            ],
            "Salem": [
                "Ammapet(Uzhavar Sandhai )",
                "Athur(Uzhavar Sandhai )",
                "Attayampatti(Uzhavar Sandhai )",
                "Elampillai(Uzhavar Sandhai )",
                "Hasthampatti(Uzhavar Sandhai )",
                "Jalagandapuram(Uzhavar Sandhai )",
                "Mettur(Uzhavar Sandhai )",
                "Sooramangalam(Uzhavar Sandhai )",
                "Thathakapatti(Uzhavar Sandhai )",
                "Thammampatti (Uzhavar Sandhai )",
                "Attur",
                "Gangavalli",
                "Kolathur",
                "Karumanturai",
                "Omalur",
                "Thalaivasal",
                "Thammampati",
                "Vazhapadi",
                "Konganapuram"
            ],
            "Theni": [
                "Kambam(Uzhavar Sandhai )",
                "Bodinayakkanur"
            ],
            "Vellore": [
                "Kahithapattarai(Uzhavar Sandhai )",
                "Gudiyatham(Uzhavar Sandhai )",
                "Katpadi (Uzhavar Sandhai )",
                "Thirupathur",
                "Vellore",
                "Katpadi(Uzhavar Santhai)",
                "Vaniyambadi"
            ],
            "Virudhunagar": [
                "Sathur",
                "Virudhunagar"
            ]
        },
        "Karnataka": {
            "Bagalkot": [
                "Bagalakot",
                "Bagalkot(Bilagi)",
                "Badami",
                "Hungund"
            ],
            "Bangalore": [
                "Bangalore",
                "Hoskote",
                "Ramanagara",
                "Doddaballa Pur"
            ],
            "Bellary": [
                "Bellary",
                "Kottur",
                "H.B. Halli",
                "Sirguppa",
                "Hospet"
            ],
            "Bidar": [
                "Bidar"
            ],
            "Chitradurga": [
                "Challakere",
                "Chitradurga",
                "Hiriyur",
                "Holalkere",
                "Hosadurga"
            ],
            "Dharwad": [
                "Annigeri",
                "Hubli (Amaragol)",
                "Kalagategi",
                "Kundagol",
                "Dharwar"
            ],
            "Gadag": [
                "Gadag",
                "Laxmeshwar",
                "Mundaragi",
                "Nargunda",
                "Rona"
            ],
            "Hassan": [
                "Arasikere",
                "Arakalgud",
                "Belur",
                "Hassan",
                "Holenarsipura",
                "Channarayapatna"
            ],
            "Haveri": [
                "Byadagi",
                "Hirekerur",
                "Savanur",
                "Shiggauv",
                "Haveri",
                "Hanagal",
                "Ranebennur"
            ],
            "Kolar": [
                "Bangarpet",
                "Chickkaballapura",
                "Gowribidanoor",
                "Kolar",
                "Chintamani",
                "Malur",
                "Mulabagilu"
            ],
            "Koppal": [
                "Gangavathi",
                "Koppal",
                "Kustagi",
                "Yalburga"
            ],
            "Mandya": [
                "K.R. Pet",
                "Nagamangala",
                "Malavalli"
            ],
            "Mysore": [
                "Hunsur",
                "K.R.Nagar",
                "Mysore (Bandipalya)",
                "Piriya Pattana",
                "Santhesargur",
                "Nanjangud"
            ],
            "Raichur": [
                "Lingasugur",
                "Raichur",
                "Sindhanur"
            ],
            "Shimoga": [
                "Bhadravathi",
                "Sorabha",
                "Shimoga",
                "Shikaripura"
            ],
            "Tumkur": [
                "Madhugiri",
                "Sira",
                "Tumkur",
                "Pavagada",
                "Huliyar",
                "Gubbi"
            ]
        },
        "Himachal Pradesh": {
            "Bilaspur": [
                "Pendraroad",
                "Sakri"
            ]
        },
        "Nagaland": {
            "Dimapur": [
                "Nuiland"
            ],
            "Longleng": [
                "Longleng"
            ],
            "Tuensang": [
                "Tuensang"
            ],
            "Wokha": [
                "Wokha Town"
            ],
            "Zunheboto": [
                "Ghathashi"
            ]
        },
        "Odisha": {
            "Gajapati": [
                "Parlakhemundi"
            ],
            "Ganjam": [
                "Digapahandi"
            ],
            "Kalahandi": [
                "Kesinga"
            ],
            "Koraput": [
                "Koraput(Semilguda)",
                "Koraput"
            ],
            "Malkangiri": [
                "Malkanagiri"
            ],
            "Rayagada": [
                "Gunpur",
                "Rayagada(Muniguda)"
            ]
        },
        "Uttarakhand": {
            "Haridwar": [
                "Lakshar"
            ]
        },
        "Manipur": {
            "Imphal West": [
                "Imphal"
            ],
            "Thoubal": [
                "Thoubal"
            ]
        },
        "Assam": {
            "Lakhimpur": [
                "Golagokarnath",
                "Lakhimpur"
            ]
        },
        "Bihar": {
            "Muzaffarpur": [
                "Muzaffarpur"
            ],
            "Samastipur": [
                "Saidpurhat"
            ]
        }
    },
    "Mustard": {
        "Telangana": {
            "Adilabad": [
                "Bhainsa"
            ],
            "Nizamabad": [
                "Nizamabad"
            ],
            "Warangal": [
                "Warangal"
            ]
        },
        "Uttar Pradesh": {
            "Agra": [
                "Achnera",
                "Agra",
                "Fatehabad",
                "Jagnair",
                "Khairagarh",
                "Fatehpur Sikri",
                "Samsabad"
            ],
            "Aligarh": [
                "Aligarh",
                "Atrauli",
                "Charra",
                "Khair"
            ],
            "Amethi": [
                "Jafarganj",
                "Sultanpur"
            ],
            "Amroha": [
                "Amroha"
            ],
            "Auraiya": [
                "Achalda",
                "Auraiya"
            ],
            "Ayodhya": [
                "Faizabad"
            ],
            "Azamgarh": [
                "Azamgarh"
            ],
            "Badaun": [
                "Bilsi",
                "Ujhani",
                "Badayoun",
                "Babrala",
                "Wazirganj"
            ],
            "Baghpat": [
                "Baraut"
            ],
            "Bahraich": [
                "Bahraich",
                "Naanpara"
            ],
            "Ballia": [
                "Ballia",
                "Rasda"
            ],
            "Balrampur": [
                "Balrampur",
                "Ramanujganj",
                "Kusmee",
                "Tulsipur",
                "Panchpedwa",
                "Rajpur"
            ],
            "Banda": [
                "Atarra",
                "Banda",
                "Baberu"
            ],
            "Barabanki": [
                "Barabanki",
                "Safdarganj"
            ],
            "Bareilly": [
                "Bareilly"
            ],
            "Basti": [
                "Basti"
            ],
            "Bijnor": [
                "Bijnaur"
            ],
            "Chandauli": [
                "Chandoli"
            ],
            "Deoria": [
                "Devariya",
                "Barhaj"
            ],
            "Etah": [
                "Aliganj",
                "Etah"
            ],
            "Etawah": [
                "Bharthna",
                "Etawah"
            ],
            "Fatehpur": [
                "Bindki",
                "Fatehpur",
                "Jahanabad",
                "Khaga",
                "Kishunpur"
            ],
            "Firozabad": [
                "Tundla",
                "Shikohabad",
                "Sirsaganj"
            ],
            "Ghaziabad": [
                "Ghaziabad",
                "Hapur",
                "Muradnagar",
                "Noida"
            ],
            "Ghazipur": [
                "Gazipur",
                "Jangipura",
                "Jamanian",
                "Yusufpur"
            ],
            "Gonda": [
                "Gonda",
                "Karnailganj",
                "Nawabganj"
            ],
            "Gorakhpur": [
                "Gorakhpur"
            ],
            "Hardoi": [
                "Hardoi",
                "Madhoganj",
                "Shahabad(New Mandi)"
            ],
            "Hathras": [
                "Haathras",
                "Sikandraraau"
            ],
            "Jaunpur": [
                "Jaunpur",
                "Mugrabaadshahpur",
                "Shahganj"
            ],
            "Jhansi": [
                "Jhansi",
                "Chirgaon",
                "Gurusarai",
                "Mauranipur",
                "Moth",
                "Jhansi (Grain)"
            ],
            "Kanpur Dehat": [
                "Jhijhank",
                "Pukharayan",
                "Rura"
            ],
            "Kasganj": [
                "Kasganj"
            ],
            "Kaushambi": [
                "Bharwari"
            ],
            "Kushinagar": [
                "Tamkuhi road"
            ],
            "Lalitpur": [
                "Lalitpur"
            ],
            "Lucknow": [
                "Lucknow"
            ],
            "Maharajganj": [
                "Anandnagar",
                "Partaval"
            ],
            "Mahoba": [
                "Charkhari",
                "Mahoba"
            ],
            "Mainpuri": [
                "Bewar",
                "Ghiraur",
                "Mainpuri"
            ],
            "Mathura": [
                "Kosikalan",
                "Mathura"
            ],
            "Meerut": [
                "Meerut",
                "Mawana"
            ],
            "Mirzapur": [
                "Ahirora",
                "Mirzapur"
            ],
            "Muzaffarnagar": [
                "Muzzafarnagar"
            ],
            "Prayagraj": [
                "Allahabad",
                "Sirsa",
                "Ajuha",
                "Jasra"
            ],
            "Rampur": [
                "Milak",
                "Rampur"
            ],
            "Saharanpur": [
                "Saharanpur"
            ],
            "Sambhal": [
                "Bhehjoi",
                "Chandausi",
                "Muradabad"
            ],
            "Shahjahanpur": [
                "Puwaha",
                "Shahjahanpur"
            ],
            "Shamli": [
                "Shamli"
            ],
            "Sitapur": [
                "Sitapur"
            ],
            "Sonbhadra": [
                "Robertsganj"
            ],
            "Unnao": [
                "Bangarmau",
                "Unnao"
            ],
            "Varanasi": [
                "Varanasi"
            ]
        },
        "Gujarat": {
            "Ahmedabad": [
                "Mandal"
            ],
            "Amreli": [
                "Amreli",
                "Rajula"
            ],
            "Anand": [
                "Borsad",
                "Anand"
            ],
            "Bhavnagar": [
                "Bhavnagar",
                "Palitana"
            ],
            "Botad": [
                "Botad"
            ],
            "Dahod": [
                "Dahod"
            ],
            "Gandhinagar": [
                "Kalol",
                "Mansa"
            ],
            "Gir Somnath": [
                "Una",
                "Veraval"
            ],
            "Jamnagar": [
                "Dhrol",
                "Jam Jodhpur",
                "Jamnagar",
                "Kalawad"
            ],
            "Mehsana": [
                "Kadi",
                "Mehsana",
                "Mehsana(Jornang)",
                "Unjha",
                "Visnagar",
                "Vijapur(Gojjariya)",
                "Becharaji",
                "Vijapur(Kukarvada)",
                "Vijapur",
                "Unava"
            ],
            "Morbi": [
                "Halvad",
                "Vankaner"
            ],
            "Patan": [
                "Patan",
                "Radhanpur",
                "Sami",
                "Siddhpur",
                "Harij",
                "Chansama"
            ],
            "Rajkot": [
                "Gondal",
                "Jasdan",
                "Rajkot",
                "Jetpur(Dist.Rajkot)"
            ],
            "Sabarkantha": [
                "Himatnagar",
                "Khedbrahma",
                "Modasa",
                "Bhiloda",
                "Talod",
                "Dhansura",
                "Modasa(Tintoi)",
                "Vadali"
            ],
            "Surat": [
                "Songadh"
            ],
            "Surendranagar": [
                "Dasada Patadi",
                "Dhragradhra"
            ]
        },
        "Maharashtra": {
            "Ahmednagar": [
                "Ahmednagar"
            ],
            "Akola": [
                "Akola",
                "Balapur"
            ],
            "Beed": [
                "Kille Dharur",
                "Beed"
            ],
            "Bhandara": [
                "Bhandara",
                "Lakhandur"
            ],
            "Buldhana": [
                "Chikali",
                "Khamgaon",
                "Deoulgaon Raja",
                "Shegaon",
                "Lonar"
            ],
            "Dhule": [
                "Shirpur"
            ],
            "Latur": [
                "Ahmedpur"
            ],
            "Nagpur": [
                "Umared",
                "Ramtek"
            ],
            "Nashik": [
                "Lasalgaon(Niphad)"
            ],
            "Yavatmal": [
                "Jagdamba Agrocare"
            ]
        },
        "Rajasthan": {
            "Ajmer": [
                "Madanganj Kishangarh"
            ],
            "Alwar": [
                "Alwar",
                "Bahror",
                "Barodamev",
                "Kherli",
                "Laxmangarh (Barodamev)"
            ],
            "Baran": [
                "Anta",
                "Atru",
                "Baran",
                "Chhabra",
                "Kawai Salpura (Atru)",
                "Nahargarh",
                "Samraniyan",
                "Chhipabarod (Chhabra)"
            ],
            "Barmer": [
                "Barmer"
            ],
            "Bharatpur": [
                "Bayana",
                "Bharatpur",
                "Nadwai",
                "Bhusawar Bair"
            ],
            "Bhilwara": [
                "Bhilwara",
                "Bijolia",
                "Gulabpura"
            ],
            "Bikaner": [
                "Bikaner (Grain)",
                "Khajuwala",
                "Lunkaransar",
                "Nokha",
                "Pugal Road (Grain)",
                "Sridungargarh"
            ],
            "Bundi": [
                "Bundi",
                "Dei",
                "Keshoraipatan",
                "Sumerganj"
            ],
            "Chittorgarh": [
                "Chittorgarh",
                "Nimbahera",
                "Barisadri",
                "Begu"
            ],
            "Churu": [
                "Sardar Shahar",
                "Sujangarh"
            ],
            "Dausa": [
                "Bandikui",
                "Bandikui(Geejgarh)",
                "Dausa",
                "Lalsot",
                "Madanganj Mahuwa",
                "Madanganj Mandawar",
                "Mandawari"
            ],
            "Dholpur": [
                "Dholpur"
            ],
            "Hanumangarh": [
                "Bhadara",
                "Goluwala",
                "Hanumangarh",
                "Hanumangarh Town",
                "Hanumangarh(Urlivas)",
                "Nohar",
                "Pilibanga",
                "Rawatsar",
                "Sangriya",
                "Tibbi"
            ],
            "Jaipur": [
                "Kishan Renwal(Fulera)"
            ],
            "Jalore": [
                "Bhinmal"
            ],
            "Jhalawar": [
                "Bhawani Mandi",
                "Choumahla",
                "Dag",
                "Iklera",
                "Jhalarapatan",
                "Khanpur",
                "Manohar Thana"
            ],
            "Jhunjhunu": [
                "Chirawa",
                "Gudhagorji",
                "Jhunjhunu",
                "Nawalgarh",
                "Surajgarh"
            ],
            "Jodhpur": [
                "Bhagat Ki Kothi",
                "Jodhpur (Grain)"
            ],
            "Karauli": [
                "Hindoun"
            ],
            "Kota": [
                "Itawa",
                "Kota",
                "Ramganjmandi"
            ],
            "Nagaur": [
                "Degana",
                "Merta City",
                "Nagaur",
                "Nagaur(Jayal)"
            ],
            "Pali": [
                "Rani",
                "Sumerpur",
                "Sojat Road",
                "Pali"
            ],
            "Pratapgarh": [
                "Chhotisadri",
                "Pratapgarh"
            ],
            "Sikar": [
                "Palsana",
                "Sikar",
                "Fatehpur"
            ],
            "Tonk": [
                "Deoli",
                "Dooni",
                "Malpura",
                "Niwai",
                "Tonk",
                "Uniyara",
                "Malpura(Todaraisingh)"
            ],
            "Udaipur": [
                "Fatehnagar",
                "Udaipur (Grain)"
            ]
        },
        "Haryana": {
            "Ambala": [
                "Barara",
                "Mullana",
                "Mullana(saha)",
                "Naraingarh",
                "Ambala City",
                "Shahzadpur",
                "Ambala City(Subji Mandi)"
            ],
            "Bhiwani": [
                "Siwani",
                "Tosham",
                "Ch. Dadri",
                "Behal",
                "Loharu",
                "Jui"
            ],
            "Faridabad": [
                "Ballabhgarh"
            ],
            "Fatehabad": [
                "Bhattu Kalan",
                "Tohana",
                "Fatehabad"
            ],
            "Jind": [
                "Jullana",
                "New Grain Market , Jind",
                "Pillukhera",
                "Safidon",
                "Uchana",
                "Narwana"
            ],
            "Kurukshetra": [
                "Babain",
                "Ladwa",
                "Shahabad"
            ],
            "Palwal": [
                "Palwal",
                "Hodal"
            ],
            "Panchkula": [
                "Raipur Rai"
            ],
            "Rewari": [
                "Rewari"
            ],
            "Rohtak": [
                "Rohtak",
                "Meham"
            ],
            "Sirsa": [
                "Dabwali",
                "Ding",
                "Ellanabad",
                "New Grain Market , Sirsa",
                "kalanwali",
                "Sirsa"
            ],
            "Sonipat": [
                "New Grain Market , Sonipat"
            ]
        },
        "Madhya Pradesh": {
            "Ashoknagar": [
                "Ashoknagar",
                "Chanderi",
                "Isagarh",
                "Mungawali",
                "Shadora",
                "Piprai"
            ],
            "Balaghat": [
                "Varaseoni",
                "Katangi"
            ],
            "Betul": [
                "Betul",
                "Multai"
            ],
            "Bhind": [
                "Alampur",
                "Bhind",
                "Gohad",
                "Lahar",
                "Mehgaon",
                "Mow",
                "Gohad(F&V)"
            ],
            "Bhopal": [
                "Berasia",
                "Bhopal"
            ],
            "Chhatarpur": [
                "Badamalhera",
                "Bijawar",
                "Chhatarpur",
                "Harpalpur",
                "LavKush Nagar(Laundi)",
                "Rajnagar",
                "Naugaon"
            ],
            "Chhindwara": [
                "Chhindwara",
                "Chaurai",
                "Pandhurna",
                "Saunsar"
            ],
            "Damoh": [
                "Damoh",
                "Patharia",
                "Javera",
                "Hata"
            ],
            "Datia": [
                "Bhander",
                "Datia",
                "Sevda"
            ],
            "Dewas": [
                "Dewas",
                "Haatpipliya",
                "Khategaon",
                "Sonkatch",
                "Kannod",
                "Loharda"
            ],
            "Dhar": [
                "Manawar",
                "Kukshi",
                "Dhar"
            ],
            "Dindori": [
                "Dindori",
                "Gorakhpur",
                "Shahpura"
            ],
            "Guna": [
                "Aron",
                "Binaganj",
                "Kumbhraj",
                "Maksudangarh",
                "Guna",
                "Raghogarh"
            ],
            "Gwalior": [
                "Bhitarwar",
                "Dabra",
                "Lashkar"
            ],
            "Hoshangabad": [
                "Banapura",
                "Itarsi",
                "Pipariya",
                "Semriharchand",
                "Bankhedi",
                "Hoshangabad"
            ],
            "Indore": [
                "Indore",
                "Gautampura",
                "Sanwer"
            ],
            "Jabalpur": [
                "Jabalpur",
                "Paatan",
                "Sehora",
                "Shahpura(Jabalpur)",
                "Sihora"
            ],
            "Jhabua": [
                "Thandla"
            ],
            "Katni": [
                "Katni"
            ],
            "Khandwa": [
                "Harsood",
                "Khandwa",
                "Mundi"
            ],
            "Khargone": [
                "Bhikangaon",
                "Khargone",
                "Karhi",
                "Sanawad",
                "Badwaha",
                "Segaon"
            ],
            "Mandla": [
                "Bichhiya",
                "Mandla",
                "Nainpur"
            ],
            "Mandsaur": [
                "Daloda",
                "Garoth",
                "Mandsaur",
                "Bhanpura",
                "Piplya",
                "Shamgarh",
                "Sitmau",
                "Suvasra"
            ],
            "Morena": [
                "Ambaha",
                "Banmorkalan",
                "Jora",
                "Kailaras",
                "Morena",
                "Porsa",
                "Sabalgarh"
            ],
            "Narsinghpur": [
                "Narsinghpur",
                "Gadarwada",
                "Gotegaon",
                "Kareli"
            ],
            "Neemuch": [
                "Manasa",
                "Neemuch",
                "Javad"
            ],
            "Panna": [
                "Ajaygarh",
                "Devandranagar",
                "Panna",
                "Simariya"
            ],
            "Raisen": [
                "Begamganj",
                "Bareli",
                "Gairatganj",
                "Obedullaganj",
                "Raisen",
                "Udaipura",
                "Silvani"
            ],
            "Rajgarh": [
                "Biaora",
                "Chhapiheda",
                "Jeerapur",
                "Khujner",
                "Kurawar",
                "Machalpur",
                "Narsinghgarh",
                "Pachaur",
                "Sarangpur",
                "Suthalia",
                "Khilchipur"
            ],
            "Ratlam": [
                "A lot",
                "Jaora",
                "Taal",
                "Sailana",
                "Ratlam",
                "Sailana(F&V)"
            ],
            "Rewa": [
                "Baikunthpur",
                "Chaakghat",
                "Rewa",
                "Hanumana"
            ],
            "Sagar": [
                "Bamora",
                "Banda",
                "Bina",
                "Deori",
                "Garhakota",
                "Khurai",
                "Rahatgarh",
                "Sagar",
                "Rehli",
                "Shahagarh",
                "Kesli"
            ],
            "Satna": [
                "Nagod",
                "Satna",
                "Mehar",
                "Ramnagar"
            ],
            "Sehore": [
                "Ashta",
                "Ichhawar",
                "Jawar",
                "Nasrullaganj",
                "Sehore",
                "Rehati",
                "Ichhawar(F&V)",
                "Shyampur"
            ],
            "Seoni": [
                "Barghat",
                "Keolari",
                "Seoni",
                "Ghansour",
                "Chhpara"
            ],
            "Shajapur": [
                "Agar",
                "Akodiya",
                "Badod",
                "Kalapipal",
                "Nalkehda",
                "Shujalpur",
                "Soyatkalan",
                "Susner",
                "Momanbadodiya",
                "Shajapur"
            ],
            "Sheopur": [
                "Sheopurbadod",
                "Sheopurkalan",
                "Vijaypur"
            ],
            "Shivpuri": [
                "Badarwas",
                "Barad",
                "Karera",
                "Khaniadhana",
                "Khatora",
                "Kolaras",
                "Magroni",
                "Pichhour",
                "Pohari",
                "Shivpuri",
                "Rannod",
                "Khanyadhana"
            ],
            "Sidhi": [
                "Sidhi"
            ],
            "Tikamgarh": [
                "Jatara",
                "Khargapur",
                "Prithvipur",
                "Tikamgarh",
                "Palera",
                "Niwadi",
                "Tikamgarh(F&V)"
            ],
            "Ujjain": [
                "Mahidpur",
                "Badnagar",
                "Ujjain",
                "Tarana",
                "Nagda"
            ],
            "Vidisha": [
                "Ganjbasoda",
                "Kurwai",
                "Lateri",
                "Shamshabad",
                "Sironj",
                "Vidisha",
                "Gulabganj"
            ]
        },
        "Bihar": {
            "Aurangabad": [
                "Aurangabad"
            ],
            "Samastipur": [
                "Saidpurhat"
            ]
        },
        "Karnataka": {
            "Bangalore": [
                "Bangalore"
            ],
            "Dharwad": [
                "Dharwar"
            ],
            "Gadag": [
                "Laxmeshwar"
            ],
            "Haveri": [
                "Haveri"
            ],
            "Mysore": [
                "Mysore (Bandipalya)"
            ],
            "Raichur": [
                "Sindhanur"
            ],
            "Shimoga": [
                "Shimoga"
            ]
        },
        "West Bengal": {
            "Bankura": [
                "Bankura Sadar",
                "Bishnupur(Bankura)",
                "Indus(Bankura Sadar)",
                "Khatra"
            ],
            "Birbhum": [
                "Rampurhat"
            ],
            "Malda": [
                "Gajol"
            ],
            "Murshidabad": [
                "Beldanga",
                "Jiaganj",
                "Kandi"
            ],
            "Nadia": [
                "Karimpur",
                "Nadia"
            ],
            "Paschim Bardhaman": [
                "Asansol",
                "Durgapur"
            ],
            "Purba Bardhaman": [
                "Guskara",
                "Katwa",
                "Burdwan"
            ]
        },
        "Himachal Pradesh": {
            "Bilaspur": [
                "Pendraroad",
                "Takhatpur"
            ],
            "Hamirpur": [
                "Bharuasumerpur",
                "Kurara",
                "Maudaha",
                "Muskara",
                "Raath"
            ]
        },
        "Punjab": {
            "Fazilka": [
                "Abohar"
            ],
            "Ludhiana": [
                "Khanna"
            ],
            "Sangrur": [
                "Ahmedgarh"
            ]
        },
        "Uttarakhand": {
            "Haridwar": [
                "Lakshar"
            ]
        },
        "Assam": {
            "Lakhimpur": [
                "Golagokarnath",
                "Lakhimpur",
                "Paliakala"
            ]
        },
        "Manipur": {
            "Thoubal": [
                "Thoubal"
            ]
        }
    },
    "Niger Seed (Ramtil)": {
        "Uttar Pradesh": {
            "Balrampur": [
                "Kusmee",
                "Ramanujganj"
            ]
        },
        "Himachal Pradesh": {
            "Bilaspur": [
                "Pendraroad"
            ]
        },
        "Madhya Pradesh": {
            "Chhindwara": [
                "Chhindwara"
            ],
            "Dindori": [
                "Dindori",
                "Gorakhpur",
                "Shahpura"
            ],
            "Jabalpur": [
                "Jabalpur",
                "Shahpura(Jabalpur)"
            ],
            "Mandla": [
                "Bichhiya",
                "Mandla"
            ],
            "Sidhi": [
                "Sidhi"
            ]
        },
        "Karnataka": {
            "Hassan": [
                "Arasikere"
            ],
            "Mysore": [
                "Mysore (Bandipalya)"
            ]
        },
        "Rajasthan": {
            "Kota": [
                "Kota"
            ]
        },
        "Maharashtra": {
            "Latur": [
                "Ahmedpur"
            ]
        }
    },
    "Onion": {
        "Telangana": {
            "Adilabad": [
                "Jainath",
                "Adilabad(Rythu Bazar)",
                "Asifabad",
                "Laxettipet"
            ],
            "Hyderabad": [
                "Bowenpally",
                "Erragadda(Rythu Bazar)",
                "Gudimalkapur",
                "Mahboob Manison",
                "L B Nagar"
            ],
            "Medak": [
                "Sadasivpet",
                "Siddipet(Rythu Bazar)"
            ],
            "Nalgonda": [
                "Miryalguda(Rythu Bazar)"
            ],
            "Nizamabad": [
                "Nizamabad"
            ],
            "Warangal": [
                "Hanmarkonda(Rythu Bazar)"
            ]
        },
        "Uttar Pradesh": {
            "Agra": [
                "Achnera",
                "Agra",
                "Fatehabad",
                "Fatehpur Sikri",
                "Jagnair",
                "Samsabad",
                "Khairagarh"
            ],
            "Aligarh": [
                "Aligarh",
                "Charra",
                "Khair"
            ],
            "Amethi": [
                "Jafarganj",
                "Sultanpur"
            ],
            "Amroha": [
                "Amroha",
                "Dhanaura",
                "Hasanpur"
            ],
            "Auraiya": [
                "Achalda",
                "Auraiya",
                "Dibiapur"
            ],
            "Ayodhya": [
                "Faizabad",
                "Rudauli"
            ],
            "Azamgarh": [
                "Azamgarh"
            ],
            "Badaun": [
                "Badayoun",
                "Bilsi",
                "Ujhani",
                "Shahaswan",
                "Wazirganj"
            ],
            "Baghpat": [
                "Bagpat",
                "Baraut",
                "Khekda"
            ],
            "Bahraich": [
                "Bahraich",
                "Naanpara"
            ],
            "Ballia": [
                "Ballia",
                "Chitwadagaon",
                "Rasda",
                "Vilthararoad"
            ],
            "Balrampur": [
                "Balrampur",
                "Panchpedwa",
                "Tulsipur"
            ],
            "Banda": [
                "Atarra",
                "Banda",
                "Baberu"
            ],
            "Barabanki": [
                "Barabanki",
                "Safdarganj"
            ],
            "Bareilly": [
                "Anwala",
                "Bahedi",
                "Bareilly"
            ],
            "Basti": [
                "Basti"
            ],
            "Bijnor": [
                "Bijnaur",
                "Chaandpur",
                "Nagina",
                "Najibabad",
                "Kiratpur"
            ],
            "Chandauli": [
                "Chandoli"
            ],
            "Deoria": [
                "Devariya",
                "Barhaj"
            ],
            "Etah": [
                "Awagarh",
                "Etah"
            ],
            "Etawah": [
                "Bharthna",
                "Etawah",
                "Jasvantnagar"
            ],
            "Fatehpur": [
                "Bindki",
                "Fatehpur",
                "Khaga"
            ],
            "Firozabad": [
                "Firozabad",
                "Sirsaganj",
                "Tundla",
                "Shikohabad"
            ],
            "Ghaziabad": [
                "Ghaziabad",
                "Hapur",
                "Noida",
                "Muradnagar"
            ],
            "Ghazipur": [
                "Gazipur",
                "Jangipura",
                "Jamanian",
                "Yusufpur"
            ],
            "Gonda": [
                "Gonda",
                "Nawabganj",
                "Karnailganj"
            ],
            "Gorakhpur": [
                "Chorichora",
                "Gorakhpur",
                "Sehjanwa"
            ],
            "Hardoi": [
                "Hardoi",
                "Madhoganj",
                "Sandi",
                "Sandila",
                "Shahabad(New Mandi)"
            ],
            "Hathras": [
                "Haathras",
                "Shadabad"
            ],
            "Jaunpur": [
                "Jaunpur",
                "Mugrabaadshahpur",
                "Shahganj"
            ],
            "Jhansi": [
                "Chirgaon",
                "Gurusarai",
                "Jhansi",
                "Mauranipur",
                "Moth"
            ],
            "Kanpur Dehat": [
                "Pukharayan",
                "Jhijhank",
                "Rura"
            ],
            "Kasganj": [
                "Kasganj"
            ],
            "Kaushambi": [
                "Bharwari",
                "Manjhanpur"
            ],
            "Kushinagar": [
                "Tamkuhi road"
            ],
            "Lalitpur": [
                "Lalitpur"
            ],
            "Lucknow": [
                "Lucknow",
                "Banthara"
            ],
            "Maharajganj": [
                "Anandnagar",
                "Gadaura",
                "Nautnava",
                "Partaval"
            ],
            "Mahoba": [
                "Mahoba"
            ],
            "Mainpuri": [
                "Bewar",
                "Ghiraur",
                "Mainpuri"
            ],
            "Mathura": [
                "Kosikalan",
                "Mathura"
            ],
            "Meerut": [
                "Meerut",
                "Sardhana",
                "Mawana"
            ],
            "Mirzapur": [
                "Ahirora",
                "Mirzapur"
            ],
            "Muzaffarnagar": [
                "Khatauli",
                "Muzzafarnagar",
                "Shahpur"
            ],
            "Prayagraj": [
                "Ajuha",
                "Allahabad",
                "Jasra",
                "Sirsa"
            ],
            "Rampur": [
                "Milak",
                "Rampur",
                "Tanda(Rampur)"
            ],
            "Saharanpur": [
                "Chutmalpur",
                "Gangoh",
                "Deoband",
                "Rampurmaniharan",
                "Saharanpur"
            ],
            "Sambhal": [
                "Chandausi",
                "Muradabad",
                "Sambhal"
            ],
            "Sant Kabir Nagar": [
                "Khalilabad"
            ],
            "Shahjahanpur": [
                "Jalalabad",
                "Puwaha",
                "Shahjahanpur",
                "Tilhar"
            ],
            "Shamli": [
                "Kairana",
                "Khandhla",
                "Shamli",
                "Thanabhavan"
            ],
            "Shravasti": [
                "Bhinga",
                "Payagpur"
            ],
            "Sitapur": [
                "Hargaon (Laharpur)",
                "Mehmoodabad",
                "Sitapur",
                "Viswan"
            ],
            "Sonbhadra": [
                "Dudhi",
                "Robertsganj"
            ],
            "Unnao": [
                "Bangarmau",
                "Purwa",
                "Unnao"
            ],
            "Varanasi": [
                "Varanasi",
                "Varanasi(F&V)"
            ]
        },
        "Gujarat": {
            "Ahmedabad": [
                "Ahmedabad(Chimanbhai Patal Market Vasana)"
            ],
            "Anand": [
                "Anand(Veg,Yard,Anand)",
                "Khambhat(Veg Yard Khambhat)"
            ],
            "Bharuch": [
                "Bharuch",
                "Ankleshwar"
            ],
            "Bhavnagar": [
                "Bhavnagar",
                "Mahuva(Station Road)",
                "Taleja",
                "Palitana"
            ],
            "Dahod": [
                "Dahod(Veg. Market)"
            ],
            "Jamnagar": [
                "Jamnagar"
            ],
            "Kheda": [
                "Kapadvanj",
                "Nadiyad(Piplag)",
                "Nadiad"
            ],
            "Mehsana": [
                "Mehsana(Mehsana Veg)",
                "Vijapur(veg)",
                "Visnagar"
            ],
            "Morbi": [
                "Morbi"
            ],
            "Navsari": [
                "Bilimora",
                "Navsari"
            ],
            "Porbandar": [
                "Porbandar"
            ],
            "Rajkot": [
                "Dhoraji",
                "Gondal",
                "Jetpur(Dist.Rajkot)",
                "Rajkot(Veg.Sub Yard)"
            ],
            "Surat": [
                "Surat"
            ],
            "Surendranagar": [
                "Vadhvan"
            ]
        },
        "Maharashtra": {
            "Ahmednagar": [
                "Ahmednagar",
                "Akole",
                "Jamkhed",
                "Karjat",
                "Kopargaon",
                "Newasa(Ghodegaon)",
                "Om Chaitanya Multistate Agro Purpose CoOp Society ",
                "Parner",
                "Pathardi",
                "Rahuri",
                "Rahuri(Vambori)",
                "Sangamner",
                "Shevgaon",
                "Shree Sairaj Krushi Market",
                "Shrigonda",
                "Rahata",
                "Shrirampur"
            ],
            "Akola": [
                "Akola"
            ],
            "Beed": [
                "Kada"
            ],
            "Buldhana": [
                "Malkapur",
                "Nandura"
            ],
            "Chandrapur": [
                "Chandrapur(Ganjwad)",
                "Varora",
                "Chandrapur"
            ],
            "Dhule": [
                "Dhule",
                "Sakri",
                "Shirpur",
                "Pratap Nana Mahale Khajgi Bajar Samiti ",
                "Janata Agri Market (DLS Agro Infrastructure Pvt Lt"
            ],
            "Kolhapur": [
                "Kolhapur",
                "Vadgaonpeth"
            ],
            "Latur": [
                "Ausa"
            ],
            "Nagpur": [
                "Hingna",
                "Kamthi",
                "Nagpur",
                "Ramtek"
            ],
            "Nandurbar": [
                "Navapur"
            ],
            "Nashik": [
                "Chandvad",
                "Devala",
                "Dindori(Vani)",
                "Kalvan",
                "Lasalgaon",
                "Lasalgaon(Niphad)",
                "Lasalgaon(Vinchur)",
                "Malharshree Farmers Producer Co Ltd",
                "Manmad",
                "Nampur",
                "Nandgaon",
                "Nasik",
                "Pimpalgaon",
                "Pimpalgaon Baswant(Saykheda)",
                "Satana",
                "Shivsiddha Govind Producer Company Limited Sanchal",
                "Sinner",
                "Umrane",
                "Shree Rameshwar Krushi Market ",
                "Yeola",
                "Mankamneshwar Farmar Producer CoLtd Sanchalit Mank",
                "Dindori",
                "Premium Krushi Utpanna Bazar ",
                "Suragana"
            ],
            "Pune": [
                "Baramati",
                "Indapur",
                "Junnar",
                "Junnar(Alephata)",
                "Junnar(Narayangaon)",
                "Junnar(Otur)",
                "Khed(Chakan)",
                "Manchar",
                "Pune",
                "Pune(Khadiki)",
                "Pune(Manjri)",
                "Pune(Moshi)",
                "Pune(Pimpri)",
                "Shirur"
            ],
            "Raigad": [
                "Karjat(Raigad)",
                "Pen"
            ],
            "Ratnagiri": [
                "Ratnagiri (Nachane)"
            ],
            "Sangli": [
                "Islampur",
                "Sangli(Phale, Bhajipura Market)",
                "Vita"
            ],
            "Satara": [
                "Karad",
                "Lonand",
                "Satara",
                "Vai",
                "Phaltan"
            ],
            "Thane": [
                "Kalyan",
                "Murbad"
            ],
            "Wardha": [
                "Wardha"
            ]
        },
        "Rajasthan": {
            "Ajmer": [
                "Ajmer(F&V)",
                "Madanganj Kishangarh"
            ],
            "Alwar": [
                "Alwar (F&V)"
            ],
            "Baran": [
                "Baran"
            ],
            "Bharatpur": [
                "Bayana",
                "Nadwai"
            ],
            "Bhilwara": [
                "Bhilwara"
            ],
            "Bikaner": [
                "Bikaner (F&V)"
            ],
            "Chittorgarh": [
                "Chittorgarh",
                "Nimbahera"
            ],
            "Churu": [
                "Churu",
                "Sujangarh"
            ],
            "Dungarpur": [
                "Dungarpur"
            ],
            "Hanumangarh": [
                "Bhadara",
                "Goluwala",
                "Hanumangarh Town",
                "Hanumangarh(Urlivas)",
                "Hanumangarh",
                "Rawatsar",
                "Sangriya",
                "Nohar"
            ],
            "Jaipur": [
                "Jaipur (F&V)"
            ],
            "Jaisalmer": [
                "Jaisalmer"
            ],
            "Jalore": [
                "Jalore",
                "Bhinmal"
            ],
            "Jhunjhunu": [
                "Jhunjhunu",
                "Nawalgarh",
                "Surajgarh"
            ],
            "Jodhpur": [
                "Jodhpur (F&V)"
            ],
            "Kota": [
                "Kota (F&V)"
            ],
            "Nagaur": [
                "Nagour(FV)"
            ],
            "Pali": [
                "Pali",
                "Sojat City",
                "Sojat Road"
            ],
            "Pratapgarh": [
                "Pratapgarh"
            ],
            "Rajsamand": [
                "Rajsamand"
            ],
            "Sikar": [
                "Sikar"
            ],
            "Sirohi": [
                "Abu Road"
            ],
            "Tonk": [
                "Tonk"
            ],
            "Udaipur": [
                "Udaipur (F&V)"
            ]
        },
        "Kerala": {
            "Alappuzha": [
                "Aroor",
                "Chengannur",
                "Cherthala",
                "Kayamkulam",
                "Madhavapuram",
                "Mannar",
                "Alappuzha",
                "Harippad"
            ],
            "Ernakulam": [
                "Aluva",
                "Angamaly",
                "Broadway market",
                "Kothamangalam",
                "Ernakulam",
                "North Paravur",
                "Perumbavoor",
                "Piravam",
                "Thrippunithura",
                "Moovattupuzha"
            ],
            "Idukki": [
                "Kattappana",
                "Munnar",
                "Thodupuzha",
                "Vandiperiyar",
                "Nedumkandam"
            ],
            "Kottayam": [
                "Athirampuzha",
                "Ettumanoor",
                "Kanjirappally",
                "Kottayam",
                "Kuruppanthura",
                "Pala",
                "Pampady",
                "Thalayolaparambu"
            ],
            "Malappuram": [
                "Kondotty",
                "Kottakkal",
                "Manjeri",
                "Parappanangadi",
                "Perinthalmanna",
                "Thirurrangadi"
            ],
            "Thiruvananthapuram": [
                "Aralamoodu",
                "Balarampuram",
                "Chala",
                "Pothencode",
                "Vamanapuram",
                "Anyara(EEC)"
            ]
        },
        "West Bengal": {
            "Alipurduar": [
                "Alipurduar",
                "Falakata"
            ],
            "Bankura": [
                "Bankura Sadar",
                "Bishnupur(Bankura)"
            ],
            "Birbhum": [
                "Birbhum",
                "Bolpur",
                "Rampurhat",
                "Sainthia"
            ],
            "Dakshin Dinajpur": [
                "Balurghat",
                "Gangarampur(Dakshin Dinajpur)"
            ],
            "Darjeeling": [
                "Darjeeling",
                "Karsiyang(Matigara)",
                "Siliguri"
            ],
            "Hooghly": [
                "Champadanga",
                "Kalipur",
                "Pandua",
                "Sheoraphuly"
            ],
            "Howrah": [
                "Ramkrishanpur(Howrah)",
                "Uluberia"
            ],
            "Jalpaiguri": [
                "Belacoba",
                "Dhupguri",
                "Jalpaiguri Sadar",
                "Moynaguri"
            ],
            "Kolkata": [
                "Bara Bazar (Posta Bazar)"
            ],
            "Malda": [
                "English Bazar",
                "Gajol",
                "Samsi"
            ],
            "Murshidabad": [
                "Jangipur"
            ],
            "Nadia": [
                "Bethuadahari",
                "Chakdah",
                "Kalyani",
                "Karimpur",
                "Nadia",
                "Ranaghat"
            ],
            "North 24 Parganas": [
                "Barasat",
                "Habra"
            ],
            "Paschim Bardhaman": [
                "Asansol",
                "Durgapur"
            ],
            "Purba Bardhaman": [
                "Burdwan",
                "Kalna",
                "Katwa"
            ]
        },
        "Madhya Pradesh": {
            "Alirajpur": [
                "Alirajpur(F&V)"
            ],
            "Betul": [
                "Multai"
            ],
            "Bhopal": [
                "Bhopal",
                "Bhopal(F&V)"
            ],
            "Chhindwara": [
                "Chindwara(F&V)",
                "Chhindwara(F&V)"
            ],
            "Damoh": [
                "Damoh(F&V)"
            ],
            "Dewas": [
                "Sonkatch",
                "Sonkachh(F&V)",
                "Dewas(F&V)",
                "Haatpipliya"
            ],
            "Dhar": [
                "Badnawar",
                "Dhamnod(F&V)",
                "Manawar(F&V)",
                "Rajgarh",
                "Rajgarh(F&V)",
                "Badnawar(F&V)",
                "Dhamnod",
                "Dhar(F&V)",
                "Kukshi",
                "Manawar"
            ],
            "Guna": [
                "Guna(F&V)"
            ],
            "Gwalior": [
                "Lashkar",
                "Lashkar(F&V)"
            ],
            "Hoshangabad": [
                "Hoshangabad(F&V)",
                "Itarsi(F&V)",
                "Pipariya(F&V)",
                "Hoshangabad",
                "Pipariya",
                "Itarsi"
            ],
            "Indore": [
                "Gautampura",
                "Indore",
                "Mhow(F&V)",
                "Indore(F&V)",
                "Mhow",
                "Sanwer"
            ],
            "Jabalpur": [
                "Jabalpur(F&V)"
            ],
            "Jhabua": [
                "Petlawad(F&V)",
                "Petlawad",
                "Thandla"
            ],
            "Katni": [
                "Katni",
                "Katni(F&V)"
            ],
            "Khandwa": [
                "Badwah(F&V)",
                "Khandwa",
                "Sanawad(F&V)",
                "Khandwa(F&V)"
            ],
            "Khargone": [
                "Badwaha",
                "Khargone",
                "Sanawad"
            ],
            "Mandsaur": [
                "Garoth",
                "Mandsaur",
                "Shamgarh",
                "Sitamau(F&V)",
                "Sitmau",
                "Piplya",
                "Shamgarh(F&V)"
            ],
            "Morena": [
                "Morena",
                "Porsa",
                "Sabalgarh(F&V)",
                "Porsa(F&V)",
                "Morena(F&V)",
                "Sabalgarh"
            ],
            "Neemuch": [
                "Manasa",
                "Neemuch",
                "Javad"
            ],
            "Raisen": [
                "Raisen"
            ],
            "Rajgarh": [
                "Narsinghgarh",
                "Sarangpur",
                "Biaora"
            ],
            "Ratlam": [
                "Alot(F&V)",
                "Jaora",
                "Ratlam",
                "Sailana",
                "Sailana(F&V)",
                "A lot",
                "Ratlam(F&V)"
            ],
            "Rewa": [
                "Rewa(F&V)"
            ],
            "Sagar": [
                "Deori",
                "Garhakota",
                "Khurai(F&V)",
                "Sagar(F&V)"
            ],
            "Satna": [
                "Mehar"
            ],
            "Sehore": [
                "Aashta(F&V)",
                "Ashta",
                "Ichhawar(F&V)",
                "Sehore",
                "Ichhawar"
            ],
            "Seoni": [
                "Seoni"
            ],
            "Shajapur": [
                "Agar",
                "Akodiya(F&V)",
                "Berachha",
                "Kalapipal",
                "Kalapipal(F&V)",
                "Shajapur",
                "Shujalpur",
                "Shujalpur(F&V)",
                "Soyatkalan",
                "Akodiya",
                "Shajapur(F&V)"
            ],
            "Shivpuri": [
                "Kolaras(F&V)",
                "Shivpuri"
            ],
            "Ujjain": [
                "Badnagar",
                "Mahidpur(F&V)",
                "Ujjain",
                "Ujjain(F&V)",
                "Mahidpur"
            ]
        },
        "Haryana": {
            "Ambala": [
                "Ambala Cantt.",
                "Ambala City(Subji Mandi)",
                "Barara",
                "Naraingarh",
                "Shahzadpur"
            ],
            "Bhiwani": [
                "Ch. Dadri",
                "Loharu",
                "Bhiwani"
            ],
            "Faridabad": [
                "Ballabhgarh",
                "Faridabad",
                "New Grain Market , Faridabad"
            ],
            "Fatehabad": [
                "Jakhal",
                "Fatehabad",
                "Ratia",
                "Tohana(New Veg Market)",
                "Dharsul",
                "Tohana",
                "Bhuna"
            ],
            "Jind": [
                "Jind",
                "Narwana",
                "Safidon"
            ],
            "Kaithal": [
                "Dhand",
                "Pundri",
                "Siwan",
                "Cheeka",
                "Kaithal"
            ],
            "Karnal": [
                "Gharaunda",
                "New Grain Market(main), Karnal",
                "Tarori",
                "Indri"
            ],
            "Kurukshetra": [
                "Ladwa",
                "Shahabad",
                "Pehowa",
                "Thanesar",
                "Iamailabad",
                "Babain",
                "Pipli"
            ],
            "Palwal": [
                "Hodal",
                "Palwal",
                "Hassanpur"
            ],
            "Panchkula": [
                "Barwala",
                "Raipur Rai",
                "New Grain Market , Panchkula",
                "Panchkul(Kalka)"
            ],
            "Panipat": [
                "Madlauda",
                "Panipat",
                "Samalkha"
            ],
            "Rewari": [
                "Rewari",
                "Kosli"
            ],
            "Rohtak": [
                "Meham",
                "Rohtak",
                "Sampla"
            ],
            "Sirsa": [
                "kalanwali",
                "Dabwali",
                "Rania",
                "Sirsa",
                "Rania(Jiwan nagar)",
                "Ellanabad"
            ],
            "Sonipat": [
                "Ganaur",
                "Gohana",
                "Sonepat",
                "Sonepat(Kharkhoda)"
            ]
        },
        "Punjab": {
            "Amritsar": [
                "Ajnala",
                "Amritsar(Amritsar Mewa Mandi)",
                "Rayya",
                "Gehri",
                "Gehri(Jandiala mandi)"
            ],
            "Barnala": [
                "Barnala"
            ],
            "Faridkot": [
                "Faridkot",
                "Kotkapura",
                "Jaitu"
            ],
            "Fazilka": [
                "Abohar",
                "Fazilka",
                "Jalalabad"
            ],
            "Gurdaspur": [
                "Batala",
                "Dhariwal",
                "Dinanagar",
                "F.G.Churian",
                "Gurdaspur",
                "Sri Har Gobindpur(Harechowal)",
                "Quadian",
                "Kalanaur",
                "Sri Har Gobindpur"
            ],
            "Hoshiarpur": [
                "Dasuya",
                "Garh Shankar",
                "Garh Shankar(Mahalpur)",
                "Hoshiarpur",
                "GarhShankar (Kotfatuhi)",
                "Mukerian",
                "Mukerian(Talwara)",
                "Tanda Urmur"
            ],
            "Jalandhar": [
                "Bilga",
                "Jalandhar City(Jalandhar)",
                "Bilga (Talwan )",
                "Phillaur(Apra Mandi)",
                "Phillaur",
                "Noor Mehal",
                "Goraya",
                "Nakodar",
                "Shahkot"
            ],
            "Ludhiana": [
                "Doraha",
                "Jagraon",
                "Khanna",
                "Ludhiana",
                "Sahnewal",
                "Samrala",
                "Machhiwara"
            ],
            "Mansa": [
                "Budalada",
                "Mansa",
                "Sardulgarh"
            ],
            "Moga": [
                "Baghapurana",
                "Dharamkot",
                "Moga",
                "Nihal Singh Wala"
            ],
            "Pathankot": [
                "Pathankot"
            ],
            "Patiala": [
                "Dudhansadhan",
                "Ghanaur",
                "Nabha",
                "Patiala",
                "Patran",
                "Rajpura",
                "Samana"
            ],
            "Sangrur": [
                "Ahmedgarh",
                "Bhawanigarh",
                "Dhuri",
                "Lehra Gaga",
                "Malerkotla",
                "Sangrur",
                "Sunam",
                "Khanauri"
            ]
        },
        "Jammu and Kashmir": {
            "Anantnag": [
                "Ashahipora (Anantnagh)",
                "Kulgam"
            ],
            "Jammu": [
                "Akhnoor",
                "Batote",
                "Narwal Jammu (F&V)"
            ],
            "Kathua": [
                "Kathua"
            ],
            "Kupwara": [
                "Bumhama-Kupwara (F&V)"
            ],
            "Rajouri": [
                "Rajouri (F&V)"
            ],
            "Srinagar": [
                "Parimpore"
            ],
            "Udhampur": [
                "Udhampur",
                "Reasi"
            ]
        },
        "Odisha": {
            "Angul": [
                "Angul(Atthamallick)",
                "Angaura",
                "Talcher",
                "Angul",
                "Angul(Jarapada)"
            ],
            "Balasore": [
                "Jaleswar",
                "Nilagiri",
                "Barikpur"
            ],
            "Bargarh": [
                "Attabira",
                "Bargarh",
                "Bargarh(Barapalli)",
                "Godabhaga"
            ],
            "Bhadrak": [
                "Chandabali",
                "Bhadrak"
            ],
            "Boudh": [
                "Boudh",
                "Khunthabandha"
            ],
            "Dhenkanal": [
                "Hindol",
                "Kamakhyanagar"
            ],
            "Ganjam": [
                "Hinjilicut",
                "Bhanjanagar",
                "Digapahandi"
            ],
            "Jajpur": [
                "Jajpur"
            ],
            "Jharsuguda": [
                "Jharsuguda"
            ],
            "Kalahandi": [
                "Bhawanipatna",
                "Kesinga",
                "Kalahandi(Dharamagarh)",
                "Junagarh"
            ],
            "Kendrapara": [
                "Chatta Krushak Bazar",
                "Gopa",
                "Kendrapara(Marshaghai)",
                "Kendrapara",
                "Pattamundai"
            ],
            "Nuapada": [
                "Khariar",
                "Khariar Road"
            ],
            "Puri": [
                "Nimapara"
            ],
            "Rayagada": [
                "Rayagada"
            ],
            "Sambalpur": [
                "Kuchinda"
            ]
        },
        "Bihar": {
            "Araria": [
                "Arreria",
                "Forbesganj",
                "Raniganj"
            ],
            "Arwal": [
                "Arwal"
            ],
            "Aurangabad": [
                "Amba",
                "Aurangabad",
                "Daunagar"
            ],
            "Banka": [
                "Barahat",
                "Amarpur",
                "Rajaun"
            ],
            "Begusarai": [
                "Balliah",
                "Begusarai",
                "Teghra"
            ],
            "Bhagalpur": [
                "Bhagalpur",
                "Kahalgaon",
                "Naugachiya"
            ],
            "Bhojpur": [
                "Piro",
                "Aarah"
            ],
            "Buxar": [
                "Brahmpur",
                "Buxur"
            ],
            "Darbhanga": [
                "Bahadurpur (Ekmi Ghat)",
                "Darbhanga"
            ],
            "Jamui": [
                "Jamui",
                "Sikandara"
            ],
            "Jehanabad": [
                "Jehanabad"
            ],
            "Khagaria": [
                "Mansi Mandi"
            ],
            "Kishanganj": [
                "Bahadurganj",
                "Thakurganj",
                "Kishanganj"
            ],
            "Madhepura": [
                "Murliganj",
                "Bihariganj",
                "Singheswarsthan"
            ],
            "Madhubani": [
                "Jahajharpur",
                "Jainagar"
            ],
            "Muzaffarpur": [
                "Bhagwanpur Mandi",
                "Muzaffarpur"
            ],
            "Nalanda": [
                "Biharsharif",
                "Harnaut"
            ],
            "Nawada": [
                "Nawada",
                "Rajauli"
            ],
            "Rohtas": [
                "Kochas (Balthari)",
                "Sasaram",
                "Nokha",
                "Dehri",
                "Vikramganj"
            ],
            "Saharsa": [
                "Saharsa"
            ],
            "Samastipur": [
                "Tajpur",
                "Samastipur",
                "Saidpurhat"
            ],
            "Saran": [
                "Sonpur"
            ],
            "Sheikhpura": [
                "Barbigha",
                "Shekhpura"
            ],
            "Sheohar": [
                "Sheohar"
            ],
            "Sitamarhi": [
                "Sitamarhi"
            ],
            "Siwan": [
                "Siwan",
                "Maharjganj"
            ],
            "Supaul": [
                "Birpur",
                "Supaul",
                "Triveniganj"
            ],
            "Vaishali": [
                "Hajipur",
                "Jaitipir Mandi, Lalganj block",
                "Parsoniya Mandi, Mahua block"
            ]
        },
        "Tamil Nadu": {
            "Ariyalur": [
                "Ariyalur(Uzhavar Sandhai)",
                "Jeyankondam (Uzhavar Sandhai )",
                "Ariyalur Market",
                "Jayamkondam"
            ],
            "Chengalpattu": [
                "Chengalpet(Uzhavar Sandhai )",
                "Guduvancheri(Uzhavar Sandhai )",
                "Jameenrayapettai(Uzhavar Sandhai )",
                "Madhuranthagam(Uzhavar Sandhai )",
                "Medavakkam(Uzhavar Sandhai )",
                "Nanganallur(Uzhavar Sandhai )",
                "Pallavaram(Uzhavar Sandhai )",
                "Thirukalukundram(Uzhavar Sandhai )"
            ],
            "Coimbatore": [
                "Kurichi(Uzhavar Sandhai )",
                "Mettupalayam(Uzhavar Sandhai )",
                "Pollachi(Uzhavar Sandhai )",
                "RSPuram(Uzhavar Sandhai )",
                "Singanallur(Uzhavar Sandhai )",
                "Sulur(Uzhavar Sandhai )",
                "Sundarapuram(Uzhavar Sandhai )",
                "Udumalpet",
                "Vadavalli(Uzhavar Sandhai )",
                "Sulur",
                "Palladam",
                "Pollachi"
            ],
            "Cuddalore": [
                "Chidambaram(Uzhavar Sandhai )",
                "Cuddalore(Uzhavar Sandhai )",
                "Panruti(Uzhavar Sandhai )",
                "Viruthachalam(Uzhavar Sandhai )",
                "Chidambaram",
                "Cuddalore",
                "Panruti"
            ],
            "Dharmapuri": [
                "AJattihalli(Uzhavar Sandhai )",
                "Dharmapuri(Uzhavar Sandhai )",
                "Harur(Uzhavar Sandhai )",
                "Palacode(Uzhavar Sandhai )",
                "Pennagaram(Uzhavar Sandhai )",
                "Arur",
                "Dharampuri",
                "Pennagaram",
                "Palakode"
            ],
            "Dindigul": [
                "Chinnalapatti(Uzhavar Sandhai )",
                "Dindigul(Uzhavar Sandhai )",
                "Palani(Uzhavar Sandhai )",
                "Vedasanthur(Uzhavar Sandhai )",
                "Dindigul",
                "Palani"
            ],
            "Erode": [
                "Gobichettipalayam(Uzhavar Sandhai )",
                "Perundurai(Uzhavar Sandhai )",
                "Sampath Nagar(Uzhavar Sandhai )",
                "Sathiyamagalam(Uzhavar Sandhai )",
                "Thalavadi(Uzhavar Sandhai )",
                "Dharapuram",
                "Gobichettipalayam",
                "Kangeyam",
                "Perundurai",
                "Sathyamangalam",
                "Thalavadi"
            ],
            "Karur": [
                "Karur(Uzhavar Sandhai )",
                "Kulithalai(Uzhavar Sandhai )",
                "Velayuthampalayam(Uzhavar Sandhai )",
                "Karur"
            ],
            "Krishnagiri": [
                "Avallapalli(Uzhavar Sandhai )",
                "Denkanikottai(Uzhavar Sandhai )",
                "Hosur(Uzhavar Sandhai )",
                "Kaveripattinam(Uzhavar Sandhai )",
                "Krishnagiri(Uzhavar Sandhai )",
                "Denkanikottai",
                "Hosur",
                "Krishnagiri"
            ],
            "Madurai": [
                "Anaiyur(Uzhavar Sandhai )",
                "Anna nagar(Uzhavar Sandhai )",
                "Chokkikulam(Uzhavar Sandhai )",
                "Melur(Uzhavar Sandhai )",
                "Palanganatham(Uzhavar Sandhai )",
                "Thirumangalam(Uzhavar Sandhai )",
                "Usilampatty",
                "Melur",
                "Thirumangalam"
            ],
            "Nagapattinam": [
                "Mayiladuthurai(Uzhavar Sandhai )",
                "Nagapattinam(Uzhavar Sandhai )",
                "Sirkali(Uzhavar Sandhai )",
                "Mailaduthurai",
                "Nagapattinam",
                "Sirkali"
            ],
            "Namakkal": [
                "Kumarapalayam(Uzhavar Sandhai )",
                "Mohanur(Uzhavar Sandhai )",
                "Namakkal(Uzhavar Sandhai )",
                "Paramathivelur(Uzhavar Sandhai )",
                "Rasipuram(Uzhavar Sandhai )",
                "Tiruchengode",
                "Namakkal",
                "Rasipuram",
                "Namagiripettai"
            ],
            "Perambalur": [
                "Perambalur(Uzhavar Sandhai )"
            ],
            "Pudukkottai": [
                "Aranthangi(Uzhavar Sandhai )",
                "Alangudi(Uzhavar Sandhai )",
                "Gandarvakottai(Uzhavar Sandhai )",
                "Karambakkudi(Uzhavar Sandhai )",
                "Pudukottai(Uzhavar Sandhai )",
                "Viralimalai(Uzhavar Sandhai )",
                "Aranthangi",
                "Pudukottai"
            ],
            "Ramanathapuram": [
                "Paramakudi(Uzhavar Sandhai )",
                "Ramanathapuram(Uzhavar Sandhai )",
                "Paramakudi",
                "Sivagangai",
                "Ramanathapuram(phase 3)"
            ],
            "Ranipet": [
                "Arcot(Uzhavar Sandhai )",
                "Ranipettai(Uzhavar Sandhai )"
            ],
            "Salem": [
                "Ammapet(Uzhavar Sandhai )",
                "Athur(Uzhavar Sandhai )",
                "Attayampatti(Uzhavar Sandhai )",
                "Edapadi (Uzhavar Sandhai )",
                "Elampillai(Uzhavar Sandhai )",
                "Hasthampatti(Uzhavar Sandhai )",
                "Jalagandapuram(Uzhavar Sandhai )",
                "Mettur(Uzhavar Sandhai )",
                "Sooramangalam(Uzhavar Sandhai )",
                "Thammampatti (Uzhavar Sandhai )",
                "Thathakapatti(Uzhavar Sandhai )",
                "Attur",
                "Edappadi",
                "Thammampati"
            ],
            "Sivaganga": [
                "Devakottai (Uzhavar Sandhai )",
                "Karaikudi(Uzhavar Sandhai )",
                "Singampunari(Uzhavar Sandhai )",
                "Sivagangai (Uzhavar Sandhai )",
                "Tirupatthur(Uzhavar Sandhai )",
                "Devakottai",
                "Karaikudi",
                "Singampuneri"
            ],
            "Tenkasi": [
                "Sankarankoil(Uzhavar Sandhai )",
                "Tenkasi(Uzhavar Sandhai )"
            ],
            "Thanjavur": [
                "Kumbakonam (Uzhavar Sandhai )",
                "Papanasam(Uzhavar Sandhai )",
                "Pattukottai(Uzhavar Sandhai )",
                "Thanjavur(Uzhavar Sandhai )",
                "Papanasam",
                "Pattukottai",
                "Kumbakonam",
                "Thanjavur"
            ],
            "Theni": [
                "Andipatti(Uzhavar Sandhai )",
                "Bodinayakanur(Uzhavar Sandhai )",
                "Chinnamanur(Uzhavar Sandhai )",
                "Devaram(Uzhavar Sandhai )",
                "Kambam(Uzhavar Sandhai )",
                "Periyakulam(Uzhavar Sandhai )",
                "Theni(Uzhavar Sandhai )",
                "Bodinayakkanur",
                "Chinnamanur",
                "Cumbum",
                "Theni"
            ],
            "Vellore": [
                "Gudiyatham(Uzhavar Sandhai )",
                "Kahithapattarai(Uzhavar Sandhai )",
                "Katpadi (Uzhavar Sandhai )",
                "Thirupathur",
                "Vellore",
                "Arcot",
                "Gudiyatham",
                "Katpadi(Uzhavar Santhai)",
                "Vaniyambadi"
            ],
            "Virudhunagar": [
                "Aruppukottai(Uzhavar Sandhai )",
                "Kariyapatti(Uzhavar Sandhai )",
                "Rajapalayam(Uzhavar Sandhai )",
                "Sathur(Uzhavar Sandhai )",
                "Sivakasi(Uzhavar Sandhai )",
                "Srivilliputhur(Uzhavar Sandhai )",
                "Thalavaipuram(Uzhavar Sandhai )",
                "Virudhunagar(Uzhavar Sandhai )",
                "Virudhunagar",
                "Sathur"
            ]
        },
        "Karnataka": {
            "Bagalkot": [
                "Bagalakot",
                "Bagalkot(Bilagi)"
            ],
            "Bangalore": [
                "Bangalore",
                "Doddaballa Pur",
                "Ramanagara"
            ],
            "Bellary": [
                "Hospet"
            ],
            "Bidar": [
                "Humanabad"
            ],
            "Chitradurga": [
                "Holalkere"
            ],
            "Dharwad": [
                "Hubli (Amaragol)"
            ],
            "Gadag": [
                "Gadag"
            ],
            "Hassan": [
                "Arasikere",
                "Belur",
                "Hassan",
                "Channarayapatna",
                "Arakalgud"
            ],
            "Haveri": [
                "Ranebennur",
                "Haveri"
            ],
            "Kolar": [
                "Bangarpet",
                "Chickkaballapura",
                "Gowribidanoor",
                "Chintamani",
                "Malur",
                "Kolar"
            ],
            "Koppal": [
                "Koppal"
            ],
            "Mandya": [
                "K.R. Pet",
                "Mandya"
            ],
            "Mysore": [
                "Mysore (Bandipalya)",
                "K.R.Nagar",
                "Hunsur",
                "T. Narasipura"
            ],
            "Raichur": [
                "Raichur"
            ],
            "Shimoga": [
                "Shimoga"
            ],
            "Tumkur": [
                "Tumkur",
                "Madhugiri"
            ],
            "Udupi": [
                "Udupi"
            ]
        },
        "Himachal Pradesh": {
            "Bilaspur": [
                "Bilaspur",
                "Tiphra"
            ],
            "Chamba": [
                "Chamba"
            ],
            "Hamirpur": [
                "Bharuasumerpur",
                "Hamirpur",
                "Hamirpur(Nadaun)",
                "Muskara",
                "Maudaha",
                "Raath"
            ],
            "Kangra": [
                "Dharamshala",
                "Kangra",
                "Kangra(Baijnath)",
                "Kangra(Jaisinghpur)",
                "Kangra(Jassour)",
                "Kangra(Nagrota Bagwan)",
                "Palampur"
            ],
            "Kullu": [
                "Bhuntar",
                "Kullu",
                "Kullu(Chauri Bihal)"
            ],
            "Mandi": [
                "Dhanotu (Mandi)",
                "Mandi(Mandi)",
                "Mandi(Takoli)",
                "Chail Chowk "
            ],
            "Shimla": [
                "Rohroo",
                "Shimla",
                "Shimla and Kinnaur(Rampur)",
                "Shimla and Kinnaur(Theog)"
            ],
            "Solan": [
                "Solan",
                "Solan(Nalagarh)"
            ],
            "Una": [
                "Santoshgarh",
                "Una"
            ]
        },
        "Manipur": {
            "Bishnupur": [
                "Bishenpur"
            ],
            "Imphal East": [
                "Lamlong Bazaar"
            ],
            "Imphal West": [
                "Imphal"
            ],
            "Thoubal": [
                "Thoubal"
            ]
        },
        "Uttarakhand": {
            "Champawat": [
                "Tanakpur"
            ],
            "Haridwar": [
                "Haridwar Union",
                "Manglaur",
                "Roorkee",
                "Bhagwanpur(Naveen Mandi Sthal)",
                "Lakshar"
            ]
        },
        "Chandigarh": {
            "Chandigarh": [
                "Chandigarh(Grain/Fruit)"
            ]
        },
        "Tripura": {
            "Dhalai": [
                "Gandacharra",
                "Halahali"
            ],
            "Gomati": [
                "Garjee",
                "Silachhari"
            ],
            "Khowai": [
                "Kalyanpur",
                "Teliamura"
            ],
            "North Tripura": [
                "Dasda",
                "Kadamtala",
                "Kanchanpur",
                "Panisagar"
            ],
            "Sepahijala": [
                "Bishalgarh",
                "Bishramganj",
                "Jumpuijala",
                "Melaghar"
            ]
        },
        "Nagaland": {
            "Dimapur": [
                "Nuiland"
            ],
            "Kohima": [
                "Jalukie"
            ],
            "Mokokchung": [
                "Mangkolemba",
                "Mokokchung Town"
            ],
            "Peren": [
                "Tenning"
            ]
        },
        "Meghalaya": {
            "East Garo Hills": [
                "Williamnagar"
            ],
            "South Garo Hills": [
                "Baghmara"
            ],
            "West Garo Hills": [
                "Rongram"
            ],
            "West Jaintia Hills": [
                "Jowai"
            ],
            "West Khasi Hills": [
                "Nongstoin"
            ]
        },
        "Assam": {
            "Kamrup": [
                "Pamohi(Garchuk)"
            ],
            "Lakhimpur": [
                "Golagokarnath",
                "Lakhimpur",
                "Paliakala"
            ]
        },
        "Andhra Pradesh": {
            "Kurnool": [
                "Kurnool",
                "Pattikonda"
            ]
        },
        "Andaman and Nicobar Islands": {
            "Nicobar": [
                "Car Nicobar"
            ]
        },
        "Goa": {
            "North Goa": [
                "Mapusa"
            ]
        }
    },
    "Paddy(Dhan)(Common)": {
        "Telangana": {
            "Adilabad": [
                "Asifabad",
                "Chinnoar",
                "Jainath",
                "Kagaznagar",
                "Khanapur",
                "Laxettipet",
                "Sarangapur"
            ],
            "Karimnagar": [
                "Choppadandi",
                "Dharmapuri",
                "Dharmaram",
                "Gangadhara",
                "Gollapally",
                "Gopalraopet",
                "Husnabad",
                "Huzzurabad",
                "Ibrahimpatnam",
                "Jagtial",
                "Kataram",
                "Kathalapur",
                "Koratla",
                "Mallial(Cheppial)",
                "Manakodur",
                "Metpally",
                "Pudur",
                "Manthani",
                "Sircilla",
                "Vemulawada",
                "Sultanabad",
                "Medipally",
                "Karimnagar",
                "Pothgal"
            ],
            "Khammam": [
                "Bhadrachalam",
                "Burgampadu",
                "Charla",
                "Dammapet",
                "Kallur",
                "Kothagudem",
                "Madhira",
                "Nelakondapally",
                "Sattupalli",
                "Wyra",
                "Yellandu"
            ],
            "Medak": [
                "Dubbak",
                "Gajwel",
                "Medak",
                "Narsapur",
                "Siddipet",
                "Ramayampet"
            ],
            "Nalgonda": [
                "Bhongir",
                "Chityal",
                "Choutuppal",
                "Devarakonda",
                "Devarkonda(Dindi)",
                "Devarkonda(Mallepalli)",
                "Huzurnagar",
                "Kodad",
                "Mothkur",
                "Neredcherla",
                "Nidamanoor",
                "Ramannapet",
                "Suryapeta",
                "Tirumalagiri",
                "Voligonda",
                "Venkateswarnagar",
                "Halia",
                "Venkateswarnagar(Chintapalli)",
                "Huzurnagar(Matampally)",
                "Huzumnagar(Garidepally)",
                "Thungathurthy",
                "Aler",
                "Miryalaguda",
                "Chandur(Mungodu)",
                "Nalgonda",
                "Nakrekal"
            ],
            "Nizamabad": [
                "Banswada",
                "Bhiknoor",
                "Bichkunda",
                "Bodhan",
                "Pitlam",
                "Yellareddy",
                "Nizamabad",
                "Varni"
            ],
            "Warangal": [
                "Cherial",
                "Ghanpur",
                "Kesamudram",
                "Kodakandal",
                "Mahabubabad",
                "Mulugu",
                "Thorrur",
                "Wardhannapet",
                "Jangaon"
            ]
        },
        "Gujarat": {
            "Ahmedabad": [
                "Bavla",
                "Sanad",
                "Viramgam",
                "Dholka"
            ],
            "Anand": [
                "Anand",
                "Borsad",
                "Khambhat(Grain Market)",
                "Tarapur",
                "Umreth"
            ],
            "Dahod": [
                "Dahod",
                "Davgadbaria(Piplod)",
                "Devgadhbaria",
                "Zalod(Sanjeli)",
                "Zalod(Zalod)",
                "Limkheda"
            ],
            "Dang": [
                "Vaghai"
            ],
            "Gandhinagar": [
                "Dehgam",
                "Dehgam(Rekhiyal)",
                "Kalol"
            ],
            "Kheda": [
                "Matar(Limbasi)",
                "Matar",
                "Kathlal",
                "Mehmadabad",
                "Thasara"
            ],
            "Mehsana": [
                "Kadi"
            ],
            "Sabarkantha": [
                "Talod",
                "Himatnagar",
                "Prantij",
                "Modasa",
                "Modasa(Tintoi)",
                "Malpur",
                "Bhiloda"
            ],
            "Surat": [
                "Bardoli(Madhi)",
                "Mahuva",
                "Mandvi",
                "Kosamba",
                "Kosamba(Vankal)",
                "Uchhal",
                "Vyara(Paati)",
                "Vyra",
                "Kosamba(Zangvav)",
                "Songadh",
                "Songadh(Umrada)",
                "Valod(Buhari)",
                "Songadh(Badarpada)"
            ]
        },
        "Maharashtra": {
            "Ahmednagar": [
                "Karjat"
            ],
            "Bhandara": [
                "Pavani",
                "Lakhandur",
                "Tumsar"
            ],
            "Chandrapur": [
                "Brahmpuri",
                "Chimur",
                "Gondpimpri",
                "Mul",
                "Nagbhid",
                "Pombhurni",
                "Savali",
                "Sindevahi",
                "Bhadrawati"
            ],
            "Gadchiroli": [
                "Armori",
                "Chamorshi",
                "Gandchiroli",
                "Armori(Desaiganj)",
                "Sironcha"
            ],
            "Nagpur": [
                "Bhiwapur",
                "Nagpur",
                "MS Kalpana Agri Commodities Marketing",
                "Umared",
                "Ramtek",
                "Mandhal"
            ],
            "Nandurbar": [
                "Navapur"
            ],
            "Nashik": [
                "Ghoti"
            ],
            "Raigad": [
                "Karjat(Raigad)",
                "Mangaon",
                "Roha",
                "Alibagh",
                "Murud"
            ]
        },
        "Uttar Pradesh": {
            "Aligarh": [
                "Aligarh"
            ],
            "Amethi": [
                "Jafarganj",
                "Sultanpur"
            ],
            "Amroha": [
                "Amroha"
            ],
            "Auraiya": [
                "Achalda",
                "Auraiya"
            ],
            "Ayodhya": [
                "Faizabad",
                "Rudauli"
            ],
            "Azamgarh": [
                "Azamgarh"
            ],
            "Badaun": [
                "Badayoun",
                "Dataganj",
                "Visoli",
                "Wazirganj",
                "Babrala",
                "Bilsi"
            ],
            "Bahraich": [
                "Bahraich",
                "Naanpara"
            ],
            "Ballia": [
                "Ballia",
                "Rasda",
                "Vilthararoad"
            ],
            "Balrampur": [
                "Balrampur",
                "Bariya",
                "Kusmee",
                "Panchpedwa",
                "Rajpur",
                "Ramanujganj",
                "Tulsipur"
            ],
            "Banda": [
                "Banda",
                "Baberu",
                "Atarra"
            ],
            "Barabanki": [
                "Barabanki",
                "Safdarganj"
            ],
            "Bareilly": [
                "Anwala",
                "Bahedi",
                "Bareilly",
                "Richha"
            ],
            "Basti": [
                "Basti"
            ],
            "Bijnor": [
                "Bijnaur"
            ],
            "Chandauli": [
                "Chandoli"
            ],
            "Deoria": [
                "Devariya",
                "Barhaj"
            ],
            "Etah": [
                "Etah"
            ],
            "Etawah": [
                "Jasvantnagar",
                "Etawah"
            ],
            "Fatehpur": [
                "Bindki",
                "Fatehpur",
                "Jahanabad",
                "Khaga",
                "Kishunpur"
            ],
            "Firozabad": [
                "Sirsaganj",
                "Shikohabad"
            ],
            "Ghazipur": [
                "Yusufpur"
            ],
            "Gonda": [
                "Gonda",
                "Karnailganj",
                "Nawabganj"
            ],
            "Gorakhpur": [
                "Chorichora",
                "Gorakhpur",
                "Sehjanwa"
            ],
            "Hardoi": [
                "Hardoi",
                "Madhoganj",
                "Sandi",
                "Sandila",
                "Shahabad(New Mandi)"
            ],
            "Hathras": [
                "Haathras"
            ],
            "Jaunpur": [
                "Jaunpur",
                "Mugrabaadshahpur",
                "Shahganj"
            ],
            "Jhansi": [
                "Moth"
            ],
            "Kanpur Dehat": [
                "Jhijhank",
                "Pukharayan",
                "Rura"
            ],
            "Kaushambi": [
                "Bharwari"
            ],
            "Kushinagar": [
                "Tamkuhi road"
            ],
            "Lucknow": [
                "Banthara",
                "Lucknow"
            ],
            "Maharajganj": [
                "Anandnagar",
                "Nautnava",
                "Partaval"
            ],
            "Mainpuri": [
                "Mainpuri"
            ],
            "Mathura": [
                "Mathura"
            ],
            "Mirzapur": [
                "Ahirora",
                "Mirzapur"
            ],
            "Prayagraj": [
                "Sirsa",
                "Lediyari",
                "Allahabad",
                "Ajuha"
            ],
            "Rampur": [
                "Vilaspur",
                "Rampur"
            ],
            "Saharanpur": [
                "Saharanpur"
            ],
            "Sambhal": [
                "Chandausi",
                "Muradabad"
            ],
            "Shahjahanpur": [
                "Puwaha",
                "Tilhar",
                "Shahjahanpur",
                "Badda"
            ],
            "Shravasti": [
                "Bhinga"
            ],
            "Sitapur": [
                "Mehmoodabad",
                "Sitapur",
                "Viswan",
                "Hargaon (Laharpur)"
            ],
            "Sonbhadra": [
                "Robertsganj"
            ],
            "Unnao": [
                "Bangarmau",
                "Unnao",
                "Purwa"
            ],
            "Varanasi": [
                "Varanasi"
            ]
        },
        "Madhya Pradesh": {
            "Alirajpur": [
                "Alirajpur",
                "Jobat"
            ],
            "Ashoknagar": [
                "Ashoknagar",
                "Piprai",
                "Mungawali",
                "Chanderi"
            ],
            "Balaghat": [
                "Balaghat",
                "Katangi",
                "Lalbarra",
                "Mohgaon",
                "Varaseoni",
                "Khairlangi",
                "Praswada"
            ],
            "Betul": [
                "Betul",
                "Multai"
            ],
            "Bhind": [
                "Alampur",
                "Bhind",
                "Gohad",
                "Lahar",
                "Mehgaon"
            ],
            "Bhopal": [
                "Berasia",
                "Bhopal"
            ],
            "Chhatarpur": [
                "Rajnagar",
                "Harpalpur",
                "Badamalhera"
            ],
            "Chhindwara": [
                "Amarwda",
                "Chhindwara",
                "Chaurai",
                "Saunsar"
            ],
            "Damoh": [
                "Damoh",
                "Hata",
                "Javera"
            ],
            "Datia": [
                "Bhander",
                "Datia",
                "Sevda"
            ],
            "Dewas": [
                "Khategaon"
            ],
            "Dhar": [
                "Dhar"
            ],
            "Dindori": [
                "Dindori",
                "Gorakhpur",
                "Shahpura"
            ],
            "Guna": [
                "Aron",
                "Guna",
                "Raghogarh",
                "Maksudangarh",
                "Kumbhraj"
            ],
            "Gwalior": [
                "Bhitarwar",
                "Dabra",
                "Lashkar"
            ],
            "Hoshangabad": [
                "Babai",
                "Bankhedi",
                "Banapura",
                "Hoshangabad",
                "Itarsi",
                "Pipariya",
                "Semriharchand"
            ],
            "Indore": [
                "Indore",
                "Gautampura"
            ],
            "Jabalpur": [
                "Jabalpur",
                "Paatan",
                "Sehora",
                "Shahpura Bhitoni (F&V)",
                "Shahpura(Jabalpur)",
                "Sihora"
            ],
            "Jhabua": [
                "Jhabua",
                "Petlawad",
                "Jhabua(F&V)",
                "Thandla"
            ],
            "Katni": [
                "Katni"
            ],
            "Khargone": [
                "Khargone"
            ],
            "Mandla": [
                "Bichhiya",
                "Mandla",
                "Nainpur"
            ],
            "Morena": [
                "Banmorkalan",
                "Morena"
            ],
            "Narsinghpur": [
                "Gadarwada",
                "Kareli",
                "Tendukheda",
                "Gotegaon",
                "Gadarwara(F&V)",
                "Narsinghpur"
            ],
            "Panna": [
                "Ajaygarh",
                "Simariya",
                "Panna",
                "Devandranagar",
                "Pawai"
            ],
            "Raisen": [
                "Bareli",
                "Begamganj",
                "Gairatganj",
                "Obedullaganj",
                "Raisen",
                "Silvani",
                "Udaipura"
            ],
            "Ratlam": [
                "Jaora",
                "Sailana"
            ],
            "Rewa": [
                "Baikunthpur",
                "Chaakghat",
                "Hanumana",
                "Rewa"
            ],
            "Sagar": [
                "Bamora",
                "Bina",
                "Malthone",
                "Khurai",
                "Kesli",
                "Sagar",
                "Shahagarh",
                "Deori",
                "Garhakota"
            ],
            "Satna": [
                "Amarpatan",
                "Ramnagar",
                "Satna",
                "Nagod",
                "Mehar"
            ],
            "Sehore": [
                "Baktara",
                "Jawar",
                "Rehati",
                "Nasrullaganj",
                "Ichhawar",
                "Sehore"
            ],
            "Seoni": [
                "Barghat",
                "Ghansour",
                "Keolari",
                "Lakhnadon",
                "Chhpara",
                "Seoni"
            ],
            "Sheopur": [
                "Sheopurkalan",
                "Sheopurbadod",
                "Vijaypur"
            ],
            "Shivpuri": [
                "Magroni",
                "Shivpuri",
                "Khatora",
                "Kolaras"
            ],
            "Sidhi": [
                "Sidhi"
            ],
            "Tikamgarh": [
                "Niwadi",
                "Tikamgarh"
            ],
            "Ujjain": [
                "Ujjain"
            ],
            "Vidisha": [
                "Ganjbasoda",
                "Vidisha",
                "Kurwai",
                "Shamshabad",
                "Gulabganj"
            ]
        },
        "Haryana": {
            "Ambala": [
                "Mullana",
                "Naraingarh",
                "Shahzadpur",
                "Barara",
                "Mullana(saha)",
                "Naneola"
            ],
            "Bhiwani": [
                "Bhiwani"
            ],
            "Fatehabad": [
                "Bhattu Kalan",
                "Dharsul",
                "Tohana"
            ],
            "Jind": [
                "Safidon",
                "Narwana",
                "Uchana",
                "Pillukhera",
                "Jullana",
                "New Grain Market , Jind"
            ],
            "Kaithal": [
                "Pai",
                "Siwan",
                "Dhand",
                "Kaithal",
                "Pai(Rajaund)"
            ],
            "Karnal": [
                "Kunjpura",
                "Nilokheri",
                "Gharaunda",
                "Asandh",
                "Jundla",
                "Nigdu"
            ],
            "Kurukshetra": [
                "Babain",
                "Ladwa",
                "Pipli",
                "Shahabad",
                "Thanesar",
                "Pehowa(Gumthala Gahru)"
            ],
            "Palwal": [
                "Hodal"
            ],
            "Panchkula": [
                "Barwala"
            ],
            "Panipat": [
                "Madlauda",
                "Samalkha"
            ],
            "Rohtak": [
                "Rohtak"
            ],
            "Sirsa": [
                "New Grain Market , Sirsa",
                "Ding",
                "Ellanabad",
                "kalanwali",
                "Sirsa",
                "Dabwali"
            ],
            "Sonipat": [
                "New Grain Market , Sonipat"
            ]
        },
        "Punjab": {
            "Amritsar": [
                "Attari",
                "Rayya",
                "Mehta",
                "Majitha",
                "Amritsar",
                "Rayya(Sathiala)",
                "Gehri(Jandiala mandi)"
            ],
            "Barnala": [
                "Dhanula (Kaleke)",
                "Dhanaula",
                "Bhadaur(Sehna)",
                "Bhadaur",
                "Barnala",
                "Mehal Kalan",
                "Mehal Kallan (ChananWal)"
            ],
            "Faridkot": [
                "Sadiq",
                "Jaitu(Bajakhana)",
                "Jaitu",
                "Kotkapura"
            ],
            "Fazilka": [
                "Abohar",
                "Jalalabad"
            ],
            "Gurdaspur": [
                "Kahnuwan",
                "Dinanagar"
            ],
            "Hoshiarpur": [
                "Garhshankar(Saila Khurd)",
                "GarhShankar (Kotfatuhi)",
                "Garh Shankar(Mahalpur)",
                "Garh Shankar"
            ],
            "Jalandhar": [
                "Shakot (Malsian)",
                "Phillaur(Apra Mandi)",
                "Noor Mehal",
                "Shahkot",
                "Nakodar",
                "Jalandhar City",
                "Jalandhar City(Kartar Pur Dana mandi)",
                "Jalandhar Cantt.",
                "Nakodar(Sarih)",
                "Jalandhar Cantt (Jamshedpur Dana Mandi)",
                "Phillaur",
                "Bilga",
                "Bilga (Talwan )",
                "Mehatpur",
                "Jalandhar City(Faintan Ganj)"
            ],
            "Ludhiana": [
                "Samrala",
                "Ludhiana(Salem Tabri)",
                "Ludhiana(Mandi gill Road)",
                "Nurpurbet",
                "Mansura",
                "Khanna",
                "Mullanpur",
                "Purain",
                "Sidhwan Bet",
                "Sahnewal",
                "Mullanpur Dakha (Sawadi)",
                "Kila Raipur",
                "Sidhwan Bet (Lodhiwala)",
                "kum Kalan",
                "lakhowal",
                "Raikot (Talwandi rai)",
                "Hathur"
            ],
            "Mansa": [
                "Mansa (Khiala kalan)",
                "Boha",
                "Budhlada (Phaphre Bhaike)",
                "Kankwal Chahlan",
                "Budalada",
                "Bhikhi",
                "Bareta",
                "Sardulgarh",
                "Ahemadpur",
                "Mansa"
            ],
            "Moga": [
                "Badhni Kallan (Bilaspur)",
                "Badhni Kalan",
                "Kot ise Khan"
            ],
            "Patiala": [
                "Rajpura",
                "Patiala(New Anaj Mandi)",
                "Bhadson",
                "Patran",
                "Patiala(Anaj Mandi Sanaur Road)",
                "Patran(Ghagga Mandi)",
                "Samana",
                "Samana(Kakrala)",
                "Ghanaur",
                "Samana(Gajewas)",
                "Dakala"
            ],
            "Sangrur": [
                "Amargarh",
                "Dhuri",
                "Sulargharat",
                "Bhawanigarh",
                "Ahmedgarh",
                "Sunam",
                "Sherpur"
            ]
        },
        "Andhra Pradesh": {
            "Anantapur": [
                "Rayadurg"
            ],
            "East Godavari": [
                "Rajahmundry",
                "Sampara",
                "Tuni",
                "Karapa",
                "Peddapuram",
                "Pithapuram",
                "Anaparthy",
                "Jaggampet",
                "Prattipadu"
            ],
            "Krishna": [
                "Tiruvuru",
                "Divi"
            ],
            "Kurnool": [
                "Atmakur",
                "Banaganapalli",
                "Nandyal"
            ],
            "Nellore": [
                "Gudur",
                "Venkatagiri",
                "Rapur",
                "Vakadu",
                "Nellore"
            ],
            "West Godavari": [
                "Tanuku"
            ]
        },
        "Tamil Nadu": {
            "Ariyalur": [
                "Andimadom"
            ],
            "Coimbatore": [
                "Anaimalai",
                "Pudupalayam",
                "Madathukulam",
                "Thondamuthur",
                "Pethappampatti",
                "Sevur",
                "Palladam"
            ],
            "Cuddalore": [
                "Cuddalore",
                "Sethiathoppu",
                "Panruti",
                "Shrimushnam",
                "Virudhachalam"
            ],
            "Dharmapuri": [
                "Arur",
                "Dharampuri"
            ],
            "Dindigul": [
                "Gopalpatti",
                "Palani",
                "Dindigul",
                "Natham"
            ],
            "Erode": [
                "Boothapadi",
                "Punchaipuliyampatti",
                "Sathyamangalam",
                "Kavunthapadi",
                "Erode",
                "Avalpoonthurai",
                "Chithode"
            ],
            "Krishnagiri": [
                "Krishnagiri",
                "Pochampalli"
            ],
            "Madurai": [
                "Madurai",
                "Usilampatty",
                "Thirumangalam"
            ],
            "Nagapattinam": [
                "Nagapattinam",
                "Mailaduthurai",
                "Sirkali",
                "Sembanarkoil",
                "Kuttulam",
                "Vedaranyam",
                "Kilvelur"
            ],
            "Namakkal": [
                "Velur",
                "Tiruchengode",
                "Namagiripettai",
                "Namakkal"
            ],
            "Pudukkottai": [
                "Alangudi",
                "Pudukottai",
                "Aranthangi"
            ],
            "Ramanathapuram": [
                "Ramanathapuram(phase 3)",
                "Paramakudi",
                "Kamuthi"
            ],
            "Salem": [
                "Karumanturai",
                "Thammampati",
                "Vazhapadi",
                "Attur",
                "Thalaivasal"
            ],
            "Sivaganga": [
                "Karaikudi",
                "Devakottai"
            ],
            "Thanjavur": [
                "Budalur",
                "Kumbakonam",
                "Vallam",
                "Thanjavur",
                "Orathanadu",
                "Papanasam",
                "Pattukottai",
                "Thiruppananthal"
            ],
            "Theni": [
                "Theni",
                "Cumbum",
                "Chinnamanur"
            ],
            "Vellore": [
                "Ammoor",
                "Gudiyatham",
                "Kalavai",
                "Kaveripakkam",
                "Vellore",
                "Vaniyambadi",
                "Arcot",
                "Arkonam"
            ],
            "Virudhunagar": [
                "Sathur",
                "Rajapalayam",
                "Aruppukottai",
                "Virudhunagar"
            ]
        },
        "Karnataka": {
            "Bangalore": [
                "Bangalore",
                "Doddaballa Pur"
            ],
            "Bellary": [
                "Bellary",
                "H.B. Halli"
            ],
            "Chitradurga": [
                "Challakere",
                "Holalkere"
            ],
            "Dharwad": [
                "Kalagategi",
                "Dharwar"
            ],
            "Gadag": [
                "Gadag"
            ],
            "Hassan": [
                "Belur",
                "Hassan",
                "Sakaleshpura",
                "Channarayapatna",
                "Arakalgud"
            ],
            "Haveri": [
                "Shiggauv",
                "Hirekerur",
                "Ranebennur",
                "Haveri"
            ],
            "Kolar": [
                "Bangarpet",
                "Chintamani",
                "Kolar",
                "Gowribidanoor"
            ],
            "Koppal": [
                "Gangavathi",
                "Koppal",
                "Kustagi"
            ],
            "Mandya": [
                "Malavalli",
                "Pandavapura",
                "Maddur",
                "K.R. Pet",
                "Srirangapattana",
                "Nagamangala"
            ],
            "Mysore": [
                "Hunsur",
                "Mysore (Bandipalya)",
                "K.R.Nagar",
                "Nanjangud",
                "Piriya Pattana",
                "Santhesargur"
            ],
            "Raichur": [
                "Lingasugur",
                "Raichur",
                "Sindhanur"
            ],
            "Shimoga": [
                "Bhadravathi",
                "Sorabha",
                "Shimogga(Theertahalli)",
                "Shimoga",
                "Shikaripura"
            ],
            "Tumkur": [
                "Tumkur",
                "Madhugiri",
                "Sira",
                "Pavagada",
                "Kunigal",
                "Gubbi"
            ],
            "Udupi": [
                "Udupi"
            ]
        },
        "West Bengal": {
            "Bankura": [
                "Bankura Sadar",
                "Indus(Bankura Sadar)",
                "Khatra"
            ],
            "Birbhum": [
                "Birbhum",
                "Bolpur",
                "Rampurhat",
                "Sainthia"
            ],
            "Hooghly": [
                "Kalipur"
            ],
            "Malda": [
                "Gajol"
            ],
            "Murshidabad": [
                "Jangipur",
                "Jiaganj",
                "Kandi"
            ],
            "Purba Bardhaman": [
                "Guskara",
                "Katwa",
                "Burdwan"
            ]
        },
        "Rajasthan": {
            "Baran": [
                "Baran",
                "Nahargarh",
                "Samraniyan"
            ],
            "Bundi": [
                "Bundi",
                "Keshoraipatan"
            ],
            "Hanumangarh": [
                "Hanumangarh Town",
                "Pilibanga",
                "Hanumangarh(Urlivas)",
                "Goluwala",
                "Hanumangarh",
                "Sangriya"
            ],
            "Kota": [
                "Kota",
                "Itawa"
            ],
            "Pratapgarh": [
                "Pratapgarh"
            ]
        },
        "Odisha": {
            "Bargarh": [
                "Attabira",
                "Godabhaga"
            ],
            "Bhadrak": [
                "Bhadrak",
                "Sahidngar",
                "Chandabali"
            ],
            "Boudh": [
                "Boudh",
                "Khunthabandha"
            ],
            "Ganjam": [
                "Bhanjanagar",
                "Digapahandi"
            ],
            "Jagatsinghpur": [
                "Jagatsinghpur"
            ],
            "Jharsuguda": [
                "Jharsuguda"
            ],
            "Kalahandi": [
                "Kesinga",
                "Junagarh",
                "Kalahandi(Dharamagarh)"
            ],
            "Kendrapara": [
                "Kendrapara(Marshaghai)",
                "Pattamundai",
                "Kendrapara",
                "Chatta Krushak Bazar"
            ],
            "Puri": [
                "Nimapara"
            ]
        },
        "Himachal Pradesh": {
            "Bilaspur": [
                "Bilaspur",
                "Bilha",
                "Jairamnagar",
                "Kota",
                "Pendraroad",
                "Ratanpur",
                "Sakri",
                "Takhatpur"
            ],
            "Hamirpur": [
                "Bharuasumerpur",
                "Kurara",
                "Muskara"
            ]
        },
        "Manipur": {
            "Bishnupur": [
                "Bishenpur"
            ],
            "Imphal East": [
                "Lamlong Bazaar"
            ],
            "Imphal West": [
                "Imphal"
            ],
            "Thoubal": [
                "Thoubal"
            ]
        },
        "Uttarakhand": {
            "Champawat": [
                "Tanakpur"
            ],
            "Haridwar": [
                "Lakshar"
            ]
        },
        "Chandigarh": {
            "Chandigarh": [
                "Chandigarh(Grain/Fruit)"
            ]
        },
        "Tripura": {
            "Dhalai": [
                "Kulai"
            ],
            "Gomati": [
                "Nutanbazar",
                "Garjee"
            ],
            "Khowai": [
                "Bachaibari"
            ],
            "Sepahijala": [
                "Melaghar",
                "Sonamura"
            ]
        },
        "Puducherry": {
            "Karaikal": [
                "Karaikal"
            ]
        },
        "Assam": {
            "Lakhimpur": [
                "Golagokarnath",
                "Lakhimpur",
                "Paliakala"
            ]
        },
        "Bihar": {
            "Samastipur": [
                "Saidpurhat"
            ],
            "Sheikhpura": [
                "Shekhpura",
                "Barbigha"
            ]
        },
        "Kerala": {
            "Wayanad": [
                "Pulpally"
            ]
        }
    },
    "Pegeon Pea (Arhar Fali)": {
        "Gujarat": {
            "Anand": [
                "Khambhat(Veg Yard Khambhat)"
            ],
            "Dahod": [
                "Dahod(Veg. Market)"
            ],
            "Kheda": [
                "Nadiad",
                "Nadiyad(Chaklasi)",
                "Nadiyad(Piplag)"
            ],
            "Navsari": [
                "Navsari"
            ],
            "Surat": [
                "Surat",
                "Vyra"
            ]
        },
        "Punjab": {
            "Moga": [
                "Dharamkot"
            ]
        }
    },
    "Potato": {
        "Telangana": {
            "Adilabad": [
                "Adilabad(Rythu Bazar)",
                "Jainath"
            ],
            "Hyderabad": [
                "Bowenpally",
                "Erragadda(Rythu Bazar)",
                "Gudimalkapur",
                "L B Nagar",
                "Mahboob Manison"
            ],
            "Karimnagar": [
                "Karimnagar(Rythu Bazar)"
            ],
            "Medak": [
                "Vantamamidi",
                "Siddipet(Rythu Bazar)"
            ],
            "Nalgonda": [
                "Miryalguda(Rythu Bazar)",
                "Venkateswarnagar"
            ],
            "Warangal": [
                "Hanmarkonda(Rythu Bazar)",
                "Warangal"
            ]
        },
        "Uttar Pradesh": {
            "Agra": [
                "Achnera",
                "Agra",
                "Fatehabad",
                "Fatehpur Sikri",
                "Jagnair",
                "Khairagarh",
                "Samsabad"
            ],
            "Aligarh": [
                "Aligarh",
                "Atrauli",
                "Charra",
                "Khair"
            ],
            "Amethi": [
                "Jafarganj",
                "Sultanpur"
            ],
            "Amroha": [
                "Amroha",
                "Dhanaura",
                "Hasanpur"
            ],
            "Auraiya": [
                "Achalda",
                "Auraiya",
                "Dibiapur"
            ],
            "Ayodhya": [
                "Faizabad",
                "Rudauli"
            ],
            "Azamgarh": [
                "Azamgarh"
            ],
            "Badaun": [
                "Badayoun",
                "Bilsi",
                "Babrala",
                "Shahaswan",
                "Ujhani",
                "Visoli",
                "Wazirganj"
            ],
            "Baghpat": [
                "Bagpat",
                "Baraut",
                "Khekda"
            ],
            "Bahraich": [
                "Bahraich",
                "Naanpara"
            ],
            "Ballia": [
                "Ballia",
                "Chitwadagaon",
                "Rasda",
                "Vilthararoad"
            ],
            "Balrampur": [
                "Balrampur",
                "Panchpedwa",
                "Tulsipur"
            ],
            "Banda": [
                "Atarra",
                "Banda",
                "Baberu"
            ],
            "Barabanki": [
                "Barabanki",
                "Safdarganj"
            ],
            "Bareilly": [
                "Anwala",
                "Bahedi",
                "Bareilly"
            ],
            "Basti": [
                "Basti"
            ],
            "Bijnor": [
                "Bijnaur",
                "Chaandpur",
                "Kiratpur",
                "Nagina",
                "Najibabad"
            ],
            "Chandauli": [
                "Chandoli"
            ],
            "Deoria": [
                "Devariya",
                "Barhaj"
            ],
            "Etah": [
                "Awagarh",
                "Etah"
            ],
            "Etawah": [
                "Bharthna",
                "Etawah",
                "Jasvantnagar"
            ],
            "Fatehpur": [
                "Bindki",
                "Fatehpur",
                "Jahanabad",
                "Khaga",
                "Kishunpur"
            ],
            "Firozabad": [
                "Firozabad",
                "Shikohabad",
                "Sirsaganj",
                "Tundla"
            ],
            "Ghaziabad": [
                "Ghaziabad",
                "Hapur",
                "Noida",
                "Muradnagar"
            ],
            "Ghazipur": [
                "Gazipur",
                "Yusufpur",
                "Jangipura",
                "Jamanian"
            ],
            "Gonda": [
                "Gonda",
                "Karnailganj",
                "Nawabganj"
            ],
            "Gorakhpur": [
                "Chorichora",
                "Gorakhpur",
                "Sehjanwa"
            ],
            "Hardoi": [
                "Hardoi",
                "Madhoganj",
                "Sandi",
                "Sandila",
                "Shahabad(New Mandi)"
            ],
            "Hathras": [
                "Haathras",
                "Shadabad",
                "Sikandraraau"
            ],
            "Jaunpur": [
                "Jaunpur",
                "Mugrabaadshahpur",
                "Shahganj"
            ],
            "Jhansi": [
                "Chirgaon",
                "Gurusarai",
                "Jhansi",
                "Mauranipur",
                "Moth"
            ],
            "Kanpur Dehat": [
                "Jhijhank",
                "Pukharayan",
                "Rura"
            ],
            "Kasganj": [
                "Kasganj"
            ],
            "Kaushambi": [
                "Bharwari",
                "Manjhanpur"
            ],
            "Kushinagar": [
                "Tamkuhi road"
            ],
            "Lalitpur": [
                "Lalitpur"
            ],
            "Lucknow": [
                "Lucknow",
                "Banthara"
            ],
            "Maharajganj": [
                "Anandnagar",
                "Gadaura",
                "Nautnava",
                "Partaval"
            ],
            "Mahoba": [
                "Mahoba"
            ],
            "Mainpuri": [
                "Bewar",
                "Ghiraur",
                "Mainpuri"
            ],
            "Mathura": [
                "Kosikalan",
                "Mathura"
            ],
            "Meerut": [
                "Meerut",
                "Mawana",
                "Sardhana"
            ],
            "Mirzapur": [
                "Ahirora",
                "Mirzapur"
            ],
            "Muzaffarnagar": [
                "Muzzafarnagar",
                "Khatauli",
                "Shahpur"
            ],
            "Prayagraj": [
                "Ajuha",
                "Allahabad",
                "Jasra",
                "Sirsa"
            ],
            "Rampur": [
                "Milak",
                "Rampur",
                "Tanda(Rampur)"
            ],
            "Saharanpur": [
                "Chutmalpur",
                "Deoband",
                "Gangoh",
                "Rampurmaniharan",
                "Saharanpur"
            ],
            "Sambhal": [
                "Bhehjoi",
                "Chandausi",
                "Muradabad",
                "Sambhal"
            ],
            "Sant Kabir Nagar": [
                "Khalilabad"
            ],
            "Shahjahanpur": [
                "Puwaha",
                "Shahjahanpur",
                "Tilhar",
                "Jalalabad"
            ],
            "Shamli": [
                "Kairana",
                "Khandhla",
                "Shamli",
                "Thanabhavan"
            ],
            "Shravasti": [
                "Payagpur",
                "Bhinga"
            ],
            "Sitapur": [
                "Hargaon (Laharpur)",
                "Mehmoodabad",
                "Sitapur",
                "Viswan"
            ],
            "Sonbhadra": [
                "Dudhi",
                "Robertsganj"
            ],
            "Unnao": [
                "Bangarmau",
                "Purwa",
                "Unnao"
            ],
            "Varanasi": [
                "Varanasi(F&V)",
                "Varanasi"
            ]
        },
        "Gujarat": {
            "Ahmedabad": [
                "Ahmedabad(Chimanbhai Patal Market Vasana)"
            ],
            "Amreli": [
                "Dhari"
            ],
            "Anand": [
                "Anand(Veg,Yard,Anand)",
                "Khambhat(Veg Yard Khambhat)"
            ],
            "Bharuch": [
                "Ankleshwar",
                "Bharuch"
            ],
            "Bhavnagar": [
                "Palitana"
            ],
            "Dahod": [
                "Dahod(Veg. Market)"
            ],
            "Gandhinagar": [
                "Mansa(Manas Veg Yard)"
            ],
            "Kheda": [
                "Kapadvanj",
                "Nadiad",
                "Nadiyad(Chaklasi)",
                "Nadiyad(Piplag)"
            ],
            "Mehsana": [
                "Mehsana(Mehsana Veg)",
                "Vijapur(veg)",
                "Visnagar"
            ],
            "Navsari": [
                "Bilimora",
                "Navsari"
            ],
            "Porbandar": [
                "Porbandar"
            ],
            "Rajkot": [
                "Gondal(Veg.market Gondal)",
                "Rajkot(Veg.Sub Yard)"
            ],
            "Surat": [
                "Surat"
            ],
            "Surendranagar": [
                "Vadhvan"
            ]
        },
        "Maharashtra": {
            "Ahmednagar": [
                "Ahmednagar",
                "Rahata",
                "Rahuri",
                "Shrirampur",
                "Rahuri(Songaon)"
            ],
            "Akola": [
                "Akola"
            ],
            "Chandrapur": [
                "Chandrapur(Ganjwad)",
                "Chandrapur"
            ],
            "Kolhapur": [
                "Vadgaonpeth"
            ],
            "Nagpur": [
                "Hingna",
                "Kamthi",
                "Nagpur",
                "Ramtek"
            ],
            "Nashik": [
                "Nasik"
            ],
            "Pune": [
                "Junnar(Narayangaon)",
                "Junnar(Otur)",
                "Khed(Chakan)",
                "Junnar",
                "Manchar",
                "Pune",
                "Pune(Khadiki)",
                "Pune(Manjri)",
                "Pune(Moshi)",
                "Pune(Pimpri)",
                "Junnar(Alephata)"
            ],
            "Raigad": [
                "Pen"
            ],
            "Sangli": [
                "Islampur",
                "Sangli(Phale, Bhajipura Market)",
                "Vita"
            ],
            "Satara": [
                "Satara",
                "Vai"
            ],
            "Thane": [
                "Kalyan",
                "Murbad"
            ]
        },
        "Rajasthan": {
            "Ajmer": [
                "Ajmer(F&V)",
                "Madanganj Kishangarh"
            ],
            "Alwar": [
                "Alwar (F&V)"
            ],
            "Baran": [
                "Baran"
            ],
            "Bharatpur": [
                "Bayana",
                "Bharatpur",
                "Nadwai"
            ],
            "Bhilwara": [
                "Bhilwara"
            ],
            "Bikaner": [
                "Bikaner (F&V)"
            ],
            "Chittorgarh": [
                "Chittorgarh",
                "Nimbahera"
            ],
            "Churu": [
                "Churu",
                "Sujangarh"
            ],
            "Dungarpur": [
                "Dungarpur"
            ],
            "Hanumangarh": [
                "Bhadara",
                "Goluwala",
                "Hanumangarh",
                "Hanumangarh Town",
                "Hanumangarh(Urlivas)",
                "Rawatsar",
                "Sangriya",
                "Nohar"
            ],
            "Jaipur": [
                "Jaipur (F&V)"
            ],
            "Jaisalmer": [
                "Jaisalmer"
            ],
            "Jalore": [
                "Jalore"
            ],
            "Jhunjhunu": [
                "Jhunjhunu"
            ],
            "Jodhpur": [
                "Jodhpur (F&V)"
            ],
            "Kota": [
                "Kota (F&V)"
            ],
            "Nagaur": [
                "Nagour(FV)"
            ],
            "Pali": [
                "Pali",
                "Sojat Road",
                "Sojat City"
            ],
            "Pratapgarh": [
                "Pratapgarh"
            ],
            "Rajsamand": [
                "Rajsamand"
            ],
            "Sikar": [
                "Sikar"
            ],
            "Sirohi": [
                "Abu Road"
            ],
            "Tonk": [
                "Tonk"
            ],
            "Udaipur": [
                "Udaipur (F&V)"
            ]
        },
        "Kerala": {
            "Alappuzha": [
                "Aroor",
                "Alappuzha",
                "Chengannur",
                "Cherthala",
                "Kayamkulam",
                "Madhavapuram",
                "Mannar",
                "Harippad"
            ],
            "Ernakulam": [
                "Aluva",
                "Angamaly",
                "Broadway market",
                "Ernakulam",
                "Kothamangalam",
                "North Paravur",
                "Perumbavoor",
                "Piravam",
                "Thrippunithura",
                "Moovattupuzha"
            ],
            "Idukki": [
                "Kattappana",
                "Munnar",
                "Thodupuzha",
                "Vandiperiyar",
                "Nedumkandam"
            ],
            "Kottayam": [
                "Athirampuzha",
                "Ettumanoor",
                "Kanjirappally",
                "Kuruppanthura",
                "Kottayam",
                "Pala",
                "Pampady",
                "Thalayolaparambu"
            ],
            "Malappuram": [
                "Kondotty",
                "Kottakkal",
                "Manjeri",
                "Parappanangadi",
                "Perinthalmanna"
            ],
            "Thiruvananthapuram": [
                "Aralamoodu",
                "Anyara(EEC)",
                "Chala",
                "Pothencode",
                "Vamanapuram",
                "Balarampuram"
            ]
        },
        "West Bengal": {
            "Alipurduar": [
                "Alipurduar",
                "Falakata"
            ],
            "Bankura": [
                "Bankura Sadar",
                "Bishnupur(Bankura)",
                "Indus(Bankura Sadar)",
                "Khatra"
            ],
            "Birbhum": [
                "Birbhum",
                "Bolpur",
                "Rampurhat",
                "Sainthia"
            ],
            "Dakshin Dinajpur": [
                "Balurghat",
                "Gangarampur(Dakshin Dinajpur)"
            ],
            "Darjeeling": [
                "Darjeeling",
                "Karsiyang(Matigara)",
                "Siliguri"
            ],
            "Hooghly": [
                "Champadanga",
                "Kalipur",
                "Pandua",
                "Sheoraphuly"
            ],
            "Howrah": [
                "Ramkrishanpur(Howrah)",
                "Uluberia"
            ],
            "Jalpaiguri": [
                "Belacoba",
                "Dhupguri",
                "Jalpaiguri Sadar",
                "Moynaguri"
            ],
            "Jhargram": [
                "Jhargram"
            ],
            "Kalimpong": [
                "Kalimpong"
            ],
            "Kolkata": [
                "Bara Bazar (Posta Bazar)"
            ],
            "Malda": [
                "English Bazar",
                "Gajol",
                "Samsi"
            ],
            "Murshidabad": [
                "Beldanga",
                "Jangipur",
                "Jiaganj",
                "Kandi"
            ],
            "Nadia": [
                "Bethuadahari",
                "Chakdah",
                "Kalyani",
                "Karimpur",
                "Nadia",
                "Ranaghat"
            ],
            "North 24 Parganas": [
                "Barasat",
                "Habra"
            ],
            "Paschim Bardhaman": [
                "Asansol",
                "Durgapur"
            ],
            "Purba Bardhaman": [
                "Burdwan",
                "Guskara",
                "Kalna",
                "Katwa",
                "Memari"
            ],
            "Uttar Dinajpur": [
                "Islampur"
            ]
        },
        "Madhya Pradesh": {
            "Alirajpur": [
                "Alirajpur(F&V)"
            ],
            "Betul": [
                "Multai"
            ],
            "Bhind": [
                "Bhind"
            ],
            "Bhopal": [
                "Bhopal",
                "Bhopal(F&V)"
            ],
            "Chhindwara": [
                "Chhindwara",
                "Chhindwara(F&V)"
            ],
            "Damoh": [
                "Damoh(F&V)"
            ],
            "Dewas": [
                "Dewas",
                "Sonkachh(F&V)",
                "Dewas(F&V)",
                "Haatpipliya",
                "Sonkatch"
            ],
            "Dhar": [
                "Dhamnod(F&V)",
                "Manawar(F&V)",
                "Rajgarh(F&V)",
                "Dhamnod",
                "Dhar(F&V)",
                "Kukshi",
                "Manawar",
                "Rajgarh"
            ],
            "Guna": [
                "Guna(F&V)"
            ],
            "Gwalior": [
                "Lashkar",
                "Lashkar(F&V)"
            ],
            "Hoshangabad": [
                "Hoshangabad(F&V)",
                "Pipariya(F&V)",
                "Hoshangabad",
                "Pipariya",
                "Itarsi"
            ],
            "Indore": [
                "Indore",
                "Gautampura",
                "Mhow(F&V)",
                "Indore(F&V)",
                "Mhow",
                "Sanwer"
            ],
            "Jabalpur": [
                "Jabalpur(F&V)"
            ],
            "Jhabua": [
                "Petlawad(F&V)",
                "Petlawad",
                "Thandla"
            ],
            "Katni": [
                "Katni",
                "Katni(F&V)"
            ],
            "Khandwa": [
                "Khandwa",
                "Khandwa(F&V)"
            ],
            "Khargone": [
                "Badwaha",
                "Khargone",
                "Sanawad"
            ],
            "Mandsaur": [
                "Mandsaur(F&V)",
                "Sitmau"
            ],
            "Morena": [
                "Morena",
                "Porsa",
                "Ambaha",
                "Sabalgarh(F&V)",
                "Morena(F&V)",
                "Porsa(F&V)",
                "Sabalgarh"
            ],
            "Rajgarh": [
                "Sarangpur",
                "Biaora",
                "Narsinghgarh"
            ],
            "Rewa": [
                "Rewa",
                "Rewa(F&V)"
            ],
            "Sagar": [
                "Deori",
                "Garhakota",
                "Khurai(F&V)",
                "Sagar(F&V)"
            ],
            "Satna": [
                "Mehar",
                "Satna(F&V)"
            ],
            "Sehore": [
                "Sehore",
                "Ashta"
            ],
            "Seoni": [
                "Seoni"
            ],
            "Shajapur": [
                "Akodiya",
                "Kalapipal",
                "Shajapur",
                "Shujalpur",
                "Agar",
                "Kalapipal(F&V)",
                "Shajapur(F&V)"
            ],
            "Sheopur": [
                "Sheopurkalan(F&V)",
                "Syopurkalan(F&V)"
            ],
            "Shivpuri": [
                "Barad",
                "Kolaras(F&V)",
                "Shivpuri(F&V)"
            ],
            "Ujjain": [
                "Ujjain",
                "Ujjain(F&V)"
            ]
        },
        "Haryana": {
            "Ambala": [
                "Ambala Cantt.",
                "Ambala City(Subji Mandi)",
                "Barara",
                "Naraingarh",
                "Shahzadpur",
                "Ambala City",
                "Mullana"
            ],
            "Bhiwani": [
                "Bhiwani",
                "Ch. Dadri",
                "Loharu"
            ],
            "Faridabad": [
                "Ballabhgarh",
                "New Grain Market , Faridabad",
                "Faridabad"
            ],
            "Fatehabad": [
                "Dharsul",
                "Fatehabad",
                "Jakhal",
                "Ratia",
                "Tohana(New Veg Market)",
                "Tohana",
                "Bhuna"
            ],
            "Jind": [
                "Jind",
                "Narwana",
                "Safidon",
                "Jullana"
            ],
            "Kaithal": [
                "Cheeka",
                "Dhand",
                "Kaithal",
                "Pundri",
                "Siwan"
            ],
            "Karnal": [
                "Gharaunda",
                "Indri",
                "New Grain Market(main), Karnal",
                "Tarori"
            ],
            "Kurukshetra": [
                "Babain",
                "Iamailabad",
                "Ladwa",
                "Pehowa",
                "Pipli",
                "Shahabad",
                "Thanesar"
            ],
            "Palwal": [
                "Hassanpur",
                "Palwal",
                "Hodal"
            ],
            "Panchkula": [
                "Barwala",
                "New Grain Market , Panchkula",
                "Raipur Rai",
                "Panchkul(Kalka)"
            ],
            "Panipat": [
                "Madlauda",
                "Panipat",
                "Samalkha"
            ],
            "Rewari": [
                "Kosli",
                "Rewari"
            ],
            "Rohtak": [
                "Meham",
                "Rohtak",
                "Sampla"
            ],
            "Sirsa": [
                "Dabwali",
                "kalanwali",
                "Rania",
                "Sirsa",
                "Rania(Jiwan nagar)",
                "Ellanabad"
            ],
            "Sonipat": [
                "Ganaur",
                "Gohana",
                "Sonepat",
                "Sonepat(Kharkhoda)"
            ]
        },
        "Punjab": {
            "Amritsar": [
                "Amritsar(Amritsar Mewa Mandi)",
                "Gehri(Jandiala mandi)",
                "Rayya",
                "Gehri"
            ],
            "Barnala": [
                "Barnala"
            ],
            "Faridkot": [
                "Faridkot",
                "Jaitu",
                "Kotkapura"
            ],
            "Fazilka": [
                "Fazilka",
                "Jalalabad",
                "Abohar"
            ],
            "Gurdaspur": [
                "Batala",
                "Dhariwal",
                "Dinanagar",
                "Gurdaspur",
                "F.G.Churian",
                "Dera Baba Nanak",
                "Quadian",
                "Kalanaur"
            ],
            "Hoshiarpur": [
                "Dasuya",
                "Garh Shankar",
                "Garh Shankar(Mahalpur)",
                "GarhShankar (Kotfatuhi)",
                "Hoshiarpur(Sham Churasi)",
                "Mukerian",
                "Mukerian(Talwara)",
                "Tanda Urmur",
                "Hoshiarpur"
            ],
            "Jalandhar": [
                "Bhogpur",
                "Bilga",
                "Jalandhar City(Jalandhar)",
                "Lohian Khas",
                "Mehatpur",
                "Nakodar",
                "Noor Mehal",
                "Phillaur(Apra Mandi)",
                "Phillaur",
                "Bilga (Talwan )",
                "Shahkot",
                "Goraya"
            ],
            "Ludhiana": [
                "Doraha",
                "Jagraon",
                "Khanna",
                "Ludhiana",
                "Machhiwara",
                "Sahnewal",
                "Samrala",
                "Raikot"
            ],
            "Mansa": [
                "Budalada",
                "Mansa",
                "Sardulgarh"
            ],
            "Moga": [
                "Baghapurana",
                "Dharamkot",
                "Kot ise Khan",
                "Moga",
                "Nihal Singh Wala"
            ],
            "Pathankot": [
                "Pathankot"
            ],
            "Patiala": [
                "Dudhansadhan",
                "Nabha",
                "Patran",
                "Rajpura",
                "Samana",
                "Ghanaur",
                "Patiala"
            ],
            "Sangrur": [
                "Ahmedgarh",
                "Bhawanigarh",
                "Lehra Gaga",
                "Malerkotla",
                "Sunam",
                "Dhuri",
                "Khanauri",
                "Sangrur"
            ]
        },
        "Jammu and Kashmir": {
            "Anantnag": [
                "Ashahipora (Anantnagh)",
                "Kulgam"
            ],
            "Jammu": [
                "Akhnoor",
                "Batote",
                "Narwal Jammu (F&V)"
            ],
            "Kathua": [
                "Kathua"
            ],
            "Kupwara": [
                "Bumhama-Kupwara (F&V)"
            ],
            "Rajouri": [
                "Rajouri (F&V)"
            ],
            "Srinagar": [
                "Parimpore"
            ],
            "Udhampur": [
                "Reasi",
                "Udhampur"
            ]
        },
        "Odisha": {
            "Angul": [
                "Angul",
                "Angul(Jarapada)",
                "Talcher",
                "Angaura",
                "Angul(Atthamallick)"
            ],
            "Balasore": [
                "Jaleswar",
                "Nilagiri",
                "Barikpur",
                "Bampada"
            ],
            "Bargarh": [
                "Attabira",
                "Bargarh",
                "Bargarh(Barapalli)",
                "Godabhaga"
            ],
            "Bhadrak": [
                "Bhadrak",
                "Chandabali",
                "Sahidngar"
            ],
            "Boudh": [
                "Boudh",
                "Khunthabandha"
            ],
            "Cuttack": [
                "Banki"
            ],
            "Dhenkanal": [
                "Dhenkanal",
                "Hindol",
                "Kamakhyanagar",
                "Mottagaon"
            ],
            "Ganjam": [
                "Bhanjanagar",
                "Hinjilicut",
                "Digapahandi"
            ],
            "Jagatsinghpur": [
                "Jagatsinghpur"
            ],
            "Jajpur": [
                "Jajpur"
            ],
            "Jharsuguda": [
                "Jharsuguda"
            ],
            "Kalahandi": [
                "Kesinga",
                "Bhawanipatna"
            ],
            "Kendrapara": [
                "Chatta Krushak Bazar",
                "Gopa",
                "Kendrapara",
                "Kendrapara(Marshaghai)",
                "Pattamundai"
            ],
            "Koraput": [
                "Koraput(Semilguda)",
                "Koraput"
            ],
            "Nayagarh": [
                "Bahadajholla",
                "Sarankul"
            ],
            "Nuapada": [
                "Khariar",
                "Khariar Road"
            ],
            "Puri": [
                "Nimapara"
            ],
            "Rayagada": [
                "Rayagada"
            ],
            "Sambalpur": [
                "Kuchinda"
            ]
        },
        "Bihar": {
            "Araria": [
                "Forbesganj",
                "Arreria",
                "Raniganj"
            ],
            "Arwal": [
                "Arwal"
            ],
            "Aurangabad": [
                "Aurangabad",
                "Amba",
                "Daunagar"
            ],
            "Banka": [
                "Amarpur",
                "Barahat",
                "Rajaun"
            ],
            "Begusarai": [
                "Balliah",
                "Begusarai",
                "Teghra"
            ],
            "Bhagalpur": [
                "Bhagalpur",
                "Kahalgaon",
                "Naugachiya"
            ],
            "Bhojpur": [
                "Aarah",
                "Piro"
            ],
            "Buxar": [
                "Buxur",
                "Brahmpur"
            ],
            "Darbhanga": [
                "Darbhanga",
                "Bahadurpur (Ekmi Ghat)"
            ],
            "Jamui": [
                "Jamui",
                "Sikandara"
            ],
            "Jehanabad": [
                "Jehanabad"
            ],
            "Khagaria": [
                "Mansi Mandi"
            ],
            "Kishanganj": [
                "Bahadurganj",
                "Thakurganj",
                "Kishanganj"
            ],
            "Madhepura": [
                "Murliganj",
                "Bihariganj",
                "Singheswarsthan"
            ],
            "Madhubani": [
                "Jahajharpur",
                "Jainagar"
            ],
            "Muzaffarpur": [
                "Bhagwanpur Mandi",
                "Muzaffarpur"
            ],
            "Nalanda": [
                "Biharsharif",
                "Harnaut"
            ],
            "Nawada": [
                "Nawada",
                "Rajauli"
            ],
            "Rohtas": [
                "Natwar",
                "Nokha",
                "Dehri",
                "Vikramganj"
            ],
            "Saharsa": [
                "Saharsa"
            ],
            "Samastipur": [
                "Saidpurhat"
            ],
            "Saran": [
                "Sonpur"
            ],
            "Sheikhpura": [
                "Barbigha",
                "Shekhpura"
            ],
            "Sheohar": [
                "Sheohar"
            ],
            "Sitamarhi": [
                "Sitamarhi"
            ],
            "Siwan": [
                "Siwan"
            ],
            "Supaul": [
                "Birpur",
                "Supaul",
                "Triveniganj"
            ],
            "Vaishali": [
                "Jaitipir Mandi, Lalganj block",
                "Hajipur",
                "Parsoniya Mandi, Mahua block"
            ]
        },
        "Tamil Nadu": {
            "Ariyalur": [
                "Ariyalur Market",
                "Jayamkondam",
                "Ariyalur(Uzhavar Sandhai)",
                "Jeyankondam (Uzhavar Sandhai )"
            ],
            "Chengalpattu": [
                "Chengalpet(Uzhavar Sandhai )",
                "Guduvancheri(Uzhavar Sandhai )",
                "Jameenrayapettai(Uzhavar Sandhai )",
                "Madhuranthagam(Uzhavar Sandhai )",
                "Medavakkam(Uzhavar Sandhai )",
                "Nanganallur(Uzhavar Sandhai )",
                "Pallavaram(Uzhavar Sandhai )",
                "Thirukalukundram(Uzhavar Sandhai )"
            ],
            "Coimbatore": [
                "Palladam",
                "Pollachi",
                "Sulur",
                "Udumalpet",
                "Mettupalayam(Uzhavar Sandhai )",
                "Pollachi(Uzhavar Sandhai )",
                "RSPuram(Uzhavar Sandhai )",
                "Singanallur(Uzhavar Sandhai )",
                "Sulur(Uzhavar Sandhai )",
                "Sundarapuram(Uzhavar Sandhai )",
                "Vadavalli(Uzhavar Sandhai )",
                "Kurichi(Uzhavar Sandhai )"
            ],
            "Cuddalore": [
                "Chidambaram",
                "Panruti",
                "Cuddalore",
                "Chidambaram(Uzhavar Sandhai )",
                "Cuddalore(Uzhavar Sandhai )",
                "Panruti(Uzhavar Sandhai )",
                "Viruthachalam(Uzhavar Sandhai )"
            ],
            "Dharmapuri": [
                "Dharampuri",
                "Pennagaram",
                "Palakode",
                "AJattihalli(Uzhavar Sandhai )",
                "Dharmapuri(Uzhavar Sandhai )",
                "Harur(Uzhavar Sandhai )",
                "Palacode(Uzhavar Sandhai )",
                "Pennagaram(Uzhavar Sandhai )",
                "Arur"
            ],
            "Dindigul": [
                "Dindigul",
                "Palani",
                "Chinnalapatti(Uzhavar Sandhai )",
                "Dindigul(Uzhavar Sandhai )",
                "Palani(Uzhavar Sandhai )",
                "Vedasanthur(Uzhavar Sandhai )"
            ],
            "Erode": [
                "Gobichettipalayam",
                "Dharapuram",
                "Sathyamangalam",
                "Perundurai",
                "Thalavadi",
                "Gobichettipalayam(Uzhavar Sandhai )",
                "Perundurai(Uzhavar Sandhai )",
                "Sampath Nagar(Uzhavar Sandhai )",
                "Sathiyamagalam(Uzhavar Sandhai )",
                "Thalavadi(Uzhavar Sandhai )"
            ],
            "Karur": [
                "Karur",
                "Karur(Uzhavar Sandhai )",
                "Kulithalai(Uzhavar Sandhai )",
                "Velayuthampalayam(Uzhavar Sandhai )"
            ],
            "Krishnagiri": [
                "Denkanikottai",
                "Hosur",
                "Krishnagiri",
                "Avallapalli(Uzhavar Sandhai )",
                "Denkanikottai(Uzhavar Sandhai )",
                "Hosur(Uzhavar Sandhai )",
                "Kaveripattinam(Uzhavar Sandhai )",
                "Krishnagiri(Uzhavar Sandhai )"
            ],
            "Madurai": [
                "Anaiyur(Uzhavar Sandhai )",
                "Anna nagar(Uzhavar Sandhai )",
                "Chokkikulam(Uzhavar Sandhai )",
                "Palanganatham(Uzhavar Sandhai )"
            ],
            "Nagapattinam": [
                "Nagapattinam",
                "Sirkali",
                "Mailaduthurai",
                "Mayiladuthurai(Uzhavar Sandhai )",
                "Nagapattinam(Uzhavar Sandhai )",
                "Sirkali(Uzhavar Sandhai )"
            ],
            "Namakkal": [
                "Namakkal",
                "Rasipuram",
                "Tiruchengode",
                "Kumarapalayam(Uzhavar Sandhai )",
                "Mohanur(Uzhavar Sandhai )",
                "Namakkal(Uzhavar Sandhai )",
                "Paramathivelur(Uzhavar Sandhai )",
                "Rasipuram(Uzhavar Sandhai )"
            ],
            "Perambalur": [
                "Perambalur(Uzhavar Sandhai )"
            ],
            "Pudukkottai": [
                "Pudukottai",
                "Alangudi(Uzhavar Sandhai )",
                "Karambakkudi(Uzhavar Sandhai )",
                "Pudukottai(Uzhavar Sandhai )",
                "Gandarvakottai(Uzhavar Sandhai )"
            ],
            "Ramanathapuram": [
                "Paramakudi",
                "Sivagangai",
                "Paramakudi(Uzhavar Sandhai )"
            ],
            "Ranipet": [
                "Arcot(Uzhavar Sandhai )",
                "Ranipettai(Uzhavar Sandhai )"
            ],
            "Salem": [
                "Attur",
                "Edappadi",
                "Thammampati",
                "Ammapet(Uzhavar Sandhai )",
                "Athur(Uzhavar Sandhai )",
                "Attayampatti(Uzhavar Sandhai )",
                "Edapadi (Uzhavar Sandhai )",
                "Elampillai(Uzhavar Sandhai )",
                "Hasthampatti(Uzhavar Sandhai )",
                "Jalagandapuram(Uzhavar Sandhai )",
                "Mettur(Uzhavar Sandhai )",
                "Sooramangalam(Uzhavar Sandhai )",
                "Thammampatti (Uzhavar Sandhai )",
                "Thathakapatti(Uzhavar Sandhai )"
            ],
            "Sivaganga": [
                "Devakottai",
                "Karaikudi",
                "Singampuneri",
                "Devakottai (Uzhavar Sandhai )",
                "Karaikudi(Uzhavar Sandhai )",
                "Singampunari(Uzhavar Sandhai )",
                "Sivagangai (Uzhavar Sandhai )",
                "Tirupatthur(Uzhavar Sandhai )"
            ],
            "Tenkasi": [
                "Tenkasi(Uzhavar Sandhai )"
            ],
            "Thanjavur": [
                "Papanasam",
                "Pattukottai",
                "Thanjavur",
                "Kumbakonam",
                "Kumbakonam (Uzhavar Sandhai )",
                "Papanasam(Uzhavar Sandhai )",
                "Pattukottai(Uzhavar Sandhai )",
                "Thanjavur(Uzhavar Sandhai )"
            ],
            "Theni": [
                "Bodinayakkanur",
                "Chinnamanur",
                "Cumbum",
                "Theni",
                "Andipatti(Uzhavar Sandhai )",
                "Bodinayakanur(Uzhavar Sandhai )",
                "Chinnamanur(Uzhavar Sandhai )",
                "Devaram(Uzhavar Sandhai )",
                "Kambam(Uzhavar Sandhai )",
                "Periyakulam(Uzhavar Sandhai )",
                "Theni(Uzhavar Sandhai )"
            ],
            "Vellore": [
                "Arcot",
                "Gudiyatham",
                "Katpadi(Uzhavar Santhai)",
                "Thirupathur",
                "Vaniyambadi",
                "Vellore",
                "Gudiyatham(Uzhavar Sandhai )",
                "Kahithapattarai(Uzhavar Sandhai )",
                "Katpadi (Uzhavar Sandhai )"
            ],
            "Virudhunagar": [
                "Sathur",
                "Virudhunagar",
                "Aruppukottai(Uzhavar Sandhai )",
                "Kariyapatti(Uzhavar Sandhai )",
                "Rajapalayam(Uzhavar Sandhai )",
                "Sathur(Uzhavar Sandhai )",
                "Sivakasi(Uzhavar Sandhai )",
                "Srivilliputhur(Uzhavar Sandhai )",
                "Thalavaipuram(Uzhavar Sandhai )",
                "Virudhunagar(Uzhavar Sandhai )"
            ]
        },
        "Karnataka": {
            "Bangalore": [
                "Bangalore",
                "Doddaballa Pur",
                "Ramanagara",
                "Hoskote"
            ],
            "Bellary": [
                "Hospet"
            ],
            "Bidar": [
                "Humanabad"
            ],
            "Dharwad": [
                "Hubli (Amaragol)"
            ],
            "Gadag": [
                "Gadag"
            ],
            "Hassan": [
                "Arakalgud",
                "Channarayapatna",
                "Belur",
                "Arasikere",
                "Hassan"
            ],
            "Haveri": [
                "Haveri"
            ],
            "Kolar": [
                "Bangarpet",
                "Chickkaballapura",
                "Chintamani",
                "Kolar",
                "Malur",
                "Mulabagilu",
                "Gowribidanoor"
            ],
            "Koppal": [
                "Koppal"
            ],
            "Mandya": [
                "Mandya"
            ],
            "Mysore": [
                "Mysore (Bandipalya)",
                "Nanjangud",
                "K.R.Nagar",
                "T. Narasipura"
            ],
            "Shimoga": [
                "Shimoga"
            ],
            "Tumkur": [
                "Tumkur"
            ],
            "Udupi": [
                "Udupi"
            ]
        },
        "Himachal Pradesh": {
            "Bilaspur": [
                "Bilaspur",
                "Tiphra"
            ],
            "Chamba": [
                "Chamba"
            ],
            "Hamirpur": [
                "Bharuasumerpur",
                "Hamirpur",
                "Hamirpur(Nadaun)",
                "Maudaha",
                "Muskara",
                "Raath"
            ],
            "Kangra": [
                "Dharamshala",
                "Kangra",
                "Kangra(Baijnath)",
                "Kangra(Jaisinghpur)",
                "Kangra(Jassour)",
                "Kangra(Nagrota Bagwan)",
                "Palampur"
            ],
            "Kullu": [
                "Bhuntar",
                "Kullu",
                "Kullu(Chauri Bihal)",
                "Bandrol"
            ],
            "Mandi": [
                "Dhanotu (Mandi)",
                "Mandi(Mandi)",
                "Mandi(Takoli)",
                "Chail Chowk "
            ],
            "Shimla": [
                "Shimla",
                "Rohroo",
                "Shimla and Kinnaur(Rampur)",
                "Shimla and Kinnaur(Nerwa)",
                "Shimla and Kinnaur(Theog)"
            ],
            "Solan": [
                "Solan",
                "Solan(Nalagarh)"
            ],
            "Una": [
                "Santoshgarh",
                "Una",
                "Santoshgarah"
            ]
        },
        "Manipur": {
            "Bishnupur": [
                "Bishenpur"
            ],
            "Imphal East": [
                "Lamlong Bazaar"
            ],
            "Imphal West": [
                "Imphal"
            ],
            "Thoubal": [
                "Thoubal"
            ]
        },
        "Uttarakhand": {
            "Champawat": [
                "Tanakpur"
            ],
            "Haridwar": [
                "Bhagwanpur(Naveen Mandi Sthal)",
                "Haridwar Union",
                "Manglaur",
                "Roorkee",
                "Lakshar"
            ]
        },
        "Chandigarh": {
            "Chandigarh": [
                "Chandigarh(Grain/Fruit)"
            ]
        },
        "Andhra Pradesh": {
            "Chittor": [
                "Palamaner"
            ]
        },
        "Tripura": {
            "Dhalai": [
                "Chowmanu",
                "Gandacharra",
                "Kulai",
                "Masli",
                "Halahali"
            ],
            "Gomati": [
                "Garjee",
                "Nutanbazar",
                "Silachhari"
            ],
            "Khowai": [
                "Bachaibari",
                "Kalyanpur",
                "Teliamura"
            ],
            "North Tripura": [
                "Dasda",
                "Kadamtala",
                "Panisagar",
                "Kanchanpur"
            ],
            "Sepahijala": [
                "Bishalgarh",
                "Bishramganj",
                "Boxonagar",
                "Jumpuijala",
                "Melaghar",
                "Sonamura"
            ]
        },
        "Meghalaya": {
            "East Jaintia Hills": [
                "Khliehriat"
            ],
            "East Khasi Hills": [
                "Shillong",
                "Sohra",
                "Mawiong Regulated Market"
            ],
            "South Garo Hills": [
                "Baghmara"
            ],
            "South West Garo Hills": [
                "Ampati"
            ],
            "South West Khasi Hills": [
                "Mawkyrwat"
            ],
            "West Garo Hills": [
                "Dadengiri",
                "Rongram",
                "Tura"
            ],
            "West Jaintia Hills": [
                "Jowai",
                "Wahiajer"
            ],
            "West Khasi Hills": [
                "Nongstoin"
            ]
        },
        "Jharkhand": {
            "Garhwa": [
                "Gadhwah"
            ]
        },
        "Assam": {
            "Jorhat": [
                "Jorhat",
                "Mariani"
            ],
            "Kamrup": [
                "Pamohi(Garchuk)"
            ],
            "Lakhimpur": [
                "Golagokarnath",
                "Lakhimpur",
                "Paliakala"
            ],
            "Nalbari": [
                "Nalbari",
                "Dhamdhama",
                "Kumrikata"
            ],
            "Sonitpur": [
                "Dhekiajuli",
                "Bindukuri"
            ]
        },
        "Nagaland": {
            "Kiphire": [
                "Kipheri"
            ],
            "Kohima": [
                "Jalukie",
                "Kohima"
            ],
            "Longleng": [
                "Longleng"
            ],
            "Mokokchung": [
                "Mangkolemba",
                "Mokokchung Town"
            ],
            "Mon": [
                "Naginimora"
            ],
            "Peren": [
                "Tenning"
            ],
            "Phek": [
                "Phek",
                "Pfatsero"
            ],
            "Tuensang": [
                "Tuensang"
            ],
            "Wokha": [
                "Baghty",
                "Wokha Town"
            ],
            "Zunheboto": [
                "Ghathashi",
                "Zunheboto"
            ]
        },
        "Andaman and Nicobar Islands": {
            "Nicobar": [
                "Car Nicobar"
            ]
        },
        "Goa": {
            "North Goa": [
                "Mapusa"
            ]
        }
    },
    "Ragi (Finger Millet)": {
        "Tamil Nadu": {
            "Ariyalur": [
                "Andimadom",
                "Ariyalur Market"
            ],
            "Coimbatore": [
                "Karamadai",
                "Palladam",
                "Pudupalayam",
                "Sevur",
                "Thiruppur"
            ],
            "Cuddalore": [
                "Cuddalore",
                "Kurinchipadi",
                "Panruti",
                "Sethiathoppu",
                "Shrimushnam",
                "Virudhachalam"
            ],
            "Dharmapuri": [
                "Dharampuri"
            ],
            "Erode": [
                "Anthiyur",
                "Bhavani",
                "Boothapadi",
                "Chithode",
                "Dharapuram",
                "Erode"
            ],
            "Krishnagiri": [
                "Krishnagiri"
            ],
            "Namakkal": [
                "Namagiripettai",
                "Namakkal",
                "Rasipuram",
                "Tiruchengode"
            ],
            "Ramanathapuram": [
                "Ramanathapuram(phase 3)"
            ],
            "Salem": [
                "Edappadi",
                "Gangavalli",
                "Kadaiyampatti",
                "Kolathur",
                "Konganapuram",
                "Omalur",
                "Salem",
                "Sankagiri",
                "Thalaivasal",
                "Thammampati",
                "Vazhapadi"
            ],
            "Vellore": [
                "Ammoor",
                "Gudiyatham",
                "Vaniyambadi",
                "Vellore"
            ]
        },
        "Madhya Pradesh": {
            "Ashoknagar": [
                "Ashoknagar"
            ],
            "Betul": [
                "Multai"
            ]
        },
        "Karnataka": {
            "Bangalore": [
                "Bangalore",
                "Doddaballa Pur",
                "Hoskote",
                "Ramanagara"
            ],
            "Bellary": [
                "Bellary",
                "H.B. Halli",
                "Hospet",
                "Kottur"
            ],
            "Chitradurga": [
                "Hiriyur",
                "Holalkere",
                "Hosadurga"
            ],
            "Dharwad": [
                "Dharwar"
            ],
            "Gadag": [
                "Gadag"
            ],
            "Hassan": [
                "Arakalgud",
                "Arasikere",
                "Belur",
                "Channarayapatna",
                "Hassan",
                "Holenarsipura"
            ],
            "Haveri": [
                "Haveri",
                "Hirekerur",
                "Ranebennur"
            ],
            "Kolar": [
                "Bangarpet",
                "Chintamani",
                "Gowribidanoor",
                "Kolar",
                "Malur",
                "Mulabagilu",
                "Srinivasapur"
            ],
            "Koppal": [
                "Gangavathi"
            ],
            "Mandya": [
                "K.R. Pet",
                "Maddur",
                "Nagamangala",
                "Pandavapura"
            ],
            "Mysore": [
                "Hunsur",
                "K.R.Nagar",
                "Mysore (Bandipalya)",
                "Piriya Pattana"
            ],
            "Raichur": [
                "Sindhanur"
            ],
            "Shimoga": [
                "Bhadravathi",
                "Shimoga"
            ],
            "Tumkur": [
                "Gubbi",
                "Huliyar",
                "Kunigal",
                "Madhugiri",
                "Pavagada",
                "Sira",
                "Tumkur"
            ]
        },
        "Kerala": {
            "Ernakulam": [
                "Thrippunithura"
            ],
            "Malappuram": [
                "Manjeri"
            ]
        },
        "Odisha": {
            "Ganjam": [
                "Digapahandi"
            ],
            "Rayagada": [
                "Gunpur",
                "Rayagada(Muniguda)"
            ]
        },
        "Telangana": {
            "Nizamabad": [
                "Nizamabad"
            ]
        },
        "Maharashtra": {
            "Pune": [
                "Pune"
            ],
            "Raigad": [
                "Mangaon"
            ]
        }
    },
    "Safflower": {
        "Maharashtra": {
            "Ahmednagar": [
                "Ahmednagar",
                "Om Chaitanya Multistate Agro Purpose CoOp Society ",
                "Shrirampur"
            ],
            "Akola": [
                "Akola"
            ],
            "Beed": [
                "Beed",
                "Kille Dharur",
                "Majalgaon"
            ],
            "Buldhana": [
                "Chikali",
                "Deoulgaon Raja",
                "Khamgaon",
                "Lonar"
            ],
            "Hingoli": [
                "Hingoli"
            ],
            "Latur": [
                "Aurad Shahajani",
                "Ausa",
                "Devani",
                "Jalkot",
                "Latur",
                "Nilanga",
                "Udgir"
            ],
            "Nanded": [
                "Bhokar",
                "Deglur",
                "Dharmabad",
                "Nanded"
            ],
            "Nandurbar": [
                "Nandurbar"
            ],
            "Nashik": [
                "Lasalgaon(Niphad)"
            ],
            "Parbhani": [
                "Jintur",
                "Pathari"
            ],
            "Pune": [
                "Baramati"
            ]
        },
        "Haryana": {
            "Ambala": [
                "Mullana",
                "Mullana(saha)"
            ],
            "Kurukshetra": [
                "Ladwa"
            ]
        },
        "Karnataka": {
            "Bagalkot": [
                "Bagalakot"
            ],
            "Bellary": [
                "Bellary",
                "Kottur"
            ],
            "Bidar": [
                "Basava Kalayana",
                "Bidar"
            ],
            "Chitradurga": [
                "Chitradurga"
            ],
            "Dharwad": [
                "Hubli (Amaragol)",
                "Kundagol"
            ],
            "Gadag": [
                "Gadag",
                "Laxmeshwar",
                "Nargunda"
            ],
            "Haveri": [
                "Haveri",
                "Ranebennur"
            ],
            "Koppal": [
                "Kustagi"
            ],
            "Raichur": [
                "Raichur",
                "Sindhanur"
            ]
        },
        "Telangana": {
            "Medak": [
                "Sadasivpet",
                "Zaheerabad"
            ]
        },
        "Madhya Pradesh": {
            "Neemuch": [
                "Neemuch"
            ]
        }
    },
    "Sesamum(Sesame,Gingelly,Til)": {
        "Telangana": {
            "Adilabad": [
                "Bhainsa"
            ],
            "Karimnagar": [
                "Jagtial",
                "Karimnagar"
            ],
            "Medak": [
                "Zaheerabad"
            ],
            "Nalgonda": [
                "Tirumalagiri"
            ],
            "Nizamabad": [
                "Nizamabad"
            ],
            "Warangal": [
                "Warangal"
            ]
        },
        "Gujarat": {
            "Ahmedabad": [
                "Viramgam"
            ],
            "Amreli": [
                "Amreli",
                "Babra",
                "Bagasara",
                "Dhari",
                "Khambha",
                "Rajula",
                "Savarkundla"
            ],
            "Bhavnagar": [
                "Bhavnagar",
                "Mahuva(Station Road)",
                "Palitana",
                "Taleja"
            ],
            "Botad": [
                "Botad"
            ],
            "Dahod": [
                "Dahod"
            ],
            "Gandhinagar": [
                "Kalol"
            ],
            "Gir Somnath": [
                "Kodinar",
                "Veraval",
                "Una"
            ],
            "Jamnagar": [
                "Dhrol",
                "Jam Jodhpur",
                "Jamnagar",
                "Kalawad"
            ],
            "Mehsana": [
                "Kadi",
                "Unjha",
                "Visnagar"
            ],
            "Morbi": [
                "Halvad",
                "Morbi",
                "Vankaner"
            ],
            "Patan": [
                "Patan",
                "Sami",
                "Siddhpur"
            ],
            "Porbandar": [
                "Porbandar",
                "Kutiyana"
            ],
            "Rajkot": [
                "Dhoraji",
                "Gondal",
                "Jasdan",
                "Jetpur(Dist.Rajkot)",
                "Rajkot",
                "Upleta"
            ],
            "Sabarkantha": [
                "Himatnagar",
                "Talod"
            ],
            "Surat": [
                "Mandvi",
                "Songadh"
            ],
            "Surendranagar": [
                "Dasada Patadi",
                "Dhragradhra",
                "Lakhtar"
            ]
        },
        "Maharashtra": {
            "Ahmednagar": [
                "Ahmednagar",
                "Om Chaitanya Multistate Agro Purpose CoOp Society ",
                "Rahuri(Vambori)"
            ],
            "Akola": [
                "Akola",
                "Balapur"
            ],
            "Beed": [
                "Gevrai",
                "Kille Dharur",
                "Majalgaon"
            ],
            "Buldhana": [
                "Khamgaon",
                "Malkapur",
                "Shegaon",
                "Deoulgaon Raja"
            ],
            "Dhule": [
                "Shirpur",
                "Dhule",
                "Sakri"
            ],
            "Hingoli": [
                "Hingoli"
            ],
            "Latur": [
                "Ahmedpur"
            ],
            "Nagpur": [
                "Nagpur"
            ],
            "Nanded": [
                "Bhokar",
                "Dharmabad",
                "Nanded",
                "Loha"
            ],
            "Nandurbar": [
                "Nandurbar"
            ],
            "Nashik": [
                "Lasalgaon",
                "Lasalgaon(Niphad)",
                "Malegaon"
            ],
            "Parbhani": [
                "Pathari"
            ],
            "Pune": [
                "Indapur(Bhigwan)"
            ],
            "Thane": [
                "Kalyan"
            ],
            "Wardha": [
                "Hinganghat",
                "Sindi(Selu)",
                "Wardha"
            ],
            "Yavatmal": [
                "Aarni",
                "Cottoncity Agro Foods Private Ltd",
                "Digras",
                "Babhulgaon",
                "Pusad",
                "Shekari Krushi Khajgi Bazar",
                "Yeotmal",
                "Kisan Market Yard"
            ]
        },
        "Rajasthan": {
            "Ajmer": [
                "Madanganj Kishangarh"
            ],
            "Alwar": [
                "Alwar",
                "Barodamev",
                "Kherli",
                "Laxmangarh (Barodamev)"
            ],
            "Baran": [
                "Baran",
                "Kawai Salpura (Atru)",
                "Anta",
                "Samraniyan",
                "Atru",
                "Nahargarh"
            ],
            "Barmer": [
                "Barmer"
            ],
            "Bharatpur": [
                "Bayana"
            ],
            "Bikaner": [
                "Bikaner (Grain)",
                "Nokha"
            ],
            "Bundi": [
                "Bundi",
                "Keshoraipatan",
                "Sumerganj"
            ],
            "Churu": [
                "Sardar Shahar",
                "Sujangarh"
            ],
            "Dausa": [
                "Bandikui",
                "Bandikui(Geejgarh)",
                "Dausa",
                "Lalsot",
                "Madanganj Mahuwa",
                "Madanganj Mandawar",
                "Mandawari"
            ],
            "Hanumangarh": [
                "Goluwala",
                "Nohar",
                "Rawatsar",
                "Sangriya",
                "Hanumangarh Town"
            ],
            "Jhalawar": [
                "Khanpur"
            ],
            "Jhunjhunu": [
                "Nawalgarh"
            ],
            "Jodhpur": [
                "Bhagat Ki Kothi",
                "Jodhpur (Grain)"
            ],
            "Karauli": [
                "Hindoun"
            ],
            "Kota": [
                "Itawa",
                "Kota"
            ],
            "Nagaur": [
                "Nagaur"
            ],
            "Pali": [
                "Sumerpur",
                "Rani"
            ],
            "Tonk": [
                "Deoli",
                "Dooni",
                "Malpura",
                "Niwai",
                "Tonk",
                "Malpura(Todaraisingh)"
            ]
        },
        "Uttar Pradesh": {
            "Amethi": [
                "Sultanpur"
            ],
            "Balrampur": [
                "Ramanujganj"
            ],
            "Banda": [
                "Banda"
            ],
            "Etah": [
                "Etah"
            ],
            "Fatehpur": [
                "Khaga",
                "Kishunpur"
            ],
            "Firozabad": [
                "Shikohabad",
                "Sirsaganj"
            ],
            "Jhansi": [
                "Chirgaon",
                "Jhansi",
                "Mauranipur"
            ],
            "Lalitpur": [
                "Lalitpur"
            ],
            "Mahoba": [
                "Charkhari",
                "Mahoba"
            ],
            "Prayagraj": [
                "Allahabad"
            ]
        },
        "Tamil Nadu": {
            "Ariyalur": [
                "Andimadom",
                "Jayamkondam"
            ],
            "Cuddalore": [
                "Kurinchipadi",
                "Panruti",
                "Tittakudi",
                "Virudhachalam",
                "Bhuvanagiri",
                "Chidambaram",
                "Sethiathoppu"
            ],
            "Erode": [
                "Anthiyur",
                "Avalpoonthurai",
                "Boothapadi",
                "Kodumudi",
                "Mylampadi",
                "Muthur",
                "Sivagiri",
                "Erode",
                "Maylampadi"
            ],
            "Karur": [
                "Karur"
            ],
            "Namakkal": [
                "Tiruchengode"
            ],
            "Pudukkottai": [
                "Alangudi"
            ],
            "Salem": [
                "Attur",
                "Gangavalli"
            ],
            "Thanjavur": [
                "Papanasam"
            ],
            "Theni": [
                "Theni"
            ],
            "Vellore": [
                "Ammoor",
                "Vellore",
                "Katpadi"
            ],
            "Virudhunagar": [
                "Virudhunagar"
            ]
        },
        "Madhya Pradesh": {
            "Ashoknagar": [
                "Ashoknagar"
            ],
            "Bhind": [
                "Alampur",
                "Gohad",
                "Lahar",
                "Bhind",
                "Mow",
                "Mehgaon"
            ],
            "Bhopal": [
                "Bhopal"
            ],
            "Chhatarpur": [
                "Badamalhera",
                "Bijawar",
                "Chhatarpur",
                "LavKush Nagar(Laundi)",
                "Naugaon",
                "Rajnagar",
                "Harpalpur"
            ],
            "Damoh": [
                "Damoh",
                "Javera"
            ],
            "Datia": [
                "Bhander",
                "Datia",
                "Sevda"
            ],
            "Dewas": [
                "Dewas",
                "Bagli"
            ],
            "Dhar": [
                "Dhar"
            ],
            "Guna": [
                "Guna"
            ],
            "Gwalior": [
                "Lashkar",
                "Dabra"
            ],
            "Hoshangabad": [
                "Banapura",
                "Itarsi"
            ],
            "Indore": [
                "Indore"
            ],
            "Jabalpur": [
                "Jabalpur"
            ],
            "Katni": [
                "Katni"
            ],
            "Mandla": [
                "Mandla",
                "Bichhiya"
            ],
            "Mandsaur": [
                "Daloda",
                "Mandsaur"
            ],
            "Morena": [
                "Kailaras",
                "Morena",
                "Sabalgarh",
                "Banmorkalan"
            ],
            "Neemuch": [
                "Javad",
                "Neemuch",
                "Manasa"
            ],
            "Panna": [
                "Ajaygarh",
                "Panna",
                "Devandranagar",
                "Simariya"
            ],
            "Rajgarh": [
                "Jeerapur"
            ],
            "Ratlam": [
                "Jaora"
            ],
            "Rewa": [
                "Hanumana",
                "Chaakghat"
            ],
            "Sagar": [
                "Shahagarh"
            ],
            "Satna": [
                "Mehar",
                "Nagod",
                "Satna"
            ],
            "Seoni": [
                "Ghansour"
            ],
            "Shajapur": [
                "Agar",
                "Shajapur",
                "Shujalpur"
            ],
            "Sheopur": [
                "Sheopurbadod",
                "Sheopurkalan",
                "Vijaypur"
            ],
            "Shivpuri": [
                "Kolaras",
                "Pohari",
                "Barad",
                "Pichhour"
            ],
            "Sidhi": [
                "Sidhi"
            ],
            "Tikamgarh": [
                "Jatara",
                "Niwadi",
                "Tikamgarh",
                "Palera",
                "Prithvipur",
                "Khargapur",
                "Tikamgarh(F&V)"
            ],
            "Ujjain": [
                "Ujjain"
            ],
            "Vidisha": [
                "Lateri",
                "Sironj"
            ]
        },
        "Karnataka": {
            "Bangalore": [
                "Bangalore",
                "Ramanagara"
            ],
            "Bellary": [
                "Kottur"
            ],
            "Bidar": [
                "Basava Kalayana"
            ],
            "Chitradurga": [
                "Chitradurga"
            ],
            "Dharwad": [
                "Hubli (Amaragol)"
            ],
            "Gadag": [
                "Laxmeshwar"
            ],
            "Hassan": [
                "Arasikere"
            ],
            "Koppal": [
                "Kustagi",
                "Koppal"
            ],
            "Mandya": [
                "Nagamangala",
                "Pandavapura",
                "K.R. Pet"
            ],
            "Raichur": [
                "Lingasugur"
            ]
        },
        "Andhra Pradesh": {
            "East Godavari": [
                "Tuni"
            ]
        },
        "Himachal Pradesh": {
            "Hamirpur": [
                "Bharuasumerpur",
                "Kurara",
                "Muskara",
                "Raath",
                "Maudaha"
            ]
        },
        "West Bengal": {
            "Purba Bardhaman": [
                "Guskara",
                "Katwa"
            ]
        }
    },
    "Soyabean": {
        "Telangana": {
            "Adilabad": [
                "Bhainsa",
                "Boath",
                "Jainath",
                "Indravelly(Utnoor)"
            ],
            "Karimnagar": [
                "Jagtial"
            ],
            "Medak": [
                "Zaheerabad",
                "Sadasivpet"
            ],
            "Nizamabad": [
                "Banswada",
                "Bichkunda",
                "Nizamabad",
                "Pitlam",
                "Madnoor"
            ],
            "Warangal": [
                "Warangal"
            ]
        },
        "Maharashtra": {
            "Ahmednagar": [
                "Ahmednagar",
                "Akole",
                "Jamkhed",
                "Kopargaon",
                "Newasa",
                "Om Chaitanya Multistate Agro Purpose CoOp Society ",
                "Rahata",
                "Rahuri(Vambori)",
                "Shevgaon",
                "Shrirampur",
                "Shrirampur(Belapur)",
                "Shrigonda",
                "Sangamner",
                "Shrigonda(Gogargaon)",
                "Rahuri",
                "Karjat",
                "Shevgaon(Bodhegaon)"
            ],
            "Akola": [
                "Akola",
                "Akot",
                "Balapur",
                "Barshi Takli",
                "Murtizapur",
                "Patur",
                "Telhara"
            ],
            "Beed": [
                "Ambejaogai",
                "Beed",
                "Gevrai",
                "Kaij",
                "Kille Dharur",
                "Majalgaon",
                "Parali Vaijyanath",
                "Vadvani",
                "Kada",
                "Patoda"
            ],
            "Bhandara": [
                "Bhandara",
                "Lakhandur",
                "Tumsar",
                "Pavani"
            ],
            "Buldhana": [
                "Buldhana",
                "Buldhana(Dhad)",
                "BSK Krishi Bazar Private Ltd",
                "Chikali",
                "Deoulgaon Raja",
                "Jalgaon Jamod(Aasalgaon)",
                "Jaykissan Krushi Uttpan Khajgi Bazar ",
                "Khamgaon",
                "Lonar",
                "Malkapur",
                "Mehekar",
                "Nandura",
                "Shegaon",
                "Sindkhed Raja",
                "Maharaja Agresen Private Krushi Utappan Bazar Sama",
                "Motala",
                "Sangrampur(Varvatbakal)"
            ],
            "Chandrapur": [
                "Bhadrawati",
                "Chandrapur",
                "Chimur",
                "Rajura",
                "Varora",
                "Korpana"
            ],
            "Dhule": [
                "Dhule",
                "Shirpur",
                "Sakri"
            ],
            "Hingoli": [
                "Akhadabalapur",
                "Basmat",
                "Gajanan Krushi Utpanna Bazar (India) Pvt Ltd ",
                "Hingoli",
                "Hingoli(Kanegoan Naka)",
                "Jawala-Bajar",
                "Kalamnuri",
                "Sant Namdev Krushi Bazar, ",
                "Sengoan",
                "Vitthal Krushi Utpanna Bazar ",
                "Marathawada Shetkari Khajgi Bazar Parisar"
            ],
            "Latur": [
                "Ahmedpur",
                "Aurad Shahajani",
                "Ausa",
                "Chakur",
                "Devani",
                "Jalkot",
                "Latur",
                "Latur(Murud)",
                "Nilanga",
                "Udgir",
                "Rangrao Patil Krushi Utpanna Khajgi Bazar "
            ],
            "Nagpur": [
                "Bhiwapur",
                "Kalmeshwar",
                "Katol",
                "Mandhal",
                "MS Kalpana Agri Commodities Marketing",
                "Nagpur",
                "Savner",
                "Umared",
                "Mauda",
                "Ramtek",
                "Narkhed",
                "Parshiwani"
            ],
            "Nanded": [
                "Bhokar",
                "Dharmabad",
                "Hadgaon",
                "Kandhar",
                "Kinwat",
                "Loha",
                "Mudkhed",
                "Mukhed",
                "Naigaon",
                "Nanded",
                "Hadgaon(Tamsa)",
                "Umari",
                "Himalyatnagar"
            ],
            "Nandurbar": [
                "Nandurbar",
                "Shahada",
                "Navapur",
                "Taloda"
            ],
            "Nashik": [
                "Dindori",
                "Lasalgaon",
                "Lasalgaon(Niphad)",
                "Lasalgaon(Vinchur)",
                "Malegaon",
                "Manmad",
                "Mankamneshwar Farmar Producer CoLtd Sanchalit Mank",
                "Nandgaon",
                "Sinner",
                "Yeola",
                "Chandvad",
                "Kalvan",
                "Shivsiddha Govind Producer Company Limited Sanchal",
                "Shree Rameshwar Krushi Market "
            ],
            "Parbhani": [
                "Bori",
                "Gangakhed",
                "Jintur",
                "Manwat",
                "Palam",
                "Parbhani",
                "Pathari",
                "Selu",
                "Shree Salasar Krushi Bazar ",
                "Sonpeth",
                "Tadkalas",
                "Purna"
            ],
            "Pune": [
                "Baramati",
                "Indapur",
                "Indapur(Bhigwan)",
                "Shirur",
                "Nira(Saswad)",
                "Indapur(Nimgaon Ketki)"
            ],
            "Raigad": [
                "Karjat(Raigad)"
            ],
            "Sangli": [
                "Palus",
                "Sangli",
                "Tasgaon"
            ],
            "Satara": [
                "Vaduj",
                "Koregaon"
            ],
            "Wardha": [
                "Arvi",
                "Ashti",
                "Ashti(Karanja)",
                "Hinganghat",
                "Pulgaon",
                "Samudrapur",
                "Sindi",
                "Sindi(Selu)",
                "Wardha"
            ],
            "Yavatmal": [
                "Aarni",
                "Babhulgaon",
                "Digras",
                "Cottoncity Agro Foods Private Ltd",
                "Kalamb",
                "Kisan Market Yard",
                "Mahesh Krushi Utpanna Bazar, Digras",
                "Ner Parasopant",
                "Pandhakawada",
                "Pusad",
                "Ramdev Krushi Bazaar",
                "Shekari Krushi Khajgi Bazar",
                "Umarked(Danki)",
                "Umarkhed",
                "Vani",
                "Yeotmal",
                "ZariZamini",
                "Mahavira Agricare",
                "Bori Arab",
                "Ghatanji",
                "Darwha",
                "Mahagaon",
                "Ralegaon"
            ]
        },
        "Madhya Pradesh": {
            "Alirajpur": [
                "Alirajpur",
                "Jobat",
                "Jobat(F&V)"
            ],
            "Ashoknagar": [
                "Ashoknagar",
                "Chanderi",
                "Isagarh",
                "Mungawali",
                "Shadora",
                "Piprai"
            ],
            "Betul": [
                "Betul",
                "Bhensdehi",
                "Multai"
            ],
            "Bhopal": [
                "Berasia",
                "Bhopal"
            ],
            "Burhanpur": [
                "Burhanpur"
            ],
            "Chhatarpur": [
                "Badamalhera",
                "Bijawar",
                "Chhatarpur",
                "Rajnagar",
                "Naugaon"
            ],
            "Chhindwara": [
                "Amarwda",
                "Chaurai",
                "Chhindwara",
                "Pandhurna",
                "Saunsar"
            ],
            "Damoh": [
                "Damoh",
                "Patharia",
                "Hata"
            ],
            "Dewas": [
                "Bagli",
                "Dewas",
                "Haatpipliya",
                "Kannod",
                "Khategaon",
                "Loharda",
                "Sonkatch"
            ],
            "Dhar": [
                "Badnawar",
                "Dhamnod",
                "Dhar",
                "Dhar(F&V)",
                "Gandhwani",
                "Kukshi",
                "Manawar",
                "Rajgarh"
            ],
            "Dindori": [
                "Dindori",
                "Gorakhpur"
            ],
            "Guna": [
                "Aron",
                "Binaganj",
                "Guna",
                "Kumbhraj",
                "Maksudangarh",
                "Raghogarh"
            ],
            "Gwalior": [
                "Dabra",
                "Lashkar"
            ],
            "Hoshangabad": [
                "Banapura",
                "Itarsi",
                "Pipariya",
                "Banapura(F&V)",
                "Bankhedi",
                "Pipariya(F&V)",
                "Semriharchand"
            ],
            "Indore": [
                "Gautampura",
                "Indore",
                "Mhow",
                "Sanwer",
                "Indore(F&V)",
                "Mhow(F&V)"
            ],
            "Jabalpur": [
                "Jabalpur",
                "Paatan",
                "Patan(F&V)",
                "Shahpura Bhitoni (F&V)"
            ],
            "Jhabua": [
                "Jhabua",
                "Petlawad",
                "Thandla",
                "Jhabua(F&V)",
                "Petlawad(F&V)"
            ],
            "Katni": [
                "Katni"
            ],
            "Khandwa": [
                "Harsood",
                "Khandwa",
                "Pandhana",
                "Badwah(F&V)",
                "Mundi"
            ],
            "Khargone": [
                "Badwaha",
                "Bhikangaon",
                "Karhi",
                "Kasrawad",
                "Khargone",
                "Sanawad",
                "Segaon"
            ],
            "Mandla": [
                "Bichhiya",
                "Mandla"
            ],
            "Mandsaur": [
                "Bhanpura",
                "Daloda",
                "Garoth",
                "Mandsaur",
                "Piplya",
                "Sitmau",
                "Suvasra",
                "Shamgarh",
                "Sitamau(F&V)"
            ],
            "Morena": [
                "Banmorkalan",
                "Kailaras",
                "Sabalgarh",
                "Morena"
            ],
            "Narsinghpur": [
                "Gotegaon",
                "Kareli",
                "Narsinghpur",
                "Tendukheda",
                "Gadarwada",
                "Gadarwara(F&V)",
                "Gotegaon(F&V)",
                "Kareli(F&V)"
            ],
            "Neemuch": [
                "Javad",
                "Manasa",
                "Neemuch"
            ],
            "Panna": [
                "Devandranagar",
                "Panna"
            ],
            "Raisen": [
                "Begamganj",
                "Bareli",
                "Gairatganj",
                "Obedullaganj",
                "Raisen",
                "Udaipura",
                "Silvani"
            ],
            "Rajgarh": [
                "Biaora",
                "Chhapiheda",
                "Jeerapur",
                "Khilchipur",
                "Khujner",
                "Kurawar",
                "Machalpur",
                "Narsinghgarh",
                "Pachaur",
                "Sarangpur",
                "Suthalia"
            ],
            "Ratlam": [
                "A lot",
                "Jaora",
                "Ratlam",
                "Sailana",
                "Taal",
                "Alot(F&V)",
                "Sailana(F&V)"
            ],
            "Rewa": [
                "Baikunthpur",
                "Rewa"
            ],
            "Sagar": [
                "Bamora",
                "Banda",
                "Bina",
                "Deori",
                "Garhakota",
                "Jaisinagar",
                "Kesli",
                "Khurai",
                "Malthone",
                "Rahatgarh",
                "Rehli",
                "Sagar",
                "Shahagarh"
            ],
            "Satna": [
                "Nagod",
                "Satna"
            ],
            "Sehore": [
                "Ashta",
                "Ichhawar",
                "Jawar",
                "Nasrullaganj",
                "Sehore",
                "Rehati",
                "Shyampur",
                "Ichhawar(F&V)"
            ],
            "Seoni": [
                "Ghansour",
                "Seoni",
                "Palari"
            ],
            "Shajapur": [
                "Agar",
                "Akodiya",
                "Badod",
                "Berachha",
                "Kalapipal",
                "Maksi",
                "Momanbadodiya",
                "Nalkehda",
                "Shajapur",
                "Shujalpur",
                "Susner",
                "Soyatkalan"
            ],
            "Sheopur": [
                "Sheopurbadod",
                "Sheopurkalan",
                "Vijaypur"
            ],
            "Shivpuri": [
                "Badarwas",
                "Barad",
                "Khatora",
                "Kolaras",
                "Karera",
                "Pohari",
                "Rannod",
                "Shivpuri",
                "Khaniadhana"
            ],
            "Tikamgarh": [
                "Niwadi",
                "Tikamgarh",
                "Jatara",
                "Tikamgarh(F&V)",
                "Prithvipur",
                "Khargapur"
            ],
            "Ujjain": [
                "Badnagar",
                "Khachrod",
                "Mahidpur",
                "Nagda",
                "Tarana",
                "Ujjain",
                "Unhel",
                "Mahidpur(F&V)"
            ],
            "Vidisha": [
                "Ganjbasoda",
                "Kurwai",
                "Lateri",
                "Shamshabad",
                "Sironj",
                "Vidisha",
                "Gulabganj"
            ]
        },
        "Gujarat": {
            "Amreli": [
                "Amreli",
                "Bagasara",
                "Dhari",
                "Rajula",
                "Khambha",
                "Savarkundla"
            ],
            "Anand": [
                "Anand"
            ],
            "Bhavnagar": [
                "Bhavnagar",
                "Palitana"
            ],
            "Dahod": [
                "Dahod",
                "Zalod(Sanjeli)",
                "Zalod(Zalod)"
            ],
            "Gir Somnath": [
                "Kodinar",
                "Veraval",
                "Una"
            ],
            "Jamnagar": [
                "Jam Jodhpur",
                "Jamnagar",
                "Kalawad"
            ],
            "Morbi": [
                "Halvad"
            ],
            "Porbandar": [
                "Porbandar",
                "Kutiyana"
            ],
            "Rajkot": [
                "Dhoraji",
                "Gondal",
                "Jasdan",
                "Jetpur(Dist.Rajkot)",
                "Upleta"
            ],
            "Sabarkantha": [
                "Bhiloda",
                "Dhansura",
                "Himatnagar",
                "Khedbrahma",
                "Modasa(Tintoi)",
                "Modasa",
                "Talod",
                "Idar",
                "Malpur",
                "Vadali",
                "Vijaynagar(Kundlakap)"
            ],
            "Surat": [
                "Mandvi",
                "Songadh",
                "Vyra",
                "Nizar",
                "Uchhal",
                "Nizar(Kukarmuda)",
                "Nizar(Pumkitalov)"
            ],
            "Surendranagar": [
                "Dhragradhra"
            ]
        },
        "Karnataka": {
            "Bagalkot": [
                "Bagalakot"
            ],
            "Bangalore": [
                "Bangalore"
            ],
            "Bidar": [
                "Bhalki",
                "Basava Kalayana",
                "Bidar",
                "Humanabad"
            ],
            "Chitradurga": [
                "Hiriyur"
            ],
            "Dharwad": [
                "Dharwar",
                "Hubli (Amaragol)",
                "Kalagategi",
                "Kundagol"
            ],
            "Gadag": [
                "Gadag",
                "Laxmeshwar",
                "Nargunda"
            ],
            "Haveri": [
                "Haveri",
                "Savanur",
                "Ranebennur",
                "Shiggauv"
            ],
            "Mysore": [
                "Mysore (Bandipalya)"
            ]
        },
        "Rajasthan": {
            "Baran": [
                "Anta",
                "Atru",
                "Baran",
                "Chhabra",
                "Kawai Salpura (Atru)",
                "Chhipabarod (Chhabra)",
                "Nahargarh",
                "Samraniyan"
            ],
            "Bhilwara": [
                "Bijolia",
                "Bhilwara"
            ],
            "Bundi": [
                "Bundi",
                "Dei",
                "Keshoraipatan",
                "Sumerganj"
            ],
            "Chittorgarh": [
                "Barisadri",
                "Nimbahera"
            ],
            "Jhalawar": [
                "Bhawani Mandi",
                "Choumahla",
                "Iklera",
                "Jhalarapatan",
                "Khanpur",
                "Dag",
                "Manohar Thana"
            ],
            "Kota": [
                "Itawa",
                "Kota",
                "Ramganjmandi"
            ],
            "Pratapgarh": [
                "Pratapgarh",
                "Arnod",
                "Chhotisadri"
            ],
            "Tonk": [
                "Deoli",
                "Dooni",
                "Uniyara"
            ],
            "Udaipur": [
                "Fatehnagar",
                "Udaipur (Grain)"
            ]
        },
        "Himachal Pradesh": {
            "Bilaspur": [
                "Pendraroad",
                "Bilaspur",
                "Takhatpur"
            ]
        },
        "Manipur": {
            "Bishnupur": [
                "Bishenpur"
            ],
            "Imphal East": [
                "Lamlong Bazaar"
            ],
            "Imphal West": [
                "Imphal"
            ],
            "Thoubal": [
                "Thoubal"
            ]
        },
        "Nagaland": {
            "Kiphire": [
                "Kipheri"
            ],
            "Zunheboto": [
                "Zunheboto",
                "Ghathashi"
            ]
        },
        "Andhra Pradesh": {
            "Kurnool": [
                "Kurnool"
            ]
        },
        "Uttar Pradesh": {
            "Lalitpur": [
                "Lalitpur",
                "Mehrauni"
            ]
        },
        "Tamil Nadu": {
            "Madurai": [
                "Anaiyur(Uzhavar Sandhai )",
                "Chokkikulam(Uzhavar Sandhai )",
                "Palanganatham(Uzhavar Sandhai )"
            ],
            "Ramanathapuram": [
                "Paramakudi(Uzhavar Sandhai )"
            ],
            "Sivaganga": [
                "Sivagangai (Uzhavar Sandhai )",
                "Karaikudi(Uzhavar Sandhai )"
            ],
            "Theni": [
                "Andipatti(Uzhavar Sandhai )",
                "Chinnamanur(Uzhavar Sandhai )",
                "Bodinayakanur(Uzhavar Sandhai )",
                "Theni(Uzhavar Sandhai )"
            ],
            "Virudhunagar": [
                "Rajapalayam(Uzhavar Sandhai )"
            ]
        }
    },
    "Sugarcane": {
        "Uttar Pradesh": {
            "Balrampur": [
                "Kusmee",
                "Rajpur",
                "Ramanujganj"
            ]
        },
        "Tamil Nadu": {
            "Erode": [
                "Chithode"
            ]
        },
        "Maharashtra": {
            "Nagpur": [
                "Nagpur"
            ]
        },
        "Madhya Pradesh": {
            "Narsinghpur": [
                "Kareli"
            ]
        }
    },
    "Sunflower": {
        "Telangana": {
            "Adilabad": [
                "Bhainsa"
            ],
            "Khammam": [
                "Sattupalli"
            ],
            "Medak": [
                "Sadasivpet",
                "Zaheerabad",
                "Siddipet"
            ],
            "Nizamabad": [
                "Nizamabad"
            ],
            "Warangal": [
                "Warangal"
            ]
        },
        "Maharashtra": {
            "Ahmednagar": [
                "Ahmednagar",
                "Om Chaitanya Multistate Agro Purpose CoOp Society ",
                "Shrirampur",
                "Rahuri(Vambori)",
                "Shrigonda",
                "Karjat",
                "Rahuri"
            ],
            "Akola": [
                "Akola"
            ],
            "Beed": [
                "Beed",
                "Gevrai"
            ],
            "Buldhana": [
                "Jaykissan Krushi Uttpan Khajgi Bazar ",
                "Khamgaon",
                "Deoulgaon Raja"
            ],
            "Dhule": [
                "Dhule",
                "Shirpur"
            ],
            "Hingoli": [
                "Basmat"
            ],
            "Latur": [
                "Ahmedpur",
                "Aurad Shahajani",
                "Ausa"
            ],
            "Nagpur": [
                "Nagpur"
            ],
            "Nanded": [
                "Bhokar",
                "Dharmabad",
                "Nanded",
                "Mudkhed"
            ],
            "Nandurbar": [
                "Nandurbar",
                "Taloda",
                "Shahada"
            ],
            "Nashik": [
                "Lasalgaon",
                "Malegaon",
                "Lasalgaon(Niphad)",
                "Nandgaon",
                "Yeola"
            ],
            "Parbhani": [
                "Manwat"
            ],
            "Pune": [
                "Baramati",
                "Indapur",
                "Indapur(Bhigwan)"
            ],
            "Raigad": [
                "Karjat(Raigad)"
            ],
            "Yavatmal": [
                "Yeotmal"
            ]
        },
        "Haryana": {
            "Ambala": [
                "Barara",
                "Shahzadpur",
                "Ambala Cantt."
            ],
            "Kurukshetra": [
                "Babain",
                "Shahabad",
                "Thanesar"
            ],
            "Panchkula": [
                "Barwala"
            ]
        },
        "Gujarat": {
            "Amreli": [
                "Rajula"
            ],
            "Porbandar": [
                "Porbandar"
            ],
            "Surat": [
                "Songadh"
            ]
        },
        "Madhya Pradesh": {
            "Ashoknagar": [
                "Ashoknagar"
            ],
            "Dhar": [
                "Dhar"
            ],
            "Indore": [
                "Indore",
                "Indore(F&V)"
            ],
            "Neemuch": [
                "Neemuch"
            ],
            "Rajgarh": [
                "Biaora"
            ],
            "Shajapur": [
                "Badod"
            ],
            "Shivpuri": [
                "Badarwas"
            ],
            "Ujjain": [
                "Ujjain"
            ]
        },
        "Karnataka": {
            "Bagalkot": [
                "Bagalakot",
                "Bagalkot(Bilagi)",
                "Badami",
                "Hungund"
            ],
            "Bellary": [
                "Bellary",
                "Kottur"
            ],
            "Bidar": [
                "Bidar",
                "Basava Kalayana"
            ],
            "Chitradurga": [
                "Challakere",
                "Chitradurga",
                "Hiriyur"
            ],
            "Dharwad": [
                "Hubli (Amaragol)"
            ],
            "Gadag": [
                "Gadag",
                "Laxmeshwar",
                "Mundaragi",
                "Nargunda",
                "Rona"
            ],
            "Hassan": [
                "Arasikere",
                "Belur"
            ],
            "Haveri": [
                "Hirekerur",
                "Haveri",
                "Ranebennur"
            ],
            "Koppal": [
                "Gangavathi",
                "Koppal",
                "Kustagi",
                "Yalburga"
            ],
            "Mysore": [
                "Mysore (Bandipalya)"
            ],
            "Raichur": [
                "Lingasugur",
                "Raichur",
                "Sindhanur"
            ],
            "Tumkur": [
                "Pavagada",
                "Sira",
                "Madhugiri"
            ]
        },
        "Tamil Nadu": {
            "Coimbatore": [
                "Udumalpet"
            ],
            "Cuddalore": [
                "Cuddalore"
            ],
            "Erode": [
                "Vellakkoil",
                "Boothapadi"
            ]
        },
        "Andhra Pradesh": {
            "Kurnool": [
                "Adoni",
                "Kurnool"
            ]
        },
        "Punjab": {
            "Patiala": [
                "Rajpura"
            ]
        }
    },
    "Tomato": {
        "Telangana": {
            "Adilabad": [
                "Adilabad(Rythu Bazar)",
                "Jainath",
                "Mancharial",
                "Laxettipet"
            ],
            "Hyderabad": [
                "Bowenpally",
                "Gudimalkapur",
                "Erragadda(Rythu Bazar)",
                "L B Nagar",
                "Mahboob Manison"
            ],
            "Karimnagar": [
                "Karimnagar(Rythu Bazar)",
                "Karimnagar"
            ],
            "Khammam": [
                "Khammam",
                "Pavilion Ground,Khammam,RBZ",
                "Sattupalli (ramalayam),RBZ"
            ],
            "Medak": [
                "Vantamamidi",
                "Sangareddy",
                "Gajwel"
            ],
            "Nalgonda": [
                "Venkateswarnagar",
                "Miryalguda(Rythu Bazar)"
            ],
            "Warangal": [
                "Hanmarkonda(Rythu Bazar)",
                "Warangal"
            ]
        },
        "Uttar Pradesh": {
            "Agra": [
                "Achnera",
                "Agra",
                "Fatehabad",
                "Fatehpur Sikri",
                "Jagnair",
                "Khairagarh",
                "Samsabad"
            ],
            "Aligarh": [
                "Aligarh",
                "Charra",
                "Khair",
                "Atrauli"
            ],
            "Amethi": [
                "Jafarganj",
                "Sultanpur"
            ],
            "Amroha": [
                "Amroha",
                "Dhanaura",
                "Hasanpur"
            ],
            "Auraiya": [
                "Achalda",
                "Auraiya",
                "Dibiapur"
            ],
            "Ayodhya": [
                "Faizabad",
                "Rudauli"
            ],
            "Azamgarh": [
                "Azamgarh"
            ],
            "Badaun": [
                "Badayoun",
                "Bilsi",
                "Shahaswan",
                "Ujhani",
                "Visoli",
                "Wazirganj"
            ],
            "Baghpat": [
                "Bagpat",
                "Baraut",
                "Khekda"
            ],
            "Bahraich": [
                "Bahraich",
                "Naanpara"
            ],
            "Ballia": [
                "Ballia",
                "Chitwadagaon",
                "Rasda",
                "Vilthararoad"
            ],
            "Balrampur": [
                "Balrampur",
                "Panchpedwa",
                "Tulsipur"
            ],
            "Banda": [
                "Atarra",
                "Banda",
                "Baberu"
            ],
            "Barabanki": [
                "Barabanki",
                "Safdarganj"
            ],
            "Bareilly": [
                "Anwala",
                "Bareilly",
                "Bahedi"
            ],
            "Basti": [
                "Basti"
            ],
            "Bijnor": [
                "Bijnaur",
                "Chaandpur",
                "Kiratpur",
                "Nagina",
                "Najibabad"
            ],
            "Chandauli": [
                "Chandoli"
            ],
            "Deoria": [
                "Devariya",
                "Barhaj"
            ],
            "Etah": [
                "Awagarh",
                "Etah"
            ],
            "Etawah": [
                "Bharthna",
                "Etawah",
                "Jasvantnagar"
            ],
            "Fatehpur": [
                "Bindki",
                "Fatehpur",
                "Khaga",
                "Kishunpur",
                "Jahanabad"
            ],
            "Firozabad": [
                "Firozabad",
                "Sirsaganj",
                "Tundla",
                "Shikohabad"
            ],
            "Ghaziabad": [
                "Ghaziabad",
                "Hapur",
                "Muradnagar",
                "Noida"
            ],
            "Ghazipur": [
                "Gazipur",
                "Jangipura",
                "Yusufpur",
                "Jamanian"
            ],
            "Gonda": [
                "Gonda",
                "Karnailganj",
                "Nawabganj"
            ],
            "Gorakhpur": [
                "Chorichora",
                "Gorakhpur",
                "Sehjanwa"
            ],
            "Hardoi": [
                "Hardoi",
                "Madhoganj",
                "Sandi",
                "Sandila",
                "Shahabad(New Mandi)"
            ],
            "Hathras": [
                "Haathras",
                "Shadabad",
                "Sikandraraau"
            ],
            "Jaunpur": [
                "Jaunpur",
                "Mugrabaadshahpur",
                "Shahganj"
            ],
            "Jhansi": [
                "Chirgaon",
                "Gurusarai",
                "Jhansi",
                "Mauranipur",
                "Moth"
            ],
            "Kanpur Dehat": [
                "Pukharayan",
                "Jhijhank",
                "Rura"
            ],
            "Kasganj": [
                "Kasganj"
            ],
            "Kaushambi": [
                "Bharwari",
                "Manjhanpur"
            ],
            "Kushinagar": [
                "Tamkuhi road"
            ],
            "Lalitpur": [
                "Lalitpur"
            ],
            "Lucknow": [
                "Lucknow"
            ],
            "Maharajganj": [
                "Anandnagar",
                "Gadaura",
                "Nautnava",
                "Partaval"
            ],
            "Mahoba": [
                "Mahoba"
            ],
            "Mainpuri": [
                "Ghiraur",
                "Mainpuri"
            ],
            "Mathura": [
                "Kosikalan",
                "Mathura"
            ],
            "Meerut": [
                "Meerut",
                "Sardhana",
                "Mawana"
            ],
            "Mirzapur": [
                "Ahirora",
                "Mirzapur"
            ],
            "Muzaffarnagar": [
                "Khatauli",
                "Muzzafarnagar",
                "Shahpur"
            ],
            "Prayagraj": [
                "Ajuha",
                "Allahabad",
                "Jasra",
                "Sirsa"
            ],
            "Rampur": [
                "Milak",
                "Rampur",
                "Tanda(Rampur)"
            ],
            "Saharanpur": [
                "Chutmalpur",
                "Deoband",
                "Rampurmaniharan",
                "Saharanpur",
                "Gangoh"
            ],
            "Sambhal": [
                "Chandausi",
                "Muradabad",
                "Sambhal"
            ],
            "Sant Kabir Nagar": [
                "Khalilabad"
            ],
            "Shahjahanpur": [
                "Jalalabad",
                "Puwaha",
                "Shahjahanpur",
                "Tilhar"
            ],
            "Shamli": [
                "Kairana",
                "Khandhla",
                "Shamli",
                "Thanabhavan"
            ],
            "Shravasti": [
                "Bhinga",
                "Payagpur"
            ],
            "Sitapur": [
                "Mehmoodabad",
                "Sitapur",
                "Viswan"
            ],
            "Sonbhadra": [
                "Dudhi",
                "Robertsganj"
            ],
            "Unnao": [
                "Bangarmau",
                "Purwa",
                "Unnao"
            ],
            "Varanasi": [
                "Varanasi",
                "Varanasi(F&V)"
            ]
        },
        "Gujarat": {
            "Ahmedabad": [
                "Ahmedabad"
            ],
            "Amreli": [
                "Damnagar",
                "Dhari"
            ],
            "Anand": [
                "Anand(Veg,Yard,Anand)",
                "Khambhat(Veg Yard Khambhat)"
            ],
            "Bharuch": [
                "Ankleshwar",
                "Bharuch"
            ],
            "Bhavnagar": [
                "Palitana",
                "Bhavnagar"
            ],
            "Dahod": [
                "Dahod(Veg. Market)"
            ],
            "Gandhinagar": [
                "Kalol(Veg,Market,Kalol)",
                "Mansa(Manas Veg Yard)"
            ],
            "Gir Somnath": [
                "Talalagir"
            ],
            "Kheda": [
                "Kapadvanj",
                "Nadiad",
                "Nadiyad(Chaklasi)",
                "Nadiyad(Piplag)"
            ],
            "Mehsana": [
                "Mehsana(Mehsana Veg)",
                "Vijapur(veg)",
                "Visnagar"
            ],
            "Morbi": [
                "Morbi",
                "Vankaner(Sub yard)"
            ],
            "Navsari": [
                "Bilimora",
                "Navsari"
            ],
            "Patan": [
                "Patan(Veg,Yard Patan)"
            ],
            "Porbandar": [
                "Porbandar"
            ],
            "Rajkot": [
                "Gondal(Veg.market Gondal)",
                "Rajkot(Veg.Sub Yard)"
            ],
            "Surat": [
                "Surat"
            ],
            "Surendranagar": [
                "Vadhvan"
            ]
        },
        "Maharashtra": {
            "Ahmednagar": [
                "Ahmednagar",
                "Rahata",
                "Rahuri",
                "Rahuri(Songaon)",
                "Sangamner",
                "Shrirampur",
                "Akole"
            ],
            "Chandrapur": [
                "Chandrapur(Ganjwad)",
                "Chandrapur"
            ],
            "Kolhapur": [
                "Kolhapur",
                "Vadgaonpeth",
                "Kolhapur(Malkapur)"
            ],
            "Nagpur": [
                "Hingna",
                "Kalmeshwar",
                "Kamthi",
                "Nagpur",
                "Parshiwani",
                "Ramtek"
            ],
            "Nandurbar": [
                "Navapur"
            ],
            "Nashik": [
                "Dindori",
                "Ghoti",
                "Nasik",
                "Pimpalgaon",
                "Shree Rameshwar Krushi Market ",
                "Chandvad",
                "Sinner"
            ],
            "Pune": [
                "Junnar(Narayangaon)",
                "Khed(Chakan)",
                "Junnar(Otur)",
                "Manchar",
                "Pune",
                "Pune(Khadiki)",
                "Pune(Manjri)",
                "Pune(Moshi)",
                "Pune(Pimpri)"
            ],
            "Raigad": [
                "Panvel",
                "Pen"
            ],
            "Ratnagiri": [
                "Ratnagiri (Nachane)"
            ],
            "Sangli": [
                "Islampur",
                "Palus",
                "Vita"
            ],
            "Satara": [
                "Karad",
                "Patan",
                "Phaltan",
                "Satara",
                "Vai"
            ],
            "Thane": [
                "Kalyan",
                "Murbad"
            ]
        },
        "Rajasthan": {
            "Ajmer": [
                "Ajmer(F&V)",
                "Madanganj Kishangarh"
            ],
            "Alwar": [
                "Alwar (F&V)"
            ],
            "Baran": [
                "Baran"
            ],
            "Bharatpur": [
                "Bayana",
                "Bharatpur",
                "Nadwai"
            ],
            "Bhilwara": [
                "Bhilwara"
            ],
            "Bikaner": [
                "Bikaner (F&V)"
            ],
            "Chittorgarh": [
                "Nimbahera",
                "Chittorgarh"
            ],
            "Churu": [
                "Churu",
                "Sujangarh"
            ],
            "Dungarpur": [
                "Dungarpur"
            ],
            "Hanumangarh": [
                "Bhadara",
                "Goluwala",
                "Hanumangarh Town",
                "Hanumangarh(Urlivas)",
                "Nohar",
                "Rawatsar",
                "Hanumangarh"
            ],
            "Jaipur": [
                "Jaipur (F&V)"
            ],
            "Jalore": [
                "Bhinmal",
                "Jalore"
            ],
            "Jhunjhunu": [
                "Jhunjhunu"
            ],
            "Jodhpur": [
                "Jodhpur(F&V)(Paota)"
            ],
            "Kota": [
                "Kota (F&V)"
            ],
            "Nagaur": [
                "Nagour(FV)"
            ],
            "Pali": [
                "Pali",
                "Sojat City",
                "Sojat Road"
            ],
            "Pratapgarh": [
                "Pratapgarh"
            ],
            "Rajsamand": [
                "Rajsamand"
            ],
            "Sikar": [
                "Sikar"
            ],
            "Sirohi": [
                "Abu Road"
            ],
            "Tonk": [
                "Tonk"
            ],
            "Udaipur": [
                "Udaipur (F&V)"
            ]
        },
        "Kerala": {
            "Alappuzha": [
                "Aroor",
                "Chengannur",
                "Cherthala",
                "Kayamkulam",
                "Madhavapuram",
                "Mannar",
                "Alappuzha",
                "Harippad"
            ],
            "Ernakulam": [
                "Aluva",
                "Angamaly",
                "Broadway market",
                "Ernakulam",
                "Kothamangalam",
                "North Paravur",
                "Perumbavoor",
                "Piravam",
                "Thrippunithura",
                "Moovattupuzha"
            ],
            "Idukki": [
                "Adimali",
                "Kattappana",
                "Munnar",
                "Thodupuzha",
                "Vandiperiyar",
                "Nedumkandam"
            ],
            "Kottayam": [
                "Athirampuzha",
                "Ettumanoor",
                "Kanjirappally",
                "Kottayam",
                "Kuruppanthura",
                "Pala",
                "Pampady",
                "Thalayolaparambu"
            ],
            "Malappuram": [
                "Kondotty",
                "Kottakkal",
                "Manjeri",
                "Parappanangadi",
                "Perinthalmanna",
                "Thirurrangadi",
                "Parappanangadi VFPCK"
            ],
            "Thiruvananthapuram": [
                "Aralamoodu",
                "Attingal",
                "Balarampuram",
                "Chala",
                "Neyyatinkara",
                "Parassala",
                "Pothencode",
                "Vamanapuram",
                "Nedumangadu",
                "Neyyattinkara VFPCK"
            ],
            "Wayanad": [
                "Sulthanbathery VFPCK",
                "Manathavady"
            ]
        },
        "West Bengal": {
            "Alipurduar": [
                "Alipurduar",
                "Falakata"
            ],
            "Bankura": [
                "Khatra"
            ],
            "Birbhum": [
                "Birbhum",
                "Bolpur",
                "Sainthia"
            ],
            "Dakshin Dinajpur": [
                "Balurghat",
                "Gangarampur(Dakshin Dinajpur)"
            ],
            "Darjeeling": [
                "Darjeeling",
                "Karsiyang(Matigara)",
                "Siliguri"
            ],
            "Hooghly": [
                "Champadanga",
                "Kalipur",
                "Pandua",
                "Sheoraphuly"
            ],
            "Howrah": [
                "Ramkrishanpur(Howrah)",
                "Uluberia"
            ],
            "Jalpaiguri": [
                "Belacoba",
                "Dhupguri",
                "Jalpaiguri Sadar",
                "Moynaguri"
            ],
            "Kolkata": [
                "Sealdah Koley Market"
            ],
            "Malda": [
                "Gajol",
                "English Bazar"
            ],
            "Nadia": [
                "Chakdah",
                "Ranaghat"
            ],
            "North 24 Parganas": [
                "Barasat",
                "Habra"
            ],
            "Paschim Bardhaman": [
                "Asansol",
                "Durgapur"
            ],
            "Purba Bardhaman": [
                "Burdwan",
                "Kalna",
                "Memari"
            ]
        },
        "Madhya Pradesh": {
            "Alirajpur": [
                "Alirajpur(F&V)"
            ],
            "Betul": [
                "Multai"
            ],
            "Bhopal": [
                "Bhopal(F&V)"
            ],
            "Chhatarpur": [
                "Chattarpur(F&V)"
            ],
            "Chhindwara": [
                "Chindwara(F&V)",
                "Chhindwara(F&V)"
            ],
            "Damoh": [
                "Damoh(F&V)"
            ],
            "Dewas": [
                "Dewas(F&V)",
                "Haatpipliya"
            ],
            "Dhar": [
                "Dhamnod(F&V)",
                "Manawar(F&V)",
                "Rajgarh(F&V)",
                "Dhamnod",
                "Dhar(F&V)",
                "Kukshi",
                "Manawar",
                "Rajgarh"
            ],
            "Guna": [
                "Guna(F&V)"
            ],
            "Gwalior": [
                "Lashkar",
                "Lashkar(F&V)"
            ],
            "Hoshangabad": [
                "Hoshangabad(F&V)",
                "Itarsi(F&V)",
                "Pipariya(F&V)",
                "Hoshangabad",
                "Itarsi",
                "Pipariya"
            ],
            "Indore": [
                "Mhow(F&V)",
                "Indore(F&V)",
                "Mhow",
                "Sanwer"
            ],
            "Jabalpur": [
                "Patan(F&V)",
                "Sehora",
                "Jabalpur(F&V)",
                "Sihora(F&V)"
            ],
            "Jhabua": [
                "Petlawad(F&V)",
                "Petlawad",
                "Thandla"
            ],
            "Katni": [
                "Katni(F&V)"
            ],
            "Khandwa": [
                "Badwah(F&V)",
                "Sanawad(F&V)",
                "Khandwa(F&V)",
                "Pandhana(F&V)"
            ],
            "Khargone": [
                "Badwaha",
                "Khargone",
                "Sanawad"
            ],
            "Mandsaur": [
                "Sitamau(F&V)",
                "Mandsaur(F&V)",
                "Shamgarh(F&V)",
                "Garoth"
            ],
            "Morena": [
                "Morena",
                "Porsa",
                "Sabalgarh(F&V)",
                "Morena(F&V)",
                "Porsa(F&V)",
                "Sabalgarh"
            ],
            "Raisen": [
                "Bareli(F&V)"
            ],
            "Rajgarh": [
                "Sarangpur(F&V)",
                "Biaora",
                "Narsinghgarh",
                "Sarangpur"
            ],
            "Ratlam": [
                "Jawra(F&V)"
            ],
            "Rewa": [
                "Rewa(F&V)"
            ],
            "Sagar": [
                "Khurai(F&V)",
                "Garhakota",
                "Deori",
                "Sagar(F&V)"
            ],
            "Satna": [
                "Mehar"
            ],
            "Sehore": [
                "Sehore(F&V)",
                "Sehore"
            ],
            "Seoni": [
                "Seoni"
            ],
            "Sheopur": [
                "Sheopurkalan(F&V)",
                "Syopurkalan(F&V)"
            ],
            "Shivpuri": [
                "Barad",
                "Kolaras(F&V)",
                "Shivpuri",
                "Shivpuri(F&V)"
            ],
            "Ujjain": [
                "Ujjain(F&V)"
            ]
        },
        "Haryana": {
            "Ambala": [
                "Ambala Cantt.",
                "Ambala City(Subji Mandi)",
                "Barara",
                "Naraingarh",
                "Shahzadpur"
            ],
            "Bhiwani": [
                "Ch. Dadri",
                "Loharu",
                "Bhiwani"
            ],
            "Faridabad": [
                "Ballabhgarh",
                "Faridabad",
                "New Grain Market , Faridabad"
            ],
            "Fatehabad": [
                "Fatehabad",
                "Jakhal",
                "Ratia",
                "Tohana(New Veg Market)",
                "Dharsul",
                "Tohana",
                "Bhuna"
            ],
            "Jind": [
                "Jind",
                "Narwana",
                "Safidon",
                "Jullana"
            ],
            "Kaithal": [
                "Dhand",
                "Pundri",
                "Siwan",
                "Cheeka",
                "Kaithal"
            ],
            "Karnal": [
                "Gharaunda",
                "New Grain Market(main), Karnal",
                "Tarori",
                "Indri"
            ],
            "Kurukshetra": [
                "Ladwa",
                "Pehowa",
                "Shahabad",
                "Thanesar",
                "Iamailabad"
            ],
            "Palwal": [
                "Hodal",
                "Palwal",
                "Hassanpur"
            ],
            "Panchkula": [
                "Barwala",
                "New Grain Market , Panchkula",
                "Raipur Rai",
                "Panchkul(Kalka)"
            ],
            "Panipat": [
                "Madlauda",
                "Panipat",
                "Samalkha"
            ],
            "Rewari": [
                "Kosli",
                "Rewari"
            ],
            "Rohtak": [
                "Meham",
                "Rohtak",
                "Sampla"
            ],
            "Sirsa": [
                "kalanwali",
                "Dabwali",
                "Rania",
                "Sirsa",
                "Rania(Jiwan nagar)",
                "Ellanabad"
            ],
            "Sonipat": [
                "Ganaur",
                "Gohana",
                "Sonepat",
                "Sonepat(Kharkhoda)"
            ]
        },
        "Punjab": {
            "Amritsar": [
                "Amritsar(Amritsar Mewa Mandi)",
                "Rayya",
                "Mehta",
                "Ajnala",
                "Gehri(Jandiala mandi)"
            ],
            "Barnala": [
                "Barnala"
            ],
            "Faridkot": [
                "Faridkot",
                "Jaitu",
                "Kotkapura"
            ],
            "Fazilka": [
                "Abohar",
                "Fazilka",
                "Jalalabad"
            ],
            "Gurdaspur": [
                "Batala",
                "Dinanagar",
                "F.G.Churian",
                "Gurdaspur",
                "Dera Baba Nanak",
                "Quadian",
                "Kalanaur",
                "Dhariwal"
            ],
            "Hoshiarpur": [
                "Dasuya",
                "Garh Shankar",
                "Garh Shankar(Mahalpur)",
                "GarhShankar (Kotfatuhi)",
                "Hoshiarpur",
                "Mukerian",
                "Mukerian(Talwara)",
                "Tanda Urmur"
            ],
            "Jalandhar": [
                "Bilga",
                "Jalandhar City(Jalandhar)",
                "Lohian Khas",
                "Mehatpur",
                "Noor Mehal",
                "Phillaur(Apra Mandi)",
                "Nakodar",
                "Bilga (Talwan )",
                "Bhogpur",
                "Shahkot",
                "Phillaur",
                "Goraya"
            ],
            "Ludhiana": [
                "Doraha",
                "Jagraon",
                "Khanna",
                "Ludhiana",
                "Sahnewal",
                "Samrala",
                "Machhiwara"
            ],
            "Mansa": [
                "Budalada",
                "Mansa",
                "Sardulgarh"
            ],
            "Moga": [
                "Baghapurana",
                "Moga",
                "Nihal Singh Wala",
                "Dharamkot",
                "Kot ise Khan"
            ],
            "Pathankot": [
                "Pathankot"
            ],
            "Patiala": [
                "Dudhansadhan",
                "Ghanaur",
                "Nabha",
                "Patiala",
                "Patran",
                "Rajpura",
                "Samana"
            ],
            "Sangrur": [
                "Ahmedgarh",
                "Bhawanigarh",
                "Dhuri",
                "Lehra Gaga",
                "Malerkotla",
                "Sangrur",
                "Sunam",
                "Khanauri"
            ]
        },
        "Jammu and Kashmir": {
            "Anantnag": [
                "Ashahipora (Anantnagh)",
                "Kulgam"
            ],
            "Jammu": [
                "Batote",
                "Narwal Jammu (F&V)",
                "Akhnoor"
            ],
            "Kathua": [
                "Kathua"
            ],
            "Rajouri": [
                "Rajouri (F&V)"
            ],
            "Srinagar": [
                "Parimpore"
            ],
            "Udhampur": [
                "Udhampur",
                "Reasi"
            ]
        },
        "Odisha": {
            "Angul": [
                "Angul(Jarapada)",
                "Angul",
                "Talcher",
                "Angaura",
                "Angul(Atthamallick)"
            ],
            "Balasore": [
                "Nilagiri",
                "Jaleswar",
                "Barikpur",
                "Bampada"
            ],
            "Bargarh": [
                "Attabira",
                "Bargarh",
                "Bargarh(Barapalli)",
                "Godabhaga",
                "Padampur",
                "Sohela"
            ],
            "Bhadrak": [
                "Bhadrak",
                "Chandabali",
                "Sahidngar"
            ],
            "Boudh": [
                "Boudh",
                "Khunthabandha"
            ],
            "Cuttack": [
                "Banki"
            ],
            "Dhenkanal": [
                "Hindol",
                "Kamakhyanagar",
                "Dhenkanal",
                "Mottagaon"
            ],
            "Gajapati": [
                "Parlakhemundi",
                "Kasinagar"
            ],
            "Ganjam": [
                "Bhanjanagar",
                "Hinjilicut",
                "Digapahandi"
            ],
            "Jajpur": [
                "Jajpur"
            ],
            "Kalahandi": [
                "Bhawanipatna",
                "Kesinga",
                "Mukhiguda",
                "Junagarh",
                "Kalahandi(Dharamagarh)"
            ],
            "Kendrapara": [
                "Chatta Krushak Bazar",
                "Gopa",
                "Kendrapara",
                "Kendrapara(Marshaghai)",
                "Pattamundai"
            ],
            "Koraput": [
                "Koraput",
                "Koraput(Semilguda)"
            ],
            "Malkangiri": [
                "Malkanagiri",
                "Malkangiri(Korakunda)"
            ],
            "Nayagarh": [
                "Bahadajholla",
                "Sarankul"
            ],
            "Nuapada": [
                "Khariar",
                "Khariar Road"
            ],
            "Rayagada": [
                "Gunpur",
                "Rayagada(Muniguda)",
                "Rayagada"
            ],
            "Sambalpur": [
                "Kuchinda"
            ]
        },
        "Bihar": {
            "Araria": [
                "Arreria",
                "Raniganj"
            ],
            "Arwal": [
                "Arwal"
            ],
            "Aurangabad": [
                "Amba",
                "Aurangabad"
            ],
            "Banka": [
                "Amarpur",
                "Barahat"
            ],
            "Begusarai": [
                "Balliah",
                "Begusarai",
                "Teghra"
            ],
            "Bhagalpur": [
                "Bihpur",
                "Bhagalpur",
                "Kahalgaon",
                "Naugachiya"
            ],
            "Bhojpur": [
                "Piro"
            ],
            "Buxar": [
                "Brahmpur",
                "Buxur"
            ],
            "Darbhanga": [
                "Bahadurpur (Ekmi Ghat)"
            ],
            "Gaya": [
                "Gaya",
                "Tekari"
            ],
            "Jamui": [
                "Jamui",
                "Sikandara"
            ],
            "Jehanabad": [
                "Jehanabad"
            ],
            "Khagaria": [
                "Khagaria",
                "Mansi Mandi"
            ],
            "Kishanganj": [
                "Bahadurganj",
                "Kishanganj",
                "Thakurganj"
            ],
            "Madhepura": [
                "Bihariganj",
                "Murliganj"
            ],
            "Madhubani": [
                "Jahajharpur",
                "Jainagar"
            ],
            "Nalanda": [
                "Biharsharif"
            ],
            "Nawada": [
                "Nawada",
                "Rajauli"
            ],
            "Rohtas": [
                "Dehri",
                "Nokha",
                "Vikramganj",
                "Sasaram"
            ],
            "Saharsa": [
                "Saharsa"
            ],
            "Samastipur": [
                "Samastipur",
                "Tajpur"
            ],
            "Saran": [
                "Sonpur"
            ],
            "Sheikhpura": [
                "Barbigha",
                "Shekhpura"
            ],
            "Sheohar": [
                "Sheohar"
            ],
            "Siwan": [
                "Siwan"
            ],
            "Supaul": [
                "Birpur",
                "Triveniganj",
                "Supaul"
            ],
            "Vaishali": [
                "Jaitipir Mandi, Lalganj block",
                "Parsoniya Mandi, Mahua block"
            ]
        },
        "Tamil Nadu": {
            "Ariyalur": [
                "Ariyalur(Uzhavar Sandhai)",
                "Jeyankondam (Uzhavar Sandhai )",
                "Ariyalur Market",
                "Jayamkondam"
            ],
            "Chengalpattu": [
                "Chengalpet(Uzhavar Sandhai )",
                "Guduvancheri(Uzhavar Sandhai )",
                "Jameenrayapettai(Uzhavar Sandhai )",
                "Madhuranthagam(Uzhavar Sandhai )",
                "Medavakkam(Uzhavar Sandhai )",
                "Nanganallur(Uzhavar Sandhai )",
                "Pallavaram(Uzhavar Sandhai )",
                "Thirukalukundram(Uzhavar Sandhai )"
            ],
            "Coimbatore": [
                "Kurichi(Uzhavar Sandhai )",
                "Mettupalayam(Uzhavar Sandhai )",
                "Pollachi(Uzhavar Sandhai )",
                "RSPuram(Uzhavar Sandhai )",
                "Singanallur(Uzhavar Sandhai )",
                "Sulur(Uzhavar Sandhai )",
                "Sundarapuram(Uzhavar Sandhai )",
                "Udumalpet",
                "Vadavalli(Uzhavar Sandhai )",
                "Palladam",
                "Pollachi",
                "Sulur"
            ],
            "Cuddalore": [
                "Chidambaram(Uzhavar Sandhai )",
                "Cuddalore(Uzhavar Sandhai )",
                "Panruti(Uzhavar Sandhai )",
                "Viruthachalam(Uzhavar Sandhai )",
                "Cuddalore",
                "Chidambaram",
                "Panruti"
            ],
            "Dharmapuri": [
                "AJattihalli(Uzhavar Sandhai )",
                "Dharmapuri(Uzhavar Sandhai )",
                "Harur(Uzhavar Sandhai )",
                "Palacode(Uzhavar Sandhai )",
                "Pennagaram(Uzhavar Sandhai )",
                "Arur",
                "Dharampuri",
                "Pennagaram",
                "Palakode"
            ],
            "Dindigul": [
                "Chinnalapatti(Uzhavar Sandhai )",
                "Dindigul(Uzhavar Sandhai )",
                "Palani(Uzhavar Sandhai )",
                "Vedasanthur(Uzhavar Sandhai )",
                "Palani",
                "Dindigul"
            ],
            "Erode": [
                "Gobichettipalayam(Uzhavar Sandhai )",
                "Periyar Nagar(Uzhavar Sandhai )",
                "Perundurai(Uzhavar Sandhai )",
                "Sampath Nagar(Uzhavar Sandhai )",
                "Sathiyamagalam(Uzhavar Sandhai )",
                "Thalavadi(Uzhavar Sandhai )",
                "Dharapuram",
                "Gobichettipalayam",
                "Kangeyam",
                "Sathyamangalam",
                "Thalavadi",
                "Perundurai"
            ],
            "Karur": [
                "Karur(Uzhavar Sandhai )",
                "Kulithalai(Uzhavar Sandhai )",
                "Pallapatti (Uzhavar Sandhai )",
                "Velayuthampalayam(Uzhavar Sandhai )",
                "Karur"
            ],
            "Krishnagiri": [
                "Avallapalli(Uzhavar Sandhai )",
                "Denkanikottai(Uzhavar Sandhai )",
                "Hosur(Uzhavar Sandhai )",
                "Kaveripattinam(Uzhavar Sandhai )",
                "Krishnagiri(Uzhavar Sandhai )",
                "Denkanikottai",
                "Hosur",
                "Krishnagiri"
            ],
            "Madurai": [
                "Anaiyur(Uzhavar Sandhai )",
                "Anna nagar(Uzhavar Sandhai )",
                "Chokkikulam(Uzhavar Sandhai )",
                "Melur(Uzhavar Sandhai )",
                "Palanganatham(Uzhavar Sandhai )",
                "Thirumangalam(Uzhavar Sandhai )",
                "Usilampatty",
                "Melur",
                "Thirumangalam"
            ],
            "Nagapattinam": [
                "Mayiladuthurai(Uzhavar Sandhai )",
                "Nagapattinam(Uzhavar Sandhai )",
                "Sirkali(Uzhavar Sandhai )",
                "Mailaduthurai",
                "Nagapattinam",
                "Sirkali"
            ],
            "Namakkal": [
                "Kumarapalayam(Uzhavar Sandhai )",
                "Mohanur(Uzhavar Sandhai )",
                "Namakkal(Uzhavar Sandhai )",
                "Paramathivelur(Uzhavar Sandhai )",
                "Rasipuram(Uzhavar Sandhai )",
                "Tiruchengode",
                "Namakkal",
                "Rasipuram"
            ],
            "Perambalur": [
                "Perambalur(Uzhavar Sandhai )"
            ],
            "Pudukkottai": [
                "Alangudi(Uzhavar Sandhai )",
                "Aranthangi(Uzhavar Sandhai )",
                "Gandarvakottai(Uzhavar Sandhai )",
                "Karambakkudi(Uzhavar Sandhai )",
                "Pudukottai(Uzhavar Sandhai )",
                "Viralimalai(Uzhavar Sandhai )",
                "Alangudi",
                "Aranthangi",
                "Pudukottai"
            ],
            "Ramanathapuram": [
                "Paramakudi(Uzhavar Sandhai )",
                "Ramanathapuram(Uzhavar Sandhai )",
                "Ramanathapuram(phase 3)",
                "Paramakudi",
                "Sivagangai"
            ],
            "Ranipet": [
                "Arcot(Uzhavar Sandhai )",
                "Ranipettai(Uzhavar Sandhai )"
            ],
            "Salem": [
                "Ammapet(Uzhavar Sandhai )",
                "Athur(Uzhavar Sandhai )",
                "Attayampatti(Uzhavar Sandhai )",
                "Edapadi (Uzhavar Sandhai )",
                "Elampillai(Uzhavar Sandhai )",
                "Hasthampatti(Uzhavar Sandhai )",
                "Jalagandapuram(Uzhavar Sandhai )",
                "Mettur(Uzhavar Sandhai )",
                "Sooramangalam(Uzhavar Sandhai )",
                "Thammampatti (Uzhavar Sandhai )",
                "Thathakapatti(Uzhavar Sandhai )",
                "Attur",
                "Edappadi",
                "Thammampati",
                "Karumanturai"
            ],
            "Sivaganga": [
                "Devakottai (Uzhavar Sandhai )",
                "Karaikudi(Uzhavar Sandhai )",
                "Singampunari(Uzhavar Sandhai )",
                "Sivagangai (Uzhavar Sandhai )",
                "Tirupatthur(Uzhavar Sandhai )",
                "Devakottai",
                "Karaikudi",
                "Singampuneri"
            ],
            "Tenkasi": [
                "Sankarankoil(Uzhavar Sandhai )",
                "Tenkasi(Uzhavar Sandhai )"
            ],
            "Thanjavur": [
                "Kumbakonam (Uzhavar Sandhai )",
                "Papanasam(Uzhavar Sandhai )",
                "Pattukottai(Uzhavar Sandhai )",
                "Thanjavur(Uzhavar Sandhai )",
                "Kumbakonam",
                "Pattukottai",
                "Papanasam",
                "Thanjavur"
            ],
            "Theni": [
                "Andipatti(Uzhavar Sandhai )",
                "Bodinayakanur(Uzhavar Sandhai )",
                "Chinnamanur(Uzhavar Sandhai )",
                "Devaram(Uzhavar Sandhai )",
                "Kambam(Uzhavar Sandhai )",
                "Periyakulam(Uzhavar Sandhai )",
                "Theni(Uzhavar Sandhai )",
                "Bodinayakkanur",
                "Chinnamanur",
                "Cumbum",
                "Theni"
            ],
            "Vellore": [
                "Gudiyatham(Uzhavar Sandhai )",
                "Kahithapattarai(Uzhavar Sandhai )",
                "Katpadi (Uzhavar Sandhai )",
                "Thirupathur",
                "Vellore",
                "Arcot",
                "Gudiyatham",
                "Katpadi(Uzhavar Santhai)",
                "Vaniyambadi"
            ],
            "Virudhunagar": [
                "Aruppukottai(Uzhavar Sandhai )",
                "Kariyapatti(Uzhavar Sandhai )",
                "Rajapalayam(Uzhavar Sandhai )",
                "Sathur(Uzhavar Sandhai )",
                "Sivakasi(Uzhavar Sandhai )",
                "Srivilliputhur(Uzhavar Sandhai )",
                "Thalavaipuram(Uzhavar Sandhai )",
                "Virudhunagar(Uzhavar Sandhai )",
                "Sathur",
                "Virudhunagar"
            ]
        },
        "Karnataka": {
            "Bangalore": [
                "Binny Mill (F&V), Bangalore",
                "Doddaballa Pur",
                "Kanakapura",
                "Ramanagara",
                "Channapatana"
            ],
            "Bellary": [
                "Hospet"
            ],
            "Chitradurga": [
                "Holalkere"
            ],
            "Dharwad": [
                "Dharwar"
            ],
            "Gadag": [
                "Gadag"
            ],
            "Hassan": [
                "Arasikere",
                "Belur",
                "Hassan",
                "Channarayapatna",
                "Arakalgud"
            ],
            "Haveri": [
                "Ranebennur",
                "Haveri"
            ],
            "Kolar": [
                "Bangarpet",
                "Chickkaballapura",
                "Chintamani",
                "Gowribidanoor",
                "Kolar",
                "Mulabagilu",
                "Srinivasapur",
                "Malur"
            ],
            "Koppal": [
                "Koppal"
            ],
            "Mandya": [
                "K.R. Pet",
                "Nagamangala",
                "Mandya"
            ],
            "Mysore": [
                "Mysore (Bandipalya)",
                "Nanjangud",
                "Santhesargur",
                "K.R.Nagar",
                "Hunsur",
                "T. Narasipura"
            ],
            "Shimoga": [
                "Shimoga"
            ],
            "Tumkur": [
                "Tumkur"
            ],
            "Udupi": [
                "Udupi"
            ]
        },
        "Assam": {
            "Barpeta": [
                "Barpeta Road"
            ],
            "Cachar": [
                "Fatakbazar",
                "Kashipur",
                "Sonabarighat"
            ],
            "Darrang": [
                "Banglagarh",
                "Besimari",
                "Balugaon",
                "Kharupetia",
                "Tangni"
            ],
            "Goalpara": [
                "Darangiri Banana Market",
                "Lakhipur",
                "Jaleswar",
                "Krishnai",
                "Simlitola",
                "Sonari"
            ],
            "Golaghat": [
                "Golaghat"
            ],
            "Jorhat": [
                "Jorhat",
                "Mariani"
            ],
            "Kamrup": [
                "Brahmaputra Private Market",
                "Pamohi(Garchuk)",
                "Sontoli"
            ],
            "Karbi Anglong": [
                "Diphu",
                "Manja",
                "Sariahjan"
            ],
            "Kokrajhar": [
                "Balajan Tiniali",
                "Dotma Bazar",
                "Gossaigaon",
                "Serfanguri",
                "Saraibil"
            ],
            "Lakhimpur": [
                "Anand Bazar",
                "Baginadi",
                "Ghilamara",
                "Golagokarnath",
                "Kakoi Weekly Market",
                "Lakhimpur",
                "Paliakala"
            ],
            "Nagaon": [
                "Ambagan",
                "Haibargaon",
                "Dhing"
            ],
            "Nalbari": [
                "Dhamdhama",
                "Kumrikata",
                "Mukalmua",
                "Nalbari"
            ],
            "Sonitpur": [
                "Bindukuri",
                "Dhekiajuli"
            ]
        },
        "Himachal Pradesh": {
            "Bilaspur": [
                "Bilaspur",
                "Tiphra"
            ],
            "Chamba": [
                "Chamba"
            ],
            "Hamirpur": [
                "Bharuasumerpur",
                "Hamirpur",
                "Hamirpur(Nadaun)",
                "Muskara",
                "Maudaha",
                "Raath"
            ],
            "Kangra": [
                "Dharamshala",
                "Kangra",
                "Kangra(Baijnath)",
                "Kangra(Jaisinghpur)",
                "Kangra(Jassour)",
                "Kangra(Nagrota Bagwan)",
                "Palampur"
            ],
            "Kullu": [
                "Bandrol",
                "Bhuntar",
                "Kullu",
                "Kullu(Chauri Bihal)"
            ],
            "Mandi": [
                "Dhanotu (Mandi)",
                "Mandi(Mandi)",
                "Mandi(Takoli)",
                "Chail Chowk "
            ],
            "Shimla": [
                "Rohroo",
                "Shimla",
                "Shimla and Kinnaur(Rampur)",
                "Shimla and Kinnaur(Nerwa)",
                "Shimla and Kinnaur(Theog)"
            ],
            "Solan": [
                "Solan(Nalagarh)",
                "Solan"
            ],
            "Una": [
                "Santoshgarh",
                "Una",
                "Santoshgarah"
            ]
        },
        "Uttarakhand": {
            "Champawat": [
                "Tanakpur"
            ],
            "Haridwar": [
                "Bhagwanpur(Naveen Mandi Sthal)",
                "Haridwar Union",
                "Manglaur",
                "Roorkee",
                "Lakshar"
            ]
        },
        "Chandigarh": {
            "Chandigarh": [
                "Chandigarh(Grain/Fruit)"
            ]
        },
        "Andhra Pradesh": {
            "Chittor": [
                "Kalikiri",
                "Madanapalli",
                "Mulakalacheruvu",
                "Palamaner",
                "Punganur",
                "Vayalapadu"
            ],
            "Kurnool": [
                "Pattikonda"
            ]
        },
        "Tripura": {
            "Dhalai": [
                "Gandacharra",
                "Kulai",
                "Masli",
                "Halahali"
            ],
            "Gomati": [
                "Garjee",
                "Nutanbazar",
                "Silachhari"
            ],
            "Khowai": [
                "Kalyanpur",
                "Teliamura"
            ],
            "North Tripura": [
                "Kadamtala",
                "Kanchanpur",
                "Dasda",
                "Panisagar"
            ],
            "Sepahijala": [
                "Bishalgarh",
                "Bishramganj",
                "Boxonagar",
                "Sonamura",
                "Jumpuijala",
                "Melaghar"
            ]
        },
        "Nagaland": {
            "Dimapur": [
                "Dimapur",
                "Nuiland"
            ],
            "Kiphire": [
                "Kipheri"
            ],
            "Kohima": [
                "Jalukie",
                "Kohima"
            ],
            "Longleng": [
                "Longleng"
            ],
            "Mokokchung": [
                "Mokokchung Town",
                "Mangkolemba"
            ],
            "Mon": [
                "Naginimora"
            ],
            "Peren": [
                "Tenning"
            ],
            "Phek": [
                "Phek",
                "Pfatsero"
            ],
            "Tuensang": [
                "Tuensang"
            ],
            "Wokha": [
                "Wokha Town"
            ],
            "Zunheboto": [
                "Ghathashi",
                "Zunheboto"
            ]
        },
        "Meghalaya": {
            "East Garo Hills": [
                "Williamnagar"
            ],
            "East Jaintia Hills": [
                "Khliehriat"
            ],
            "East Khasi Hills": [
                "Shillong",
                "Sohra"
            ],
            "South Garo Hills": [
                "Baghmara",
                "Gasuapara"
            ],
            "South West Garo Hills": [
                "Ampati",
                "Garobadha"
            ],
            "West Garo Hills": [
                "Tura",
                "Dadengiri",
                "Rongram"
            ],
            "West Jaintia Hills": [
                "Wahiajer",
                "Jowai"
            ],
            "West Khasi Hills": [
                "Nongstoin"
            ]
        },
        "Jharkhand": {
            "Garhwa": [
                "Gadhwah"
            ]
        },
        "Andaman and Nicobar Islands": {
            "Nicobar": [
                "Car Nicobar"
            ]
        }
    },
    "wheat": {
        "Telangana": {
            "Adilabad": [
                "Bhainsa"
            ],
            "Medak": [
                "Zaheerabad",
                "Sadasivpet"
            ]
        },
        "Uttar Pradesh": {
            "Agra": [
                "Achnera",
                "Agra",
                "Fatehpur Sikri",
                "Jagnair",
                "Khairagarh",
                "Samsabad",
                "Fatehabad"
            ],
            "Aligarh": [
                "Aligarh",
                "Atrauli",
                "Charra",
                "Khair"
            ],
            "Amethi": [
                "Jafarganj",
                "Sultanpur"
            ],
            "Amroha": [
                "Amroha",
                "Dhanaura"
            ],
            "Auraiya": [
                "Achalda",
                "Auraiya",
                "Dibiapur"
            ],
            "Ayodhya": [
                "Faizabad",
                "Rudauli"
            ],
            "Azamgarh": [
                "Azamgarh"
            ],
            "Badaun": [
                "Babrala",
                "Badayoun",
                "Bilsi",
                "Dataganj",
                "Shahaswan",
                "Ujhani",
                "Visoli",
                "Wazirganj"
            ],
            "Baghpat": [
                "Baraut"
            ],
            "Bahraich": [
                "Bahraich",
                "Naanpara"
            ],
            "Ballia": [
                "Ballia",
                "Rasda",
                "Vilthararoad"
            ],
            "Balrampur": [
                "Balrampur",
                "Panchpedwa",
                "Tulsipur",
                "Bariya",
                "Ramanujganj",
                "Rajpur",
                "Kusmee"
            ],
            "Banda": [
                "Atarra",
                "Baberu",
                "Banda"
            ],
            "Barabanki": [
                "Barabanki",
                "Safdarganj"
            ],
            "Bareilly": [
                "Bareilly",
                "Bahedi",
                "Anwala",
                "Richha"
            ],
            "Basti": [
                "Basti"
            ],
            "Bijnor": [
                "Bijnaur",
                "Najibabad"
            ],
            "Chandauli": [
                "Chandoli"
            ],
            "Deoria": [
                "Devariya",
                "Barhaj"
            ],
            "Etah": [
                "Aliganj",
                "Etah",
                "Awagarh"
            ],
            "Etawah": [
                "Bharthna",
                "Etawah",
                "Jasvantnagar"
            ],
            "Fatehpur": [
                "Bindki",
                "Fatehpur",
                "Jahanabad",
                "Khaga",
                "Kishunpur"
            ],
            "Firozabad": [
                "Firozabad",
                "Tundla",
                "Shikohabad",
                "Sirsaganj"
            ],
            "Ghaziabad": [
                "Ghaziabad",
                "Hapur",
                "Muradnagar",
                "Noida"
            ],
            "Ghazipur": [
                "Gazipur",
                "Jangipura",
                "Yusufpur",
                "Jamanian"
            ],
            "Gonda": [
                "Gonda",
                "Nawabganj",
                "Karnailganj"
            ],
            "Gorakhpur": [
                "Chorichora",
                "Gorakhpur",
                "Sehjanwa"
            ],
            "Hardoi": [
                "Hardoi",
                "Madhoganj",
                "Sandi",
                "Sandila",
                "Shahabad(New Mandi)"
            ],
            "Hathras": [
                "Haathras",
                "Sikandraraau"
            ],
            "Jaunpur": [
                "Jaunpur",
                "Mugrabaadshahpur",
                "Shahganj"
            ],
            "Jhansi": [
                "Gurusarai",
                "Jhansi (Grain)",
                "Mauranipur",
                "Moth",
                "Jhansi",
                "Chirgaon"
            ],
            "Kanpur Dehat": [
                "Pukharayan",
                "Rura",
                "Jhijhank"
            ],
            "Kasganj": [
                "Kasganj"
            ],
            "Kaushambi": [
                "Bharwari",
                "Manjhanpur"
            ],
            "Kushinagar": [
                "Tamkuhi road"
            ],
            "Lalitpur": [
                "Lalitpur",
                "Mehrauni"
            ],
            "Lucknow": [
                "Banthara",
                "Lucknow"
            ],
            "Maharajganj": [
                "Anandnagar",
                "Nautnava",
                "Partaval",
                "Gadaura"
            ],
            "Mahoba": [
                "Charkhari",
                "Mahoba"
            ],
            "Mainpuri": [
                "Bewar",
                "Ghiraur",
                "Mainpuri"
            ],
            "Mathura": [
                "Kosikalan",
                "Mathura"
            ],
            "Meerut": [
                "Meerut",
                "Mawana"
            ],
            "Mirzapur": [
                "Ahirora",
                "Mirzapur"
            ],
            "Muzaffarnagar": [
                "Muzzafarnagar",
                "Shahpur",
                "Khatauli"
            ],
            "Prayagraj": [
                "Ajuha",
                "Allahabad",
                "Jasra",
                "Lediyari",
                "Sirsa"
            ],
            "Rampur": [
                "Rampur",
                "Shahabad",
                "Milak",
                "Vilaspur"
            ],
            "Saharanpur": [
                "Deoband",
                "Saharanpur",
                "Rampurmaniharan"
            ],
            "Sambhal": [
                "Chandausi",
                "Bhehjoi",
                "Muradabad",
                "Sambhal"
            ],
            "Sant Kabir Nagar": [
                "Khalilabad"
            ],
            "Shahjahanpur": [
                "Jalalabad",
                "Puwaha",
                "Shahjahanpur",
                "Tilhar",
                "Badda"
            ],
            "Shamli": [
                "Shamli",
                "Thanabhavan"
            ],
            "Shravasti": [
                "Bhinga"
            ],
            "Sitapur": [
                "Hargaon (Laharpur)",
                "Mehmoodabad",
                "Sitapur",
                "Viswan"
            ],
            "Sonbhadra": [
                "Dudhi",
                "Robertsganj"
            ],
            "Unnao": [
                "Bangarmau",
                "Purwa",
                "Unnao"
            ],
            "Varanasi": [
                "Varanasi"
            ]
        },
        "Gujarat": {
            "Ahmedabad": [
                "Bavla",
                "Sanad",
                "Viramgam",
                "Mandal"
            ],
            "Amreli": [
                "Amreli",
                "Babra",
                "Bagasara",
                "Dhari",
                "Rajula",
                "Savarkundla",
                "Khambha"
            ],
            "Anand": [
                "Anand",
                "Borsad",
                "Khambhat(Grain Market)",
                "Umreth",
                "Tarapur"
            ],
            "Bharuch": [
                "Jambusar",
                "Amod",
                "Valia"
            ],
            "Bhavnagar": [
                "Bhavnagar",
                "Mahuva(Station Road)",
                "Palitana",
                "Taleja"
            ],
            "Botad": [
                "Botad"
            ],
            "Dahod": [
                "Dahod",
                "Limkheda",
                "Zalod(Sanjeli)",
                "Zalod(Zalod)"
            ],
            "Gandhinagar": [
                "Dehgam",
                "Dehgam(Rekhiyal)",
                "Kalol",
                "Mansa"
            ],
            "Gir Somnath": [
                "Kodinar",
                "Veraval",
                "Una"
            ],
            "Jamnagar": [
                "Dhrol",
                "Jamnagar",
                "Kalawad",
                "Jam Jodhpur"
            ],
            "Kheda": [
                "Kapadvanj",
                "Matar",
                "Matar(Limbasi)",
                "Mehmadabad"
            ],
            "Mehsana": [
                "Kadi",
                "Mehsana",
                "Mehsana(Jornang)",
                "Vijapur(Gojjariya)",
                "Vijapur",
                "Vijapur(Kukarvada)",
                "Visnagar",
                "Becharaji"
            ],
            "Morbi": [
                "Halvad",
                "Morbi",
                "Vankaner"
            ],
            "Patan": [
                "Harij",
                "Patan",
                "Radhanpur",
                "Sami",
                "Siddhpur"
            ],
            "Porbandar": [
                "Porbandar",
                "Kutiyana"
            ],
            "Rajkot": [
                "Dhoraji",
                "Gondal",
                "Jasdan",
                "Jetpur(Dist.Rajkot)",
                "Rajkot",
                "Upleta"
            ],
            "Sabarkantha": [
                "Bayad(Demai)",
                "Bayad(Sadamba)",
                "Bayad",
                "Bhiloda",
                "Himatnagar",
                "Idar",
                "Dhansura",
                "Idar(Jadar)",
                "Khedbrahma",
                "Malpur",
                "Meghraj",
                "Modasa",
                "Modasa(Tintoi)",
                "Meghraj(Radlavada)",
                "Talod",
                "Vadali",
                "Vijaynagar(Kundlakap)",
                "Prantij"
            ],
            "Surat": [
                "Mandvi",
                "Nizar",
                "Vyra",
                "Kosamba(Zangvav)"
            ],
            "Surendranagar": [
                "Chotila",
                "Dhragradhra",
                "Dasada Patadi",
                "Vadhvan",
                "Lakhtar"
            ]
        },
        "Maharashtra": {
            "Ahmednagar": [
                "Ahmednagar",
                "Jamkhed",
                "Karjat",
                "Kopargaon",
                "Om Chaitanya Multistate Agro Purpose CoOp Society ",
                "Rahata",
                "Rahuri",
                "Rahuri(Vambori)",
                "Sangamner",
                "Shevgaon",
                "Shevgaon(Bodhegaon)",
                "Shrigonda(Gogargaon)",
                "Shrirampur",
                "Shrirampur(Belapur)",
                "Shrigonda",
                "Pathardi",
                "Newasa"
            ],
            "Akola": [
                "Akola",
                "Akot",
                "Balapur",
                "Murtizapur",
                "Patur",
                "Telhara"
            ],
            "Beed": [
                "Beed",
                "Gevrai",
                "Kille Dharur",
                "Majalgaon",
                "Kada",
                "Vadvani",
                "Ambejaogai",
                "Parali Vaijyanath",
                "Kaij"
            ],
            "Bhandara": [
                "Bhandara",
                "Tumsar",
                "Lakhandur"
            ],
            "Buldhana": [
                "Buldhana(Dhad)",
                "BSK Krishi Bazar Private Ltd",
                "Chikali",
                "Deoulgaon Raja",
                "Khamgaon",
                "Jalgaon Jamod(Aasalgaon)",
                "Lonar",
                "Maharaja Agresen Private Krushi Utappan Bazar Sama",
                "Malkapur",
                "Mehekar",
                "Nandura",
                "Shegaon",
                "Motala",
                "Sangrampur(Varvatbakal)",
                "Buldhana"
            ],
            "Chandrapur": [
                "Varora"
            ],
            "Dhule": [
                "Dhule",
                "Dondaicha",
                "Dondaicha(Sindhkheda)",
                "Sakri",
                "Shirpur"
            ],
            "Hingoli": [
                "Akhadabalapur",
                "Hingoli",
                "Hingoli(Kanegoan Naka)",
                "Sengoan",
                "Vitthal Krushi Utpanna Bazar ",
                "Basmat",
                "Sant Namdev Krushi Bazar, "
            ],
            "Latur": [
                "Ahmedpur",
                "Aurad Shahajani",
                "Ausa",
                "Chakur",
                "Nilanga",
                "Latur",
                "Latur(Murud)"
            ],
            "Nagpur": [
                "Katol",
                "Nagpur",
                "Savner",
                "Umared",
                "Ramtek",
                "Bhiwapur",
                "Mauda",
                "Mandhal"
            ],
            "Nanded": [
                "Bhokar",
                "Kandhar",
                "Nanded",
                "Loha",
                "Mudkhed",
                "Himalyatnagar",
                "Kinwat",
                "Umari"
            ],
            "Nandurbar": [
                "Navapur",
                "Nandurbar",
                "Shahada",
                "Taloda",
                "Dhadgaon",
                "Akkalkuwa"
            ],
            "Nashik": [
                "Devala",
                "Kalvan",
                "Lasalgaon",
                "Lasalgaon(Niphad)",
                "Malegaon",
                "Manmad",
                "Lasalgaon(Vinchur)",
                "Nandgaon",
                "Satana",
                "Sinner",
                "Yeola",
                "Nampur"
            ],
            "Parbhani": [
                "Gangakhed",
                "Pathari",
                "Selu",
                "Tadkalas",
                "Sonpeth",
                "Parbhani",
                "Palam",
                "Purna",
                "Bori",
                "Jintur",
                "Shree Salasar Krushi Bazar ",
                "Manwat"
            ],
            "Pune": [
                "Baramati",
                "Dound",
                "Indapur(Nimgaon Ketki)",
                "Pune",
                "Nira(Saswad)",
                "Shirur",
                "Indapur",
                "Indapur(Bhigwan)"
            ],
            "Raigad": [
                "Karjat(Raigad)"
            ],
            "Sangli": [
                "Sangli",
                "Tasgaon",
                "Palus"
            ],
            "Satara": [
                "Jawali",
                "Phaltan",
                "Vaduj"
            ],
            "Thane": [
                "Kalyan",
                "Palghar",
                "Ulhasnagar",
                "Vasai"
            ],
            "Wardha": [
                "Hinganghat",
                "Sindi(Selu)",
                "Wardha",
                "Ashti(Karanja)",
                "Pulgaon",
                "Sindi",
                "Ashti"
            ],
            "Yavatmal": [
                "Digras",
                "Kisan Market Yard",
                "Mahesh Krushi Utpanna Bazar, Digras",
                "Yeotmal",
                "Umarkhed",
                "Umarked(Danki)",
                "Babhulgaon",
                "Aarni",
                "Ner Parasopant",
                "Kalamb",
                "Vani",
                "Shekari Krushi Khajgi Bazar",
                "Pusad"
            ]
        },
        "Rajasthan": {
            "Ajmer": [
                "Madanganj Kishangarh"
            ],
            "Alwar": [
                "Alwar",
                "Barodamev",
                "Bahror",
                "Laxmangarh (Barodamev)",
                "Kherli"
            ],
            "Baran": [
                "Anta",
                "Atru",
                "Baran",
                "Chhabra",
                "Chhipabarod (Chhabra)",
                "Kawai Salpura (Atru)",
                "Nahargarh",
                "Samraniyan"
            ],
            "Bharatpur": [
                "Bayana",
                "Bharatpur",
                "Bhusawar Bair",
                "Nadwai"
            ],
            "Bhilwara": [
                "Bhilwara",
                "Bijolia",
                "Gulabpura"
            ],
            "Bikaner": [
                "Bajju",
                "Bikaner (Grain)",
                "Lunkaransar",
                "Nokha",
                "Sridungargarh",
                "Pugal Road (Grain)",
                "Khajuwala"
            ],
            "Bundi": [
                "Bundi",
                "Dei",
                "Keshoraipatan",
                "Sumerganj"
            ],
            "Chittorgarh": [
                "Barisadri",
                "Begu",
                "Kapasan",
                "Nimbahera"
            ],
            "Churu": [
                "Sardar Shahar",
                "Sujangarh"
            ],
            "Dausa": [
                "Bandikui",
                "Bandikui(Geejgarh)",
                "Dausa",
                "Lalsot",
                "Madanganj Mahuwa",
                "Madanganj Mandawar",
                "Mandawari"
            ],
            "Dholpur": [
                "Dholpur"
            ],
            "Hanumangarh": [
                "Bhadara",
                "Goluwala",
                "Hanumangarh(Urlivas)",
                "Hanumangarh",
                "Hanumangarh Town",
                "Pilibanga",
                "Rawatsar",
                "Sangriya",
                "Nohar"
            ],
            "Jaipur": [
                "Kishan Renwal(Fulera)"
            ],
            "Jhalawar": [
                "Bhawani Mandi",
                "Choumahla",
                "Iklera",
                "Jhalarapatan",
                "Khanpur",
                "Manohar Thana",
                "Dag"
            ],
            "Jhunjhunu": [
                "Gudhagorji",
                "Jhunjhunu",
                "Chirawa",
                "Surajgarh"
            ],
            "Jodhpur": [
                "Jodhpur (Grain)",
                "Bhagat Ki Kothi"
            ],
            "Karauli": [
                "Hindoun"
            ],
            "Kota": [
                "Itawa",
                "Kota",
                "Ramganjmandi"
            ],
            "Pali": [
                "Sumerpur",
                "Sojat Road",
                "Rani",
                "Pali"
            ],
            "Pratapgarh": [
                "Chhotisadri",
                "Pratapgarh"
            ],
            "Sikar": [
                "Palsana",
                "Fatehpur",
                "Sikar"
            ],
            "Tonk": [
                "Deoli",
                "Dooni",
                "Malpura",
                "Malpura(Todaraisingh)",
                "Niwai",
                "Tonk",
                "Uniyara"
            ],
            "Udaipur": [
                "Fatehnagar",
                "Udaipur (Grain)"
            ]
        },
        "Kerala": {
            "Alappuzha": [
                "Alappuzha",
                "Cherthala"
            ],
            "Idukki": [
                "Munnar"
            ]
        },
        "Madhya Pradesh": {
            "Alirajpur": [
                "Alirajpur",
                "Jobat",
                "Jobat(F&V)"
            ],
            "Ashoknagar": [
                "Ashoknagar",
                "Chanderi",
                "Isagarh",
                "Mungawali",
                "Shadora",
                "Piprai"
            ],
            "Balaghat": [
                "Balaghat",
                "Mohgaon",
                "Praswada",
                "Katangi",
                "Varaseoni",
                "Lalbarra"
            ],
            "Betul": [
                "Betul",
                "Bhensdehi",
                "Multai"
            ],
            "Bhind": [
                "Alampur",
                "Bhind",
                "Gohad",
                "Gohad(F&V)",
                "Lahar",
                "Mehgaon",
                "Mow"
            ],
            "Bhopal": [
                "Berasia",
                "Bhopal"
            ],
            "Burhanpur": [
                "Burhanpur"
            ],
            "Chhatarpur": [
                "Badamalhera",
                "Bakswaha",
                "Bijawar",
                "Chhatarpur",
                "Harpalpur",
                "LavKush Nagar(Laundi)",
                "Naugaon",
                "Rajnagar"
            ],
            "Chhindwara": [
                "Chaurai",
                "Chhindwara",
                "Sounsar(F&V)",
                "Saunsar",
                "Amarwda",
                "Pandhurna"
            ],
            "Damoh": [
                "Damoh",
                "Hata",
                "Javera",
                "Patharia"
            ],
            "Datia": [
                "Bhander",
                "Datia",
                "Sevda"
            ],
            "Dewas": [
                "Bagli",
                "Dewas",
                "Haatpipliya",
                "Kannod",
                "Khategaon",
                "Loharda",
                "Sonkatch"
            ],
            "Dhar": [
                "Badnawar",
                "Dhamnod",
                "Dhar",
                "Gandhwani",
                "Kukshi",
                "Manawar",
                "Rajgarh",
                "Dhar(F&V)"
            ],
            "Dindori": [
                "Dindori",
                "Gorakhpur",
                "Shahpura"
            ],
            "Guna": [
                "Aron",
                "Binaganj",
                "Guna",
                "Kumbhraj",
                "Maksudangarh",
                "Raghogarh"
            ],
            "Gwalior": [
                "Bhitarwar",
                "Dabra",
                "Lashkar"
            ],
            "Hoshangabad": [
                "Babai",
                "Banapura",
                "Banapura(F&V)",
                "Bankhedi",
                "Hoshangabad",
                "Hoshangabad(F&V)",
                "Itarsi",
                "Pipariya",
                "Pipariya(F&V)",
                "Semriharchand"
            ],
            "Indore": [
                "Gautampura",
                "Indore",
                "Mhow",
                "Mhow(F&V)",
                "Sanwer",
                "Indore(F&V)"
            ],
            "Jabalpur": [
                "Jabalpur",
                "Paatan",
                "Sehora",
                "Shahpura Bhitoni (F&V)",
                "Shahpura(Jabalpur)",
                "Sihora"
            ],
            "Jhabua": [
                "Jhabua",
                "Jhabua(F&V)",
                "Petlawad",
                "Petlawad(F&V)",
                "Thandla"
            ],
            "Katni": [
                "Katni"
            ],
            "Khandwa": [
                "Harsood",
                "Khandwa",
                "Mundi",
                "Pandhana"
            ],
            "Khargone": [
                "Badwaha",
                "Bhikangaon",
                "Karhi",
                "Kasrawad",
                "Khargone",
                "Sanawad",
                "Segaon"
            ],
            "Mandla": [
                "Bichhiya",
                "Mandla",
                "Nainpur"
            ],
            "Mandsaur": [
                "Bhanpura",
                "Daloda",
                "Garoth",
                "Mandsaur",
                "Piplya",
                "Shamgarh",
                "Sitamau(F&V)",
                "Sitmau",
                "Suvasra"
            ],
            "Morena": [
                "Ambaha",
                "Banmorkalan",
                "Kailaras",
                "Morena",
                "Porsa",
                "Sabalgarh",
                "Sabalgarh(F&V)",
                "Jora"
            ],
            "Narsinghpur": [
                "Gadarwada",
                "Gadarwara(F&V)",
                "Gotegaon",
                "Gotegaon(F&V)",
                "Kareli",
                "Kareli(F&V)",
                "Narsinghpur",
                "Tendukheda"
            ],
            "Neemuch": [
                "Manasa",
                "Neemuch",
                "Javad"
            ],
            "Panna": [
                "Ajaygarh",
                "Devandranagar",
                "Panna",
                "Pawai",
                "Simariya"
            ],
            "Raisen": [
                "Bareli",
                "Begamganj",
                "Gairatganj",
                "Obedullaganj",
                "Raisen",
                "Silvani",
                "Udaipura"
            ],
            "Rajgarh": [
                "Biaora",
                "Chhapiheda",
                "Jeerapur",
                "Khilchipur",
                "Khujner",
                "Kurawar",
                "Narsinghgarh",
                "Pachaur",
                "Sarangpur",
                "Machalpur",
                "Suthalia"
            ],
            "Ratlam": [
                "A lot",
                "Alot(F&V)",
                "Jaora",
                "Ratlam",
                "Sailana",
                "Sailana(F&V)",
                "Taal"
            ],
            "Rewa": [
                "Baikunthpur",
                "Chaakghat",
                "Hanumana",
                "Rewa"
            ],
            "Sagar": [
                "Bamora",
                "Banda",
                "Bina",
                "Deori",
                "Garhakota",
                "Jaisinagar",
                "Kesli",
                "Khurai",
                "Malthone",
                "Rahatgarh",
                "Rehli",
                "Sagar",
                "Shahagarh"
            ],
            "Satna": [
                "Amarpatan",
                "Mehar",
                "Nagod",
                "Ramnagar",
                "Satna"
            ],
            "Sehore": [
                "Ashta",
                "Baktara",
                "Ichhawar",
                "Ichhawar(F&V)",
                "Jawar",
                "Nasrullaganj",
                "Rehati",
                "Sehore",
                "Shyampur"
            ],
            "Seoni": [
                "Chhapara(F&V)",
                "Ghansour",
                "Keolari",
                "Chhpara",
                "Palari",
                "Palari(F&V)",
                "Seoni",
                "Kewalri(F&V)",
                "Lakhnadon",
                "Barghat"
            ],
            "Shajapur": [
                "Agar",
                "Badod",
                "Berachha",
                "Kalapipal",
                "Nalkehda",
                "Momanbadodiya",
                "Shajapur",
                "Shujalpur",
                "Susner",
                "Soyatkalan",
                "Akodiya",
                "Maksi"
            ],
            "Sheopur": [
                "Sheopurbadod",
                "Sheopurkalan",
                "Vijaypur"
            ],
            "Shivpuri": [
                "Badarwas",
                "Barad",
                "Karera",
                "Khanyadhana",
                "Kolaras",
                "Magroni",
                "Khatora",
                "Pichhour",
                "Shivpuri",
                "Pohari",
                "Rannod",
                "Khaniadhana"
            ],
            "Sidhi": [
                "Sidhi"
            ],
            "Tikamgarh": [
                "Jatara",
                "Khargapur",
                "Niwadi",
                "Palera",
                "Prithvipur",
                "Tikamgarh",
                "Tikamgarh(F&V)"
            ],
            "Ujjain": [
                "Badnagar",
                "Khachrod",
                "Mahidpur",
                "Mahidpur(F&V)",
                "Nagda",
                "Tarana",
                "Ujjain",
                "Unhel"
            ],
            "Vidisha": [
                "Ganjbasoda",
                "Kurwai",
                "Lateri",
                "Shamshabad",
                "Sironj",
                "Vidisha",
                "Gulabganj"
            ]
        },
        "Haryana": {
            "Ambala": [
                "Ambala City(Subji Mandi)",
                "Barara",
                "Ambala City",
                "Mullana(saha)",
                "Naneola",
                "Naraingarh",
                "Mullana",
                "Shahzadpur",
                "Ambala Cantt."
            ],
            "Bhiwani": [
                "Siwani",
                "Tosham",
                "Loharu",
                "Jui"
            ],
            "Faridabad": [
                "Ballabhgarh",
                "Faridabad"
            ],
            "Fatehabad": [
                "Bhattu Kalan",
                "Dharsul",
                "Tohana"
            ],
            "Jind": [
                "Pillukhera",
                "Jullana",
                "Narwana",
                "Safidon",
                "Uchana",
                "New Grain Market , Jind"
            ],
            "Kaithal": [
                "Dhand",
                "Kaithal",
                "Siwan",
                "Pai"
            ],
            "Karnal": [
                "Nilokheri",
                "Jundla",
                "Kunjpura",
                "Nigdu"
            ],
            "Kurukshetra": [
                "Babain",
                "Ladwa",
                "Shahabad",
                "Pipli",
                "Thanesar",
                "Pehowa",
                "Pehowa(Gumthala Gahru)"
            ],
            "Palwal": [
                "Palwal",
                "Hodal"
            ],
            "Panchkula": [
                "Barwala",
                "Raipur Rai"
            ],
            "Panipat": [
                "Panipat",
                "Bapauli"
            ],
            "Rewari": [
                "Rewari"
            ],
            "Rohtak": [
                "Rohtak",
                "Meham"
            ],
            "Sirsa": [
                "Ding",
                "Ellanabad",
                "kalanwali",
                "New Grain Market , Sirsa",
                "Dabwali",
                "Dabwali(Chautala)"
            ],
            "Sonipat": [
                "Ganaur",
                "New Grain Market , Sonipat"
            ]
        },
        "Punjab": {
            "Amritsar": [
                "Ajnala",
                "Attari",
                "Amritsar",
                "Gehri(Jandiala mandi)",
                "Majitha",
                "Mehta",
                "Rayya(Sathiala)",
                "Rayya"
            ],
            "Barnala": [
                "Dhanaula",
                "Mehal Kalan",
                "Mehal Kallan (ChananWal)",
                "Tapa(Tapa Mandi)"
            ],
            "Faridkot": [
                "Jaitu",
                "Jaitu(Bajakhana)",
                "Kotkapura",
                "Sadiq"
            ],
            "Fazilka": [
                "Abohar",
                "Jalalabad"
            ],
            "Gurdaspur": [
                "Dinanagar",
                "Kahnuwan"
            ],
            "Hoshiarpur": [
                "Dasuya",
                "Garh Shankar",
                "GarhShankar (Kotfatuhi)",
                "Garhshankar(Saila Khurd)",
                "Garh Shankar(Mahalpur)"
            ],
            "Jalandhar": [
                "Nakodar(Sarih)",
                "Bilga (Talwan )",
                "Bilga",
                "Jalandhar City(Kartar Pur Dana mandi)",
                "Jalandhar City",
                "Nakodar",
                "Noor Mehal",
                "Noor Mehal(Kot Badal Khan)",
                "Jalandhar City(Faintan Ganj)",
                "Shahkot",
                "Shakot (Malsian)",
                "Jalandhar Cantt (Jamshedpur Dana Mandi)",
                "Jalandhar Cantt."
            ],
            "Ludhiana": [
                "Kila Raipur",
                "Doraha",
                "Hathur",
                "Sahnewal",
                "Samrala",
                "Sidhwan Bet",
                "Sidhwan Bet (Lodhiwala)",
                "Maloud",
                "Mullanpur Dakha (Sawadi)",
                "Machhiwara",
                "Mullanpur"
            ],
            "Mansa": [
                "Bareta",
                "Bhikhi",
                "Boha",
                "Budalada",
                "Budhlada (Phaphre Bhaike)",
                "Mansa",
                "Mansa(Ubha Buraj Dhilwan)",
                "Sardulgarh",
                "Mansa (Khiala kalan)"
            ],
            "Moga": [
                "Badhni Kallan (Bilaspur)",
                "Kot ise Khan",
                "Ajitwal",
                "Ajitwal (Dala)",
                "Ajitwal (Chogawan)"
            ],
            "Patiala": [
                "Bhadson",
                "Dakala",
                "Patran",
                "Patran(Ghagga Mandi)",
                "Samana",
                "Samana(Gajewas)",
                "Samana(Kakrala)",
                "Rajpura",
                "Patiala(New Anaj Mandi)"
            ],
            "Sangrur": [
                "Ahmedgarh",
                "Amargarh",
                "Bhawanigarh",
                "Dhuri",
                "Sherpur",
                "Sulargharat"
            ]
        },
        "Bihar": {
            "Aurangabad": [
                "Aurangabad"
            ],
            "Madhepura": [
                "Bihariganj"
            ],
            "Madhubani": [
                "Jainagar"
            ],
            "Muzaffarpur": [
                "Muzaffarpur"
            ],
            "Samastipur": [
                "Saidpurhat"
            ],
            "Sheikhpura": [
                "Barbigha",
                "Shekhpura"
            ]
        },
        "Karnataka": {
            "Bagalkot": [
                "Badami",
                "Bagalakot"
            ],
            "Bangalore": [
                "Bangalore",
                "Hoskote"
            ],
            "Bellary": [
                "Bellary",
                "Kottur",
                "Hospet"
            ],
            "Bidar": [
                "Basava Kalayana",
                "Bidar"
            ],
            "Chitradurga": [
                "Challakere",
                "Hiriyur"
            ],
            "Dharwad": [
                "Hubli (Amaragol)",
                "Kalagategi",
                "Dharwar",
                "Annigeri"
            ],
            "Gadag": [
                "Gadag",
                "Laxmeshwar",
                "Nargunda"
            ],
            "Hassan": [
                "Arasikere",
                "Hassan"
            ],
            "Haveri": [
                "Haveri"
            ],
            "Kolar": [
                "Bangarpet",
                "Gowribidanoor",
                "Malur"
            ],
            "Koppal": [
                "Koppal",
                "Gangavathi"
            ],
            "Mysore": [
                "Mysore (Bandipalya)"
            ],
            "Raichur": [
                "Manvi"
            ],
            "Shimoga": [
                "Bhadravathi",
                "Shimoga"
            ],
            "Tumkur": [
                "Sira",
                "Tumkur"
            ]
        },
        "West Bengal": {
            "Bankura": [
                "Bishnupur(Bankura)",
                "Khatra"
            ],
            "Birbhum": [
                "Bolpur",
                "Rampurhat",
                "Sainthia",
                "Birbhum"
            ],
            "Murshidabad": [
                "Kandi"
            ],
            "Nadia": [
                "Karimpur"
            ],
            "Paschim Bardhaman": [
                "Asansol",
                "Durgapur"
            ],
            "Uttar Dinajpur": [
                "Kaliaganj",
                "Raiganj"
            ]
        },
        "Himachal Pradesh": {
            "Bilaspur": [
                "Bilaspur",
                "Takhatpur",
                "Pendraroad",
                "Kota",
                "Sakri",
                "Ratanpur",
                "Bilha"
            ],
            "Hamirpur": [
                "Bharuasumerpur",
                "Kurara",
                "Muskara",
                "Maudaha",
                "Raath"
            ]
        },
        "Uttarakhand": {
            "Champawat": [
                "Tanakpur"
            ],
            "Haridwar": [
                "Lakshar",
                "Bhagwanpur(Naveen Mandi Sthal)"
            ]
        },
        "Assam": {
            "Lakhimpur": [
                "Golagokarnath",
                "Lakhimpur",
                "Paliakala"
            ]
        }
    }
      };
      setCommodityData(dummyData);
    } catch (err) {
      console.error(err);
      setError("❌ Failed to load commodity data. Please refresh the page.");
    } finally {
      setDataLoading(false);
    }
  };

  const handleCommodityChange = (e) => {
    const commodity = e.target.value;
    setSelectedCommodity(commodity);
    setSelectedState('');
    setSelectedDistrict('');
    setSelectedMarket('');
    setStates([]);
    setDistricts([]);
    setMarkets([]);
    setShowResult(false);
    
    if (commodity && commodityData[commodity]) {
      setStates(Object.keys(commodityData[commodity]).sort());
    }
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setSelectedDistrict('');
    setSelectedMarket('');
    setDistricts([]);
    setMarkets([]);
    setShowResult(false);
    
    if (state && selectedCommodity && commodityData[selectedCommodity][state]) {
      setDistricts(Object.keys(commodityData[selectedCommodity][state]).sort());
    }
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    setSelectedMarket('');
    setMarkets([]);
    setShowResult(false);
    
    if (district && selectedCommodity && selectedState && 
        commodityData[selectedCommodity][selectedState][district]) {
      setMarkets(commodityData[selectedCommodity][selectedState][district].sort());
    }
  };

  const handleMarketChange = (e) => {
    setSelectedMarket(e.target.value);
    setShowResult(false);
  };

  const convertPrice = (pricePerQuintal, targetUnit) => {
    if (!pricePerQuintal || isNaN(pricePerQuintal)) return '-';
    const factor = conversionFactors[targetUnit];
    const convertedPrice = pricePerQuintal / factor;
    return convertedPrice.toFixed(2);
  };

  const handleUnitChange = (unit) => {
    setCurrentUnit(unit);
  };

  const handlePredict = async () => {
    if (!selectedCommodity || !selectedState || !selectedDistrict || !selectedMarket) {
      alert("⚠️ Please select all required fields: commodity, state, district, and market.");
      return;
    }

    setLoading(true);
    setError('');
    setShowResult(false);

    try {
      const date = new Date(predictionDate);
      const requestBody = {
        "District Name": selectedDistrict,
        "Market Name": selectedMarket,
        "Commodity": selectedCommodity,
        "Variety": selectedVariety,
        "Grade": selectedGrade,
        "day": date.getDate(),
        "month": date.getMonth() + 1,
        "year": date.getFullYear(),
      };

      const response = await fetch('https://ecokisan-ml.onrender.com/predict_prices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPrediction(data);
      setShowResult(true);
    } catch (err) {
      console.error(err);
      setError(`❌ Failed to fetch prediction: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .animate-float { 
          animation: float 3s ease-in-out infinite; 
        }
        .animate-fade-in { 
          animation: fadeIn 0.8s ease-out; 
        }
        .animate-pulse-custom {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .market-forecasting {
          font-family: 'Nunito', sans-serif;
          min-height: 100vh;
          background: linear-gradient(135deg, #c8e6c9 0%, #dcedc8 50%, #f1f8e9 100%);
        }
        
        .hero-section {
          background: linear-gradient(135deg, #2e7d32 0%, #558b2f 100%);
          padding: 40px 20px;
          border-radius: 20px;
          margin-bottom: 30px;
          position: relative;
          overflow: hidden;
        }
        
        .hero-section::before {
          content: '📈';
          position: absolute;
          font-size: 200px;
          opacity: 0.1;
          right: -50px;
          top: -50px;
        }
        
        .info-banner {
          background: linear-gradient(135deg, #fdd835 0%, #fbc02d 100%);
          border-radius: 15px;
          padding: 20px;
          margin: 20px 0;
          display: flex;
          align-items: center;
          gap: 15px;
          box-shadow: 0 8px 20px rgba(253, 216, 53, 0.3);
        }
        
        .feature-icon {
          width: 60px;
          height: 60px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          flex-shrink: 0;
        }
        
        .stats-card {
          background: white;
          border-radius: 20px;
          padding: 25px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          border-left: 5px solid #2e7d32;
        }
        
        .stats-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
        }
        
        .picker-wrapper {
          position: relative;
          margin-bottom: 20px;
        }
        
        .picker-wrapper::after {
          content: '▼';
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: #2e7d32;
          font-size: 12px;
        }
        
        .custom-select, .custom-input {
          height: 55px;
          border: 2px solid #2e7d32;
          border-radius: 15px;
          font-weight: 600;
          padding: 0 40px 0 20px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          appearance: none;
          width: 100%;
        }
        
        .custom-input {
          padding: 0 20px;
        }
        
        .custom-select:focus, .custom-input:focus {
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
          transform: translateY(-2px);
          border-color: #1b5e20;
          outline: none;
        }
        
        .custom-select:disabled {
          background-color: #f5f5f5;
          cursor: not-allowed;
          opacity: 0.6;
        }
        
        .selection-text {
          color: #1b5e20;
          font-size: 18px;
          font-weight: 700;
          margin-top: 20px;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .predict-button {
          background: linear-gradient(135deg, #2e7d32 0%, #558b2f 100%);
          border-radius: 30px;
          padding: 16px 40px;
          border: none;
          box-shadow: 0 8px 20px rgba(46, 125, 50, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 18px;
          font-weight: 700;
          color: white;
          width: 100%;
        }
        
        .predict-button:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(46, 125, 50, 0.4);
        }
        
        .predict-button:disabled {
          background: linear-gradient(135deg, #ccc 0%, #999 100%);
          cursor: not-allowed;
          box-shadow: none;
        }
        
        .result-table {
          margin-bottom: 0;
        }
        
        .result-table thead {
          background: linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%);
          color: white;
        }
        
        .result-table thead th {
          font-weight: 700;
          text-align: center;
          padding: 20px 10px;
          border: none;
          font-size: 14px;
        }
        
        .result-table tbody td {
          text-align: center;
          padding: 20px 10px;
          font-weight: 600;
          font-size: 16px;
          vertical-align: middle;
        }
        
        .price-badge {
          background: linear-gradient(135deg, #4caf50 0%, #8bc34a 100%);
          color: white;
          padding: 8px 16px;
          border-radius: 15px;
          font-size: 16px;
          font-weight: 700;
          display: inline-block;
        }
        
        .spinner-border-custom {
          width: 50px;
          height: 50px;
          color: #2e7d32;
        }
        
        .no-data-text {
          color: #795548;
          text-align: center;
          margin-top: 30px;
          font-size: 18px;
          font-weight: 600;
        }
        
        .unit-button {
          background: white;
          border: 2px solid #2e7d32;
          border-radius: 20px;
          padding: 10px 20px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .unit-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(46, 125, 50, 0.3);
        }
        
        .unit-button.active {
          background: linear-gradient(135deg, #2e7d32 0%, #558b2f 100%);
          color: white;
          border-color: #1b5e20;
        }
        
        .conversion-info {
          background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
          border-radius: 15px;
          padding: 15px;
          margin: 20px 0;
          display: flex;
          align-items: center;
          gap: 15px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .conversion-icon {
          font-size: 40px;
        }
      `}</style>

      <div className="market-forecasting">
        <div className="container py-4">
          {/* Hero Section */}
          <div className="hero-section animate-fade-in">
            <h1 className="text-center text-white display-4 fw-bold mb-3">
              <span className="animate-float" style={{ display: 'inline-block', fontSize: '24px', marginRight: '10px' }}>📈</span>
              Future Price Forecasting
              <span className="animate-float" style={{ display: 'inline-block', fontSize: '24px', marginLeft: '10px' }}>🔮</span>
            </h1>
            <p className="text-center text-white fs-5" style={{ opacity: 0.9 }}>
              Predict future agricultural commodity prices with AI-powered forecasting
            </p>
          </div>

          {/* Info Banner */}
          <div className="info-banner animate-fade-in">
            <div className="feature-icon">🤖</div>
            <div>
              <h3 className="fw-bold fs-5 mb-1" style={{ color: '#1b5e20' }}>AI-Powered Predictions</h3>
              <p className="mb-0" style={{ color: '#33691e', fontSize: '14px' }}>
                Advanced machine learning models analyze historical data to forecast future prices
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="row g-4 mb-4 animate-fade-in">
            {[
              { label: 'ML Models', value: 'Advanced', emoji: '🧠' },
              { label: 'Accuracy', value: '85%+', emoji: '🎯' },
              { label: 'Forecast', value: 'Future', emoji: '⏰' }
            ].map((stat, idx) => (
              <div key={idx} className="col-md-4">
                <div className="stats-card">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="text-muted mb-1 fw-semibold" style={{ fontSize: '14px' }}>{stat.label}</p>
                      <p className="display-5 fw-bold mb-0" style={{ color: '#2e7d32' }}>{stat.value}</p>
                    </div>
                    <div style={{ fontSize: '50px', opacity: 0.2 }}>{stat.emoji}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content Card */}
          <div className="card shadow-lg border-0 animate-fade-in" style={{ borderRadius: '20px' }}>
            <div className="card-body p-4 p-md-5">
              {dataLoading ? (
                <div className="text-center py-5">
                  <div className="spinner-border spinner-border-custom" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="fw-semibold mt-3" style={{ color: '#2e7d32' }}>
                    Loading commodity data... ⏳
                  </p>
                </div>
              ) : (
                <>
                  <div className="row g-4">
                    {/* Commodity Selection */}
                    <div className="col-md-6">
                      <label className="selection-text">
                        <span className="fs-4">🌾</span>
                        Select Commodity
                      </label>
                      <div className="picker-wrapper">
                        <select
                          className="form-select custom-select"
                          value={selectedCommodity}
                          onChange={handleCommodityChange}
                        >
                          <option value="">-- Choose Commodity --</option>
                          {Object.keys(commodityData).sort().map(commodity => (
                            <option key={commodity} value={commodity}>{commodity}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* State Selection */}
                    <div className="col-md-6">
                      <label className="selection-text">
                        <span className="fs-4">🏛️</span>
                        Select State
                      </label>
                      <div className="picker-wrapper">
                        <select
                          className="form-select custom-select"
                          value={selectedState}
                          onChange={handleStateChange}
                          disabled={!selectedCommodity}
                        >
                          <option value="">-- Select State --</option>
                          {states.map(state => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* District Selection */}
                    <div className="col-md-6">
                      <label className="selection-text">
                        <span className="fs-4">🏙️</span>
                        Select District
                      </label>
                      <div className="picker-wrapper">
                        <select
                          className="form-select custom-select"
                          value={selectedDistrict}
                          onChange={handleDistrictChange}
                          disabled={!selectedState}
                        >
                          <option value="">-- Select District --</option>
                          {districts.map(district => (
                            <option key={district} value={district}>{district}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Market Selection */}
                    <div className="col-md-6">
                      <label className="selection-text">
                        <span className="fs-4">🏪</span>
                        Select Market
                      </label>
                      <div className="picker-wrapper">
                        <select
                          className="form-select custom-select"
                          value={selectedMarket}
                          onChange={handleMarketChange}
                          disabled={!selectedDistrict}
                        >
                          <option value="">-- Select Market --</option>
                          {markets.map(market => (
                            <option key={market} value={market}>{market}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Variety Selection */}
                    <div className="col-md-6">
                      <label className="selection-text">
                        <span className="fs-4">🔖</span>
                        Select Variety
                      </label>
                      <div className="picker-wrapper">
                        <select
                          className="form-select custom-select"
                          value={selectedVariety}
                          onChange={(e) => setSelectedVariety(e.target.value)}
                        >
                          {varieties.map(variety => (
                            <option key={variety} value={variety}>{variety}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Grade Selection */}
                    <div className="col-md-6">
                      <label className="selection-text">
                        <span className="fs-4">⭐</span>
                        Select Grade
                      </label>
                      <div className="picker-wrapper">
                        <select
                          className="form-select custom-select"
                          value={selectedGrade}
                          onChange={(e) => setSelectedGrade(e.target.value)}
                        >
                          {grades.map(grade => (
                            <option key={grade} value={grade}>{grade}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Prediction Date */}
                  <label className="selection-text">
                    <span className="fs-4">📅</span>
                    Prediction Date
                  </label>
                  <div className="picker-wrapper">
                    <input
                      type="date"
                      className="form-control custom-input"
                      value={predictionDate}
                      onChange={(e) => setPredictionDate(e.target.value)}
                    />
                  </div>

                  {/* Predict Button */}
                  <button
                    className="predict-button mt-4"
                    onClick={handlePredict}
                    disabled={!selectedCommodity || !selectedState || !selectedDistrict || !selectedMarket || loading}
                  >
                    <span style={{ fontSize: '24px' }}>🔮</span>
                    <span>{loading ? 'Predicting...' : 'Predict Prices'}</span>
                    <span style={{ fontSize: '20px' }}>→</span>
                  </button>

                  {/* Error Message */}
                  {error && (
                    <div className="alert alert-danger mt-4 text-center fw-semibold" role="alert">
                      {error}
                    </div>
                  )}

                  {/* Loading Indicator */}
                  {loading && (
                    <div className="text-center mt-5">
                      <div className="spinner-border spinner-border-custom" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p className="fw-semibold mt-3" style={{ color: '#2e7d32' }}>
                        Analyzing data and predicting prices... 🤖
                      </p>
                    </div>
                  )}

                  {/* Result Section */}
                  {showResult && prediction && (
                    <div className="mt-5 animate-fade-in">
                      <h2 className="text-center fw-bold mb-4" style={{ color: '#2e7d32', fontSize: '24px' }}>
                        📊 Predicted Prices
                      </h2>
                      
                      {/* Unit Selector */}
                      <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
                        {Object.keys(conversionFactors).map(unit => (
                          <button
                            key={unit}
                            className={`unit-button ${currentUnit === unit ? 'active' : ''}`}
                            onClick={() => handleUnitChange(unit)}
                          >
                            <span>
                              {unit === 'quintal' ? '⚖️' : 
                               unit === 'tonne' ? '🏋️' : 
                               unit === 'kg' ? '📦' : 
                               unit === 'pound' ? '💪' : '🪶'}
                            </span>
                            <span>{unitLabels[unit]}</span>
                          </button>
                        ))}
                      </div>

                      {/* Conversion Info */}
                      {currentUnit !== 'quintal' && (
                        <div className="conversion-info">
                          <span className="conversion-icon">⚖️</span>
                          <div>
                            <h4 className="fw-bold mb-1" style={{ color: '#1b5e20', fontSize: '18px' }}>
                              Unit Conversion Active
                            </h4>
                            <p className="mb-0" style={{ color: '#33691e', fontSize: '14px' }}>
                              Prices converted from Quintal (100kg) to {unitLabels[currentUnit]}. 
                              1 Quintal = {conversionFactors[currentUnit].toFixed(2)} {unitLabels[currentUnit]}
                            </p>
                          </div>
                        </div>
                      )}
                      
                      <div className="table-responsive" style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)' }}>
                        <table className="table result-table">
                          <thead>
                            <tr>
                              <th>📅 Date</th>
                              <th>📉 Min Price</th>
                              <th>📈 Max Price</th>
                              <th>💰 Modal Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{predictionDate}</td>
                              <td>₹{convertPrice(prediction["Min Price"], currentUnit)}</td>
                              <td>₹{convertPrice(prediction["Max Price"], currentUnit)}</td>
                              <td>
                                <span className="price-badge">
                                  ₹{convertPrice(prediction["Modal Price"], currentUnit)}
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="text-center mt-4">
                        <p className="mb-0" style={{ color: '#795548', fontSize: '14px' }}>
                          <strong>Note:</strong> Predictions are based on historical data and ML models. 
                          Actual prices may vary due to market conditions.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* No Result Text */}
                  {!showResult && !loading && (
                    <div className="no-data-text">
                      <span className="d-block mb-3" style={{ fontSize: '60px' }}>🔮</span>
                      <p>
                        {selectedCommodity && selectedState && selectedDistrict && selectedMarket
                          ? "All set! Click 'Predict Prices' button above to forecast future prices 🚀"
                          : "Select all filters above and click 'Predict Prices' to see future price forecasts"}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketPriceForecasting;