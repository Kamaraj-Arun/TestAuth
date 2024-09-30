import dealsImg1 from "../assets/deals1.png";
import dealsImg2 from "../assets/deals2.png";
import dealsImg3 from "../assets/deals3.png";
import dealsImg4 from "../assets/deals4.png";
import dealsImg5 from "../assets/deals5.png";
import fbImg from "../assets/facebook.png";
import googleImg from "../assets/google.png";

export const languageOptions = [
  { value: "Tamil", label: "Tamil" },
  { value: "Telugu", label: "Telugu" },
  { value: "Kannada", label: "Kannada" },
  { value: "Hindi", label: "Hindi" },
  { value: "Malayalam", label: "Malayalam" },
];

export const marketOptions = [
  { value: "Asia", label: "Asia" },
  { value: "Europe", label: "Europe" },
  { value: "Africa", label: "Africa" },
  { value: "North America", label: "North America" },
];

export const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "#1B0036",
    border: "none",
    boxShadow: "none",
    "&:hover": {
      border: "none",
    },
  }),
  input: (provided: any) => ({
    ...provided,
    color: "#fff", // Changes input text color
  }),
  menu: (provided: any) => ({
    ...provided,
    zIndex: 9999,
    backgroundColor: "#1B0036",
    color: "#fff",
    fontSize: "14px",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? "" : "#1B0036",
    "&:hover": {
      backgroundColor: "#24113E", // dropdown hover
    },
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: "#4F1787",
    color: "#fff",
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: "#fff",
    fontSize: "14px",
  }),
};

export const customStyles2 = {
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "#2F144B",
    border: "none",
    boxShadow: "none",
    minHeight: "46px",
    "&:hover": {
      border: "none",
    },
  }),
  input: (provided: any) => ({
    ...provided,
    color: "#fff", // Changes input text color
  }),
  menu: (provided: any) => ({
    ...provided,
    zIndex: 9999,
    backgroundColor: "#2F144B",
    color: "#fff",
    fontSize: "14px",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? "" : "#2F144B",
    "&:hover": {
      backgroundColor: "#24113E", // dropdown hover
    },
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: "#1B0036",
    color: "#fff",
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: "#fff",
    fontSize: "14px",
  }),
  singleValue: (provided: any, state: any) => ({
    ...provided,
    color: "#fff", // Set single value color to white
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "#fff", // Set placeholder color to white
  }),
};

export const producerOptions = [
  { value: "Allu Aravind", label: "Allu Aravind" },
  { value: "Daggubati Suresh Babu", label: "Daggubati Suresh Babu" },
  { value: "Kalaipuli S. Thanu", label: "Kalaipuli S. Thanu" },
  { value: "Dil Raju", label: "Dil Raju" },
];

export const directorOptions = [
  { value: "Rajamouli", label: "Rajamouli" },
  { value: "Shankar", label: "Shankar" },
  { value: "Trivikram", label: "Trivikram" },
  { value: "Shiva", label: "Shiva" },
];

export const starOptions = [
  { value: "Mahesh Babu", label: "Mahesh Babu" },
  { value: "Balayya", label: "Balayya" },
  { value: "Sreelela", label: "Sreelela" },
  { value: "Vikram", label: "Vikram" },
];

export const yearOptions = [
  { value: "2024", label: "2024" },
  { value: "2023", label: "2023" },
  { value: "2022", label: "2022" },
  { value: "2021", label: "2021" },
  { value: "2020", label: "2020" },
  { value: "2019", label: "2019" },
  { value: "2018", label: "2018" },
  { value: "2017", label: "2017" },
  { value: "2016", label: "2016" },
  { value: "2015", label: "2015" },
  { value: "2014", label: "2014" },
  { value: "2013", label: "2013" },
  { value: "2012", label: "2012" },
  { value: "2011", label: "2011" },
  { value: "2010", label: "2010" },
  { value: "2009", label: "2009" },
  { value: "2008", label: "2008" },
  { value: "2007", label: "2007" },
  { value: "2006", label: "2006" },
  { value: "2005", label: "2005" },
  { value: "2004", label: "2004" },
  { value: "2003", label: "2003" },
  { value: "2002", label: "2002" },
  { value: "2001", label: "2001" },
  { value: "2000", label: "2000" },
  { value: "1999", label: "1999" },
  { value: "1998", label: "1998" },
  { value: "1997", label: "1997" },
  { value: "1996", label: "1996" },
  { value: "1995", label: "1995" },
  { value: "1994", label: "1994" },
  { value: "1993", label: "1993" },
  { value: "1992", label: "1992" },
  { value: "1991", label: "1991" },
  { value: "1990", label: "1990" },
  { value: "1989", label: "1989" },
  { value: "1988", label: "1988" },
  { value: "1987", label: "1987" },
  { value: "1986", label: "1986" },
  { value: "1985", label: "1985" },
  { value: "1984", label: "1984" },
  { value: "1983", label: "1983" },
  { value: "1982", label: "1982" },
  { value: "1981", label: "1981" },
  { value: "1980", label: "1980" },
  { value: "1979", label: "1979" },
  { value: "1978", label: "1978" },
  { value: "1977", label: "1977" },
  { value: "1976", label: "1976" },
  { value: "1975", label: "1975" },
  { value: "1974", label: "1974" },
  { value: "1973", label: "1973" },
  { value: "1972", label: "1972" },
  { value: "1971", label: "1971" },
  { value: "1970", label: "1970" },
  { value: "1969", label: "1969" },
  { value: "1968", label: "1968" },
  { value: "1967", label: "1967" },
  { value: "1966", label: "1966" },
  { value: "1965", label: "1965" },
  { value: "1964", label: "1964" },
  { value: "1963", label: "1963" },
  { value: "1962", label: "1962" },
  { value: "1961", label: "1961" },
  { value: "1960", label: "1960" },
  { value: "1959", label: "1959" },
  { value: "1958", label: "1958" },
  { value: "1957", label: "1957" },
  { value: "1956", label: "1956" },
  { value: "1955", label: "1955" },
  { value: "1954", label: "1954" },
  { value: "1953", label: "1953" },
  { value: "1952", label: "1952" },
  { value: "1951", label: "1951" },
  { value: "1950", label: "1950" },
];

export const dealsData = [
  {
    id: "1",
    pic: dealsImg1,
    title: "MAAYAVAN",
  },
  {
    id: "2",
    pic: dealsImg2,
    title: "BIG FAN",
  },
  {
    id: "3",
    pic: dealsImg3,
    title: "THROUGH THE GLASS DARKLY",
  },
  {
    id: "4",
    pic: dealsImg4,
    title: "I REMEMBER YOU",
  },
  {
    id: "5",
    pic: dealsImg5,
    title: "THE HEIST OF THE CENTURY",
  },
];

export const recentDeals = [
  "https://producerbazzarstorage.blob.core.windows.net/recent-deals-poster/BIGGEST-FAN.jpg",
  "https://producerbazzarstorage.blob.core.windows.net/recent-deals-poster/Breaking-Surface.jpg",
  "https://producerbazzarstorage.blob.core.windows.net/recent-deals-poster/Daniel.jpg",
  "https://producerbazzarstorage.blob.core.windows.net/recent-deals-poster/Fear-of-Rain.jpg",
  "https://producerbazzarstorage.blob.core.windows.net/recent-deals-poster/Gatecrash.jpg",
  "https://producerbazzarstorage.blob.core.windows.net/recent-deals-poster/Heroic-Losers.jpg",
  "https://producerbazzarstorage.blob.core.windows.net/recent-deals-poster/How-to-make-out.jpg",
  "https://producerbazzarstorage.blob.core.windows.net/recent-deals-poster/I-remember-you.jpg",
  "https://producerbazzarstorage.blob.core.windows.net/recent-deals-poster/INTO-THE-DARKNESS.jpg",
  "https://producerbazzarstorage.blob.core.windows.net/recent-deals-poster/Maayavan.jpg",
  "https://producerbazzarstorage.blob.core.windows.net/recent-deals-poster/Malasana 32.jpg",
  "https://producerbazzarstorage.blob.core.windows.net/recent-deals-poster/Martyrs-Lane.jpg",
  "https://producerbazzarstorage.blob.core.windows.net/recent-deals-poster/Night-Drive.jpg",
  "https://producerbazzarstorage.blob.core.windows.net/recent-deals-poster/Run-Hide-Fight.jpg",
  "https://producerbazzarstorage.blob.core.windows.net/recent-deals-poster/Shorta.jpg",
  "https://producerbazzarstorage.blob.core.windows.net/recent-deals-poster/Space-Walker.jpg",
  "https://producerbazzarstorage.blob.core.windows.net/recent-deals-poster/THROUGH-THE-GLASS-DARKLY.jpg",
  "https://producerbazzarstorage.blob.core.windows.net/recent-deals-poster/The-Hating-Game.jpg",
  "https://producerbazzarstorage.blob.core.windows.net/recent-deals-poster/The-Heist-of-the-century.jpg",
  "https://producerbazzarstorage.blob.core.windows.net/recent-deals-poster/The-Sunlit-Night.jpg",
  "https://producerbazzarstorage.blob.core.windows.net/recent-deals-poster/The-Trip.jpg",
  "https://producerbazzarstorage.blob.core.windows.net/recent-deals-poster/The-Tunnel.jpg",
  "https://producerbazzarstorage.blob.core.windows.net/recent-deals-poster/The-girl-with-a-bracelet.jpg",
];

export const contentTypes = [
  {
    id: 1,
    item: "Feature Film",
  },
  {
    id: 2,
    item: "Web Series",
  },
  {
    id: 3,
    item: "Documentary",
  },
  {
    id: 4,
    item: "Short Film",
  },
  {
    id: 5,
    item: "TV Series",
  },
  {
    id: 6,
    item: "Live Shows",
  },
];

export const genreTypes = [
  {
    id: 11,
    item: "Action",
  },
  {
    id: 12,
    item: "Romance",
  },
  {
    id: 13,
    item: "Comedy",
  },
  {
    id: 14,
    item: "Thriller",
  },
  {
    id: 15,
    item: "Drama",
  },
  {
    id: 16,
    item: "Horror",
  },
  {
    id: 17,
    item: "Fiction",
  },
  {
    id: 18,
    item: "Others",
  },
];

export const indianRatingTypes = [
  {
    id: 21,
    item: "U/A",
  },
  {
    id: 22,
    item: "U",
  },
  {
    id: 23,
    item: "A",
  },
  {
    id: 24,
    item: "S",
  },
];

export const internationalRatingTypes = [
  {
    id: 31,
    item: "G",
  },
  {
    id: 32,
    item: "PG",
  },
  {
    id: 33,
    item: "R",
  },
  {
    id: 34,
    item: "PG-13",
  },
  {
    id: 35,
    item: "NC-17",
  },
];

export const rightsTypes = [
  {
    id: 41,
    item: "Actions",
  },
  {
    id: 42,
    item: "Digital",
  },
  {
    id: 43,
    item: "Dubbing",
  },
  {
    id: 44,
    item: "Travel",
  },
  {
    id: 45,
    item: "Theatrical",
  },
  {
    id: 46,
    item: "Satellite",
  },
  {
    id: 47,
    item: "Remake",
  },
  {
    id: 48,
    item: "Overseas",
  },
  {
    id: 49,
    item: "Others",
  },
];

export const socialLogin = [
  {
    id: 1,
    pic: fbImg,
  },
  {
    id: 2,
    pic: googleImg,
  },
];

export const signInSliderContents = [
  {
    id: 1,
    content: "The fastest growing digital rights marketplace",
  },
  {
    id: 2,
    content: "The rapidly expanding digital rights platform",
  },
  {
    id: 3,
    content: "The most dynamic marketplace for digital rights acquisition",
  },
];

export const movieGenreTypes = [
  {
    id: 1,
    name: "Action",
  },
  {
    id: 2,
    name: "Comedy",
  },
  {
    id: 3,
    name: "Drama",
  },
  {
    id: 4,
    name: "Fiction",
  },
  {
    id: 5,
    name: "Romance",
  },
  {
    id: 6,
    name: "Thriller",
  },
  {
    id: 7,
    name: "Horror",
  },
  {
    id: 8,
    name: "Others",
  },
];

export const masterRightTypes = [
  {
    id: 1,
    rightType: "Theatrical Rights",
    isMandatory: true,
    options: [
      {
        id: 11,
        name: "Regional",
      },
      {
        id: 12,
        name: "National",
      },
    ],
  },
  {
    id: 2,
    rightType: "Television Rights",
    isMandatory: true,
    options: [
      {
        id: 21,
        name: "Regional",
      },
      {
        id: 22,
        name: "National",
      },
      {
        id: 23,
        name: "Cable Rights",
      },
    ],
  },
  {
    id: 3,
    rightType: "Digital Rights",
    isMandatory: true,
    options: [
      {
        id: 31,
        name: "TVOD",
      },
      {
        id: 32,
        name: "AVOD",
      },
      {
        id: 33,
        name: "SVOD",
      },
      {
        id: 34,
        name: "Original Rights",
      },
    ],
  },
  {
    id: 4,
    rightType: "Travel Rights",
    isMandatory: true,
    options: [
      {
        id: 41,
        name: "Airborne Rights",
      },
    ],
  },
  {
    id: 5,
    rightType: "Audio",
    isMandatory: true,
    options: [
      {
        id: 51,
        name: "Audio Rights",
      },
      {
        id: 52,
        name: "Making Rights",
      },
    ],
  },
  {
    id: 6,
    rightType: "Dubbing & Remake Rights",
    isMandatory: true,
    options: [
      {
        id: 61,
        name: "Regional",
      },
      {
        id: 62,
        name: "National",
      },
      {
        id: 63,
        name: "International",
      },
    ],
  },
  {
    id: 7,
    rightType: "Overseas Rights",
    isMandatory: true,
    options: [
      {
        id: 71,
        name: "Theatrical Rights",
      },
      {
        id: 72,
        name: "Satellite Rights",
      },
      {
        id: 73,
        name: "Digital Rights",
      },
      {
        id: 74,
        name: "International Dubbing & Remake",
      },
    ],
  },
  {
    id: 8,
    rightType: "Emerging Rights",
    isMandatory: true,
    options: [
      {
        id: 81,
        name: "AR/VR/XR",
      },
      {
        id: 82,
        name: "Metaverse",
      },
      {
        id: 83,
        name: "Video Commerce",
      },
      {
        id: 84,
        name: "Dialect",
      },
      {
        id: 85,
        name: "Subtitle",
      },
    ],
  },
  {
    id: 9,
    rightType: " Other Rights",
    isMandatory: true,
    options: [
      {
        id: 91,
        name: "Gaming Rights",
      },
      {
        id: 92,
        name: "Animation Rights",
      },
      {
        id: 93,
        name: "Non Exclusive Rights",
      },
    ],
  },
];

export const copyRightTypes = [
  {
    id: 6,
    name: "Script",
  },
  {
    id: 7,
    name: "Music",
  },
  {
    id: 8,
    name: "Full Movie",
  },
];

export const internationalMovieRatingOptions = [
  { value: "G - General Audiences", label: "G - General Audiences" },
  { value: "U - Unrestricted", label: "U - Unrestricted" },
];

export const indianMovieRatingOptions = [
  { value: "G - General Audiences", label: "G - General Audiences" },
  { value: "U - Unrestricted", label: "U - Unrestricted" },
];

export const CallingCodes = [
  { v: "India", value: "91", code: "IN" },
  { country: "Afghanistan", value: "93", code: "AF" },
  { country: "Albania", value: "355", code: "AL" },
  { country: "Algeria", value: "213", code: "DZ" },
  { country: "American Samoa", value: "1-684", code: "AS" },
  { country: "Andorra", value: "376", code: "AD" },
  { country: "Angola", value: "244", code: "AO" },
  { country: "Anguilla", value: "1-264", code: "AI" },
  { country: "Antarctica", value: "672", code: "AQ" },
  { country: "Antigua and Barbuda", value: "1-268", code: "AG" },
  { country: "Argentina", value: "54", code: "AR" },
  { country: "Armenia", value: "374", code: "AM" },
  { country: "Aruba", value: "297", code: "AW" },
  { country: "Australia", value: "61", code: "AU" },
  { country: "Austria", value: "43", code: "AT" },
  { country: "Azerbaijan", value: "994", code: "AZ" },
  { country: "Bahamas", value: "1-242", code: "BS" },
  { country: "Bahrain", value: "973", code: "BH" },
  { country: "Bangladesh", value: "880", code: "BD" },
  { country: "Barbados", value: "1-246", code: "BB" },
  { country: "Belarus", value: "375", code: "BY" },
  { country: "Belgium", value: "32", code: "BE" },
  { country: "Belize", value: "501", code: "BZ" },
  { country: "Benin", value: "229", code: "BJ" },
  { country: "Bermuda", value: "1-441", code: "BM" },
  { country: "Bhutan", value: "975", code: "BT" },
  { country: "Bolivia", value: "591", code: "BO" },
  { country: "Bosnia and Herzegovina", value: "387", code: "BA" },
  { country: "Botswana", value: "267", code: "BW" },
  { country: "Brazil", value: "55", code: "BR" },
  { country: "British Indian Ocean Territory", value: "246", code: "IO" },
  { country: "British Virgin Islands", value: "1-284", code: "VG" },
  { country: "Brunei", value: "673", code: "BN" },
  { country: "Bulgaria", value: "359", code: "BG" },
  { country: "Burkina Faso", value: "226", code: "BF" },
  { country: "Burundi", value: "257", code: "BI" },
  { country: "Cambodia", value: "855", code: "KH" },
  { country: "Cameroon", value: "237", code: "CM" },
  { country: "Canada", value: "1", code: "CA" },
  { country: "Cape Verde", value: "238", code: "CV" },
  { country: "Cayman Islands", value: "1-345", code: "KY" },
  { country: "Central African Republic", value: "236", code: "CF" },
  { country: "Chad", value: "235", code: "TD" },
  { country: "Chile", value: "56", code: "CL" },
  { country: "China", value: "86", code: "CN" },
  { country: "Christmas Island", value: "61", code: "CX" },
  { country: "Cocos Islands", value: "61", code: "CC" },
  { country: "Colombia", value: "57", code: "CO" },
  { country: "Comoros", value: "269", code: "KM" },
  { country: "Cook Islands", value: "682", code: "CK" },
  { country: "Costa Rica", value: "506", code: "CR" },
  { country: "Croatia", value: "385", code: "HR" },
  { country: "Cuba", value: "53", code: "CU" },
  { country: "Curacao", value: "599", code: "CW" },
  { country: "Cyprus", value: "357", code: "CY" },
  { country: "Czech Republic", value: "420", code: "CZ" },
  { country: "Democratic Republic of the Congo", value: "243", code: "CD" },
  { country: "Denmark", value: "45", code: "DK" },
  { country: "Djibouti", value: "253", code: "DJ" },
  { country: "Dominica", value: "1-767", code: "DM" },
  { country: "Dominican Republic (1-809)", value: "1-809", code: "DO" },
  { country: "Dominican Republic (1-829)", value: "1-829", code: "DO" },
  { country: "Dominican Republic (1-849)", value: "1-849", code: "DO" },
  { country: "East Timor", value: "670", code: "TL" },
  { country: "Ecuador", value: "593", code: "EC" },
  { country: "Egypt", value: "20", code: "EG" },
  { country: "El Salvador", value: "503", code: "SV" },
  { country: "Equatorial Guinea", value: "240", code: "GQ" },
  { country: "Eritrea", value: "291", code: "ER" },
  { country: "Estonia", value: "372", code: "EE" },
  { country: "Ethiopia", value: "251", code: "ET" },
  { country: "Falkland Islands", value: "500", code: "FK" },
  { country: "Faroe Islands", value: "298", code: "FO" },
  { country: "Fiji", value: "679", code: "FJ" },
  { country: "Finland", value: "358", code: "FI" },
  { country: "France", value: "33", code: "FR" },
  { country: "French Polynesia", value: "689", code: "PF" },
  { country: "Gabon", value: "241", code: "GA" },
  { country: "Gambia", value: "220", code: "GM" },
  { country: "Georgia", value: "995", code: "GE" },
  { country: "Germany", value: "49", code: "DE" },
  { country: "Ghana", value: "233", code: "GH" },
  { country: "Gibraltar", value: "350", code: "GI" },
  { country: "Greece", value: "30", code: "GR" },
  { country: "Greenland", value: "299", code: "GL" },
  { country: "Grenada", value: "1-473", code: "GD" },
  { country: "Guam", value: "1-671", code: "GU" },
  { country: "Guatemala", value: "502", code: "GT" },
  { country: "Guernsey", value: "44-1481", code: "GG" },
  { country: "Guinea", value: "224", code: "GN" },
  { country: "Guinea-Bissau", value: "245", code: "GW" },
  { country: "Guyana", value: "592", code: "GY" },
  { country: "Haiti", value: "509", code: "HT" },
  { country: "Honduras", value: "504", code: "HN" },
  { country: "Hong Kong", value: "852", code: "HK" },
  { country: "Hungary", value: "36", code: "HU" },
  { country: "Iceland", value: "354", code: "IS" },
  { country: "Indonesia", value: "62", code: "ID" },
  { country: "Iran", value: "98", code: "IR" },
  { country: "Iraq", value: "964", code: "IQ" },
  { country: "Ireland", value: "353", code: "IE" },
  { country: "Isle of Man", value: "44-1624", code: "IM" },
  { country: "Israel", value: "972", code: "IL" },
  { country: "Italy", value: "39", code: "IT" },
  { country: "Ivory Coast", value: "225", code: "CI" },
  { country: "Jamaica", value: "1-876", code: "JM" },
  { country: "Japan", value: "81", code: "JP" },
  { country: "Jersey", value: "44-1534", code: "JE" },
  { country: "Jordan", value: "962", code: "JO" },
  { country: "Kazakhstan", value: "7", code: "KZ" },
  { country: "Kenya", value: "254", code: "KE" },
  { country: "Kiribati", value: "686", code: "KI" },
  { country: "Kosovo", value: "383", code: "XK" },
  { country: "Kuwait", value: "965", code: "KW" },
  { country: "Kyrgyzstan", value: "996", code: "KG" },
  { country: "Laos", value: "856", code: "LA" },
  { country: "Latvia", value: "371", code: "LV" },
  { country: "Lebanon", value: "961", code: "LB" },
  { country: "Lesotho", value: "266", code: "LS" },
  { country: "Liberia", value: "231", code: "LR" },
  { country: "Libya", value: "218", code: "LY" },
  { country: "Liechtenstein", value: "423", code: "LI" },
  { country: "Lithuania", value: "370", code: "LT" },
  { country: "Luxembourg", value: "352", code: "LU" },
  { country: "Macau", value: "853", code: "MO" },
  { country: "Macedonia", value: "389", code: "MK" },
  { country: "Madagascar", value: "261", code: "MG" },
  { country: "Malawi", value: "265", code: "MW" },
  { country: "Malaysia", value: "60", code: "MY" },
  { country: "Maldives", value: "960", code: "MV" },
  { country: "Mali", value: "223", code: "ML" },
  { country: "Malta", value: "356", code: "MT" },
  { country: "Marshall Islands", value: "692", code: "MH" },
  { country: "Mauritania", value: "222", code: "MR" },
  { country: "Mauritius", value: "230", code: "MU" },
  { country: "Mayotte", value: "262", code: "YT" },
  { country: "Mexico", value: "52", code: "MX" },
  { country: "Micronesia", value: "691", code: "FM" },
  { country: "Moldova", value: "373", code: "MD" },
  { country: "Monaco", value: "377", code: "MC" },
  { country: "Mongolia", value: "976", code: "MN" },
  { country: "Montenegro", value: "382", code: "ME" },
  { country: "Montserrat", value: "1-664", code: "MS" },
  { country: "Morocco", value: "212", code: "MA" },
  { country: "Mozambique", value: "258", code: "MZ" },
  { country: "Myanmar", value: "95", code: "MM" },
  { country: "Namibia", value: "264", code: "NA" },
  { country: "Nauru", value: "674", code: "NR" },
  { country: "Nepal", value: "977", code: "NP" },
  { country: "Netherlands", value: "31", code: "NL" },
  { country: "Netherlands Antilles", value: "599", code: "AN" },
  { country: "New Caledonia", value: "687", code: "NC" },
  { country: "New Zealand", value: "64", code: "NZ" },
  { country: "Nicaragua", value: "505", code: "NI" },
  { country: "Niger", value: "227", code: "NE" },
  { country: "Nigeria", value: "234", code: "NG" },
  { country: "Niue", value: "683", code: "NU" },
  { country: "North Korea", value: "850", code: "KP" },
  { country: "Northern Mariana Islands", value: "1-670", code: "MP" },
  { country: "Norway", value: "47", code: "NO" },
  { country: "Oman", value: "968", code: "OM" },
  { country: "Pakistan", value: "92", code: "PK" },
  { country: "Palau", value: "680", code: "PW" },
  { country: "Palestine", value: "970", code: "PS" },
  { country: "Panama", value: "507", code: "PA" },
  { country: "Papua New Guinea", value: "675", code: "PG" },
  { country: "Paraguay", value: "595", code: "PY" },
  { country: "Peru", value: "51", code: "PE" },
  { country: "Philippines", value: "63", code: "PH" },
  { country: "Pitcairn", value: "64", code: "PN" },
  { country: "Poland", value: "48", code: "PL" },
  { country: "Portugal", value: "351", code: "PT" },
  { country: "Puerto Rico (1-787)", value: "1-787", code: "PR" },
  { country: "Puerto Rico (1-939)", value: "1-939", code: "PR" },
  { country: "Qatar", value: "974", code: "QA" },
  { country: "Republic of the Congo", value: "242", code: "CG" },
  { country: "Reunion", value: "262", code: "RE" },
  { country: "Romania", value: "40", code: "RO" },
  { country: "Russia", value: "7", code: "RU" },
  { country: "Rwanda", value: "250", code: "RW" },
  { country: "Saint Barthelemy", value: "590", code: "BL" },
  { country: "Saint Helena", value: "290", code: "SH" },
  { country: "Saint Kitts and Nevis", value: "1-869", code: "KN" },
  { country: "Saint Lucia", value: "1-758", code: "LC" },
  { country: "Saint Martin", value: "590", code: "MF" },
  { country: "Saint Pierre and Miquelon", value: "508", code: "PM" },
  { country: "Saint Vincent and the Grenadines", value: "1-784", code: "VC" },
  { country: "Samoa", value: "685", code: "WS" },
  { country: "San Marino", value: "378", code: "SM" },
  { country: "Sao Tome and Principe", value: "239", code: "ST" },
  { country: "Saudi Arabia", value: "966", code: "SA" },
  { country: "Senegal", value: "221", code: "SN" },
  { country: "Serbia", value: "381", code: "RS" },
  { country: "Seychelles", value: "248", code: "SC" },
  { country: "Sierra Leone", value: "232", code: "SL" },
  { country: "Singapore", value: "65", code: "SG" },
  { country: "Sint Maarten", value: "1-721", code: "SX" },
  { country: "Slovakia", value: "421", code: "SK" },
  { country: "Slovenia", value: "386", code: "SI" },
  { country: "Solomon Islands", value: "677", code: "SB" },
  { country: "Somalia", value: "252", code: "SO" },
  { country: "South Africa", value: "27", code: "ZA" },
  { country: "South Korea", value: "82", code: "KR" },
  { country: "South Sudan", value: "211", code: "SS" },
  { country: "Spain", value: "34", code: "ES" },
  { country: "Sri Lanka", value: "94", code: "LK" },
  { country: "Sudan", value: "249", code: "SD" },
  { country: "Suriname", value: "597", code: "SR" },
  { country: "Svalbard and Jan Mayen", value: "47", code: "SJ" },
  { country: "Swaziland", value: "268", code: "SZ" },
  { country: "Sweden", value: "46", code: "SE" },
  { country: "Switzerland", value: "41", code: "CH" },
  { country: "Syria", value: "963", code: "SY" },
  { country: "Taiwan", value: "886", code: "TW" },
  { country: "Tajikistan", value: "992", code: "TJ" },
  { country: "Tanzania", value: "255", code: "TZ" },
  { country: "Thailand", value: "66", code: "TH" },
  { country: "Togo", value: "228", code: "TG" },
  { country: "Tokelau", value: "690", code: "TK" },
  { country: "Tonga", value: "676", code: "TO" },
  { country: "Trinidad and Tobago", value: "1-868", code: "TT" },
  { country: "Tunisia", value: "216", code: "TN" },
  { country: "Turkey", value: "90", code: "TR" },
  { country: "Turkmenistan", value: "993", code: "TM" },
  { country: "Turks and Caicos Islands", value: "1-649", code: "TC" },
  { country: "Tuvalu", value: "688", code: "TV" },
  { country: "U.S. Virgin Islands", value: "1-340", code: "VI" },
  { country: "Uganda", value: "256", code: "UG" },
  { country: "Ukraine", value: "380", code: "UA" },
  { country: "United Arab Emirates", value: "971", code: "AE" },
  { country: "United Kingdom", value: "44", code: "GB" },
  { country: "United States", value: "1", code: "US" },
  { country: "Uruguay", value: "598", code: "UY" },
  { country: "Uzbekistan", value: "998", code: "UZ" },
  { country: "Vanuatu", value: "678", code: "VU" },
  { country: "Vatican", value: "379", code: "VA" },
  { country: "Venezuela", value: "58", code: "VE" },
  { country: "Vietnam", value: "84", code: "VN" },
  { country: "Wallis and Futuna", value: "681", code: "WF" },
  { country: "Western Sahara", value: "212", code: "EH" },
  { country: "Yemen", value: "967", code: "YE" },
  { country: "Zambia", value: "260", code: "ZM" },
  { country: "Zimbabwe", value: "263", code: "ZW" },
];

export const contentTypeMenu = [
  {
    id: 1,
    title: "Feature Film",
  },
  {
    id: 2,
    title: "Web Series",
  },
  {
    id: 3,
    title: "Documentary",
  },
  {
    id: 4,
    title: "Short Film",
  },
  {
    id: 5,
    title: "Television Series",
  },
  {
    id: 6,
    title: "Events & Live Shows",
  },
  {
    id: 7,
    title: "Music Albums",
  },
];

export const movieStatusTypeMenu = [
  {
    id: 1,
    title: "Released",
  },
  {
    id: 2,
    title: "Un Released",
  },
  {
    id: 3,
    title: "Under Production",
  },
];

export const starringOptions = [
  { value: "Rajinikanth", label: "Rajinikanth" },
  { value: "Soundarya", label: "Soundarya" },
  { value: "dhanush", label: "dhanush" },
  { value: "vijay", label: "vijay" },
  { value: "ajith", label: "ajith" },
  { value: "surya", label: "surya" },
  { value: "kamal", label: "kamal" },
];

export const crewTitleOptions = [
  { value: "Producer", label: "Producer" },
  { value: "Co-Producer", label: "Co-Producer" },
  { value: "Director", label: "Director" },
  { value: "Cinematographer", label: "Cinematographer" },
  { value: "Music", label: "Music" },
  { value: "Editor", label: "Editor" },
  { value: "PRO", label: "PRO" },
];
