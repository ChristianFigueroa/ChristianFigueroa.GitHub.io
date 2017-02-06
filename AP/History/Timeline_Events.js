!function() {
	var Ranged = 1,
		Point = 2
		Asia = 1
		Africa = 2
		Europe = 4
		Oceania = 8
		Americas = 16;
	window.EVENTS = [
		{
			text: 'Era of Sumerian dominance in {{Mesopotamia|Mesopotamia}}',
			type: Ranged,
			year1: -3200,
			year2: -2350,
			chapter: 2,
			region: Asia,
			layer: 1
		},{
			text: 'Era of Indo-European migrations',
			type: Ranged,
			year1: -3000,
			year2: -1000,
			chapter: 2,
			region: Asia,
			layer: 2
		},{
			text: 'Era of Babylonian dominance in {{Mesopotamia|Mesopotamia}}',
			type: Ranged,
			year1: -2350,
			year2: -1600,
			chapter: 2,
			region: Asia,
			layer: 3
		},{
			text: 'Reign of Sargon of Akkad',
			type: Ranged,
			year1: -2334,
			year2: -2315,
			chapter: 2,
			region: Asia,
			layer: 1
		},{
			text: 'Era of Hittite dominance in Anatolia',
			type: Ranged,
			year1: -1700,
			year2: -1200,
			chapter: 2,
			region: Asia,
			layer: 4
		},{
			text: 'Era of Assyrian dominance in {{Mesopotamia|Mesopotamia}}',
			type: Ranged,
			year1: -1000,
			year2: -612,
			chapter: 2,
			region: Asia,
			layer: 8
		},{
			text: 'Reign of Israelite King David',
			type: Ranged,
			year1: -1000,
			year2: -970,
			chapter: 2,
			region: Asia,
			layer: 3
		},{
			text: 'Reign of Israelite King Solomon',
			type: Ranged,
			year1: -970,
			year2: -940,
			chapter: 2,
			region: Asia,
			layer: 2
		},{
			text: 'Reign of Nebuchadnezzar',
			type: Ranged,
			year1: -605,
			year2: -562,
			chapter: 2,
			region: Asia,
			layer: 2
		},{
			text: 'New Babylonian Empire',
			type: Ranged,
			year1: -600,
			year2: -550,
			chapter: 2,
			region: Asia,
			layer: 3
		},{
			text: 'Assyrian conquest of the kingdom of Israel',
			type: Point,
			year: -722,
			chapter: 2,
			region: Asia,
			layer: 2
		},{
			text: 'New Babylonian conquest of the kingdom of Judah',
			type: Point,
			year: -586,
			chapter: 2,
			region: Asia,
			layer: 8
		},{
			text: 'Archaic Period of Egyptian history',
			type: Ranged,
			year1: -3100,
			year2: -2660,
			chapter: 3,
			region: Africa,
			layer: 3
		},{
			text: 'Egyptian Old Kingdom',
			type: Ranged,
			year1: -2660,
			year2: -2160,
			chapter: 3,
			region: Africa,
			layer: 4
		},{
			text: 'Era of pyramid building in Egypt',
			type: Ranged,
			year1: -2600,
			year2: -2500,
			chapter: 3,
			region: Africa,
			layer: 3
		},{
			text: 'Early kingdom of Kush with capital at Kerma',
			type: Ranged,
			year1: -2500,
			year2: -1450,
			chapter: 3,
			region: Africa,
			layer: 5
		},{
			text: 'Egyptian New Kingdom',
			type: Ranged,
			year1: -1550,
			year2: -1070,
			chapter: 3,
			region: Africa,
			layer: 3
		},{
			text: 'Reign of Pharaoh Tuthmosis III',
			type: Ranged,
			year1: -1479,
			year2: -1425,
			chapter: 3,
			region: Africa,
			layer: 1
		},{
			text: 'Reign of Queen Hatshepsut (coruler with Tuthmosis III)',
			type: Ranged,
			year1: -1473,
			year2: -1458,
			chapter: 3,
			region: Africa,
			layer: 7
		},{
			text: 'Reign of Amenhotep IV (Akhenaten)',
			type: Ranged,
			year1: -1353,
			year2: -1335,
			chapter: 3,
			region: Africa,
			layer: 1
		},{
			text: 'Unification of Egypt',
			type: Point,
			year: -3100,
			chapter: 3,
			region: Africa,
			layer: 2
		},{
			text: 'Beginning of Bantu migrations',
			type: Point,
			year: -2000,
			chapter: 3,
			region: Africa,
			layer: 1
		},{
			text: 'Invention of iron metallurgy in sub-Saharan Africa',
			type: Point,
			year: -900,
			chapter: 3,
			region: Africa,
			layer: 2
		},{
			text: 'Conquest of Egypt by King Kashta of Kush',
			type: Point,
			year: -760,
			chapter: 3,
			region: Africa,
			layer: 2
		},{
			text: 'High point of {{Harappan%20Society|Harappan society}}',
			type: Ranged,
			year1: -2500,
			year2: -2000,
			chapter: 4,
			region: Asia,
			layer: 6
		},{
			text: '{{Vedas|Vedic Age}}',
			type: Ranged,
			year1: -1500,
			year2: -500,
			chapter: 4,
			region: Asia,
			layer: 6
		},{
			text: 'Composition of the Rig Veda',
			type: Ranged,
			year1: -1400,
			year2: -900,
			chapter: 4,
			region: Asia,
			layer: 7
		},{
			text: 'Formation of regional kingdoms in northern India',
			type: Ranged,
			year1: -1000,
			year2: -500,
			chapter: 4,
			region: Asia,
			layer: 5
		},{
			text: 'Composition of the principal Upanishads',
			type: Ranged,
			year1: -800,
			year2: -400,
			chapter: 4,
			region: Asia,
			layer: 7
		},{
			text: 'Beginning of {{Harrapan%20Society|Harappan}} decline',
			type: Point,
			year: -1900,
			chapter: 4,
			region: Asia,
			layer: 1
		},{
			text: 'Beginning of Aryan migration to India',
			type: Point,
			year: -1500,
			chapter: 4,
			region: Asia,
			layer: 1
		},{
			text: 'Early Aryan migrations into the Ganges River valley',
			type: Point,
			year: -1000,
			chapter: 4,
			region: Asia,
			layer: 13
		},{
			text: 'Emergence of varna distinctions',
			type: Point,
			year: -1000,
			chapter: 4,
			region: Asia,
			layer: 12
		},{
			text: 'Establishment of the first Aryan cities in the Ganges valley',
			type: Point,
			year: -750,
			chapter: 4,
			region: Asia,
			layer: 2
		},{
			text: 'Early Aryan migrations to the Deccan Plateau',
			type: Point,
			year: -500,
			chapter: 4,
			region: Asia,
			layer: 3
		},{
			text: 'Xia dynasty',
			type: Ranged,
			year1: -2200,
			year2: -1766,
			chapter: 5,
			region: Asia,
			layer: 7
		},{
			text: 'Shang dynasty',
			type: Ranged,
			year1: -1766,
			year2: -1122,
			chapter: 5,
			region: Asia,
			layer: 8
		},{
			text: 'Zhou dynasty',
			type: Ranged,
			year1: -1122,
			year2: -256,
			chapter: 5,
			region: Asia,
			layer: 4
		},{
			text: '{{Period%20of%20Warring%20States|Period of Warring States}}',
			type: Ranged,
			year1: -403,
			year2: -221,
			chapter: 5,
			region: Asia,
			layer: 2
		},{
			text: '{{Lapita%20Peoples|Lapita}} society',
			type: Ranged,
			year1: -1500,
			year2: -500,
			chapter: 6,
			region: Oceania,
			layer: 10
		},{
			text: 'Austronesian migrations to Pacific Islands',
			type: Ranged,
			year1: -1500,
			year2: 700,
			chapter: 6,
			region: Oceania,
			layer: 9
		},{
			text: 'Olmec society',
			type: Ranged,
			year1: -1200,
			year2: -100,
			chapter: 6,
			region: Americas,
			layer: 1
		},{
			text: '{{Chav%C3%ADn%20Cult|Chav&#237;n Cult}}',
			type: Ranged,
			year1: -1000,
			year2: -300,
			chapter: 6,
			region: Americas,
			layer: 11
		},{
			text: '{{Teotihuacan|Teotihuacan}} society',
			type: Ranged,
			year1: -200,
			year2: 750,
			chapter: 6,
			region: Americas,
			layer: 2
		},{
			text: 'Maya society',
			type: Ranged,
			year1: 300,
			year2: 1100,
			chapter: 6,
			region: Americas,
			layer: 1
		},{
			text: 'Mochica society',
			type: Ranged,
			year1: 300,
			year2: 700,
			chapter: 6,
			region: Americas,
			layer: 4
		},{
			text: 'Origins of agriculture in South America',
			type: Point,
			year: -3000,
			chapter: 6,
			region: Americas,
			layer: 4
		},{
			text: 'Austronesian migrations to New Guinea',
			type: Point,
			year: -3000,
			chapter: 6,
			region: Oceania,
			layer: 5
		},{
			text: 'Origins of agriculture in New Guinea',
			type: Point,
			year: -3000,
			chapter: 6,
			region: Oceania,
			layer: 6
		},{
			text: '{{Achaemenids|Achaemenid dynasty}}',
			type: Ranged,
			year1: -558,
			year2: -330,
			chapter: 7,
			region: Asia,
			layer: 8
		},{
			text: 'Reign of Cyrus the {{Achaemenids|Achaemenid}}',
			type: Ranged,
			year1: -558,
			year2: -530,
			chapter: 7,
			region: Asia,
			layer: 15
		},{
			text: 'Reign of {{Darius,Achaemenids|Darius}}',
			type: Ranged,
			year1: -521,
			year2: -486,
			chapter: 7,
			region: Asia,
			layer: 15
		},{
			text: 'Invasion and conquest of the Achaemenid empire by {{Alexander%20of%20Macedon|Alexander of Macedon}}',
			type: Ranged,
			year1: -334,
			year2: -330,
			chapter: 7,
			region: Asia,
			layer: 7
		},{
			text: 'Seleucid dynasty',
			type: Ranged,
			year1: -323,
			year2: -83,
			chapter: 7,
			region: Asia,
			layer: 3
		},{
			text: 'Parthian dynasty',
			type: Ranged,
			year1: -247,
			year2: 224,
			chapter: 7,
			region: Asia,
			layer: 4
		},{
			text: 'Sasanid dynasty',
			type: Ranged,
			year1: 224,
			year2: 651,
			chapter: 7,
			region: Asia,
			layer: 3
		},{
			text: '{{Analects|Confucius}}',
			type: Ranged,
			year1: -551,
			year2: -479,
			chapter: 8,
			region: Asia,
			layer: 2
		},{
			text: 'Shang Yang',
			type: Ranged,
			year1: -390,
			year2: -338,
			chapter: 8,
			region: Asia,
			layer: 5
		},{
			text: 'Mencius',
			type: Ranged,
			year1: -372,
			year2: -289,
			chapter: 8,
			region: Asia,
			layer: 6
		},{
			text: 'Xunzi',
			type: Ranged,
			year1: -298,
			year2: -238,
			chapter: 8,
			region: Asia,
			layer: 5
		},{
			text: 'Han Feizi',
			type: Ranged,
			year1: -280,
			year2: -233,
			chapter: 8,
			region: Asia,
			layer: 6
		},{
			text: '{{Qin%20Shihuangdi|Qin}} dynasty',
			type: Ranged,
			year1: -221,
			year2: -207,
			chapter: 8,
			region: Asia,
			layer: 5
		},{
			text: 'Early Han dynasty',
			type: Ranged,
			year1: -206,
			year2: 9,
			chapter: 8,
			region: Asia,
			layer: 6
		},{
			text: 'Reign of Han Wudi',
			type: Ranged,
			year1: -141,
			year2: -87,
			chapter: 8,
			region: Asia,
			layer: 5
		},{
			text: 'Reign of Wang Mang',
			type: Ranged,
			year1: 9,
			year2: 23,
			chapter: 8,
			region: Asia,
			layer: 3
		},{
			text: 'Later Han dynasty',
			type: Ranged,
			year1: 25,
			year2: 220,
			chapter: 8,
			region: Asia,
			layer: 5
		},{
			text: 'Life of {{Siddhartha%20Gautama|Siddhartha Gautama}}, the {{Nirvana,Four%20Noble%20Truths|Buddha}}',
			type: Ranged,
			year1: -563,
			year2: -483,
			chapter: 9,
			region: Asia,
			layer: 13
		},{
			text: 'Life of Vardhamana Mahavira',
			type: Ranged,
			year1: -540,
			year2: -468,
			chapter: 9,
			region: Asia,
			layer: 14
		},{
			text: 'Mauryan dynasty',
			type: Ranged,
			year1: -321,
			year2: -185,
			chapter: 9,
			region: Asia,
			layer: 7
		},{
			text: 'Reign of Chandragupta Maurya',
			type: Ranged,
			year1: -321,
			year2: -297,
			chapter: 9,
			region: Asia,
			layer: 8
		},{
			text: 'Reign of {{Ashoka|Ashoka}} Maurya',
			type: Ranged,
			year1: -268,
			year2: -232,
			chapter: 9,
			region: Asia,
			layer: 8
		},{
			text: 'Bactrian Rule in Northern India',
			type: Ranged,
			year1: -182,
			year2: 1,
			chapter: 9,
			region: Asia,
			layer: 8
		},{
			text: 'Kushan Empire in northern India and central Asia',
			type: Ranged,
			year1: 1,
			year2: 270,
			chapter: 9,
			region: Asia,
			layer: 1
		},{
			text: 'Reign of Kushan emperor Kanishka',
			type: Ranged,
			year1: 127,
			year2: 153,
			chapter: 9,
			region: Asia,
			layer: 3
		},{
			text: 'Invasion of India by {{Darius|Darius}} of Persia',
			type: Point,
			year: -520,
			chapter: 9,
			region: Asia,
			layer: 3
		},{
			text: 'Invasion of India by {{Alexander%20of%20Macedon|Alexander of Macedon}}',
			type: Point,
			year: -327,
			chapter: 9,
			region: Asia,
			layer: 5
		},{
			text: 'Minoan society',
			type: Ranged,
			year1: -2200,
			year2: -1100,
			chapter: 10,
			region: Europe,
			layer: 11
		},{
			text: 'Mycenaean society',
			type: Ranged,
			year1: -1600,
			year2: -1100,
			chapter: 10,
			region: Europe,
			layer: 12
		},{
			text: 'Era of the classical Greek polis',
			type: Ranged,
			year1: -800,
			year2: -338,
			chapter: 10,
			region: Europe,
			layer: 12
		},{
			text: 'Life of Sappho',
			type: Point,
			year: -600,
			chapter: 10,
			region: Europe,
			layer: 8
		},{
			text: 'Persian Wars',
			type: Ranged,
			year1: -500,
			year2: -479,
			chapter: 10,
			region: Europe|Asia,
			layer: 16
		},{
			text: '{{Darius|Darius}}\'s invasion of Greece',
			type: Point,
			year: -490,
			chapter: 10,
			region: Europe,
			layer: 3
		},{
			text: 'Battle of Marathon',
			type: Point,
			year: -490,
			chapter: 10,
			region: Europe,
			layer: 5
		},{
			text: 'Xerxes\' invasion of Greece',
			type: Point,
			year: -480,
			chapter: 10,
			region: Europe,
			layer: 3
		},{
			text: 'Battle of Salamis',
			type: Point,
			year: -480,
			chapter: 10,
			region: Europe,
			layer: 5
		},{
			text: 'Battle of Plateau',
			type: Point,
			year: -479,
			chapter: 10,
			region: Europe,
			layer: 6
		},{
			text: 'Life of Socrates',
			type: Ranged,
			year1: -470,
			year2: -399,
			chapter: 10,
			region: Europe,
			layer: 3
		},{
			text: 'Pericles\' leadership in Athens',
			type: Ranged,
			year1: -443,
			year2: -429,
			chapter: 10,
			region: Europe,
			layer: 2
		},{
			text: '{{Peloponnesian%20War|Peloponnesian War}}',
			type: Ranged,
			year1: -431,
			year2: -404,
			chapter: 10,
			region: Europe,
			layer: 5
		},{
			text: 'Life of Plato',
			type: Ranged,
			year1: -430,
			year2: -347,
			chapter: 10,
			region: Europe,
			layer: 10
		},{
			text: 'Life of {{Aristotle|Aristotle}}',
			type: Ranged,
			year1: -384,
			year2: -322,
			chapter: 10,
			region: Europe,
			layer: 13
		},{
			text: 'Reign of Philip II of Macedon',
			type: Ranged,
			year1: -359,
			year2: -336,
			chapter: 10,
			region: Europe,
			layer: 3
		},{
			text: 'Reign of {{Alexander%20of%20Macedon|Alexander of Macedon}}',
			type: Ranged,
			year1: -336,
			year2: -323,
			chapter: 10,
			region: Europe,
			layer: 10
		},{
			text: 'Founding of Rome (according to tradition)',
			type: Point,
			year: -753,
			chapter: 11,
			region: Europe,
			layer: 3
		},{
			text: 'Establishment of the Roman republic',
			type: Point,
			year: -509,
			chapter: 11,
			region: Europe,
			layer: 3
		},{
			text: 'Roman expansion in the Mediterranean basin',
			type: Ranged,
			year1: -264,
			year2: -146,
			chapter: 11,
			region: Europe,
			layer: 10
		},{
			text: 'Life of Marcus Tullius Cicero',
			type: Ranged,
			year1: -106,
			year2: -43,
			chapter: 11,
			region: Europe,
			layer: 7
		},{
			text: 'Rule of Gaius Julius Caesar as dictator',
			type: Ranged,
			year1: -46,
			year2: -44,
			chapter: 11,
			region: Europe,
			layer: 1
		},{
			text: 'Civil war in Rome',
			type: Ranged,
			year1: -44,
			year2: -29,
			chapter: 11,
			region: Europe,
			layer: 3
		},{
			text: 'Rule of Augustus',
			type: Ranged,
			year1: -31,
			year2: 14,
			chapter: 11,
			region: Europe,
			layer: 5
		},{
			text: 'Life of Jesus of Nazareth',
			type: Ranged,
			year1: -4,
			year2: 30,
			chapter: 11,
			region: Europe,
			layer: 7
		},{
			text: 'Life of Paul of Tarsus',
			type: Ranged,
			year1: 5,
			year2: 67,
			chapter: 11,
			region: Europe,
			layer: 10
		},{
			text: 'Jewish War',
			type: Ranged,
			year1: 66,
			year2: 70,
			chapter: 11,
			region: Europe,
			layer: 3
		},{
			text: 'Travels of Zhang Qian in central Asia',
			type: Ranged,
			year1: -139,
			year2: -126,
			chapter: 12,
			region: Asia,
			layer: 7
		},{
			text: '{{Yellow%20Turban%20Uprising|Yellow Turban Rebellion}}',
			type: Point,
			year: 184,
			chapter: 12,
			region: Asia,
			layer: 3
		},{
			text: 'Life of Mani',
			type: Ranged,
			year1: 216,
			year2: 272,
			chapter: 12,
			region: Asia,
			layer: 6
		},{
			text: 'Reign of Diocletian',
			type: Ranged,
			year1: 284,
			year2: 305,
			chapter: 12,
			region: Europe,
			layer: 5
		},{
			text: 'Reign of Constantine',
			type: Ranged,
			year1: 313,
			year2: 337,
			chapter: 12,
			region: Europe,
			layer: 6
		},{
			text: 'Edict of Milan and the legalization of Christianity in the Roman Empire',
			type: Point,
			year: 313,
			chapter: 12,
			region: Europe,
			layer: 5
		},{
			text: 'Gupta dynasty',
			type: Ranged,
			year1: 320,
			year2: 550,
			chapter: 9,
			region: Asia,
			layer: 5
		},{
			text: 'Council at Nicaea',
			type: Point,
			year: 325,
			chapter: 12,
			region: Europe,
			layer: 8
		},{
			text: 'Council at Chalcedon',
			type: Point,
			year: 451,
			chapter: 12,
			region: Europe,
			layer: 6
		},{
			text: 'Collapse of the western Roman Empire',
			type: Point,
			year: 476,
			chapter: 12,
			region: Europe,
			layer: 8
		},{
			text: 'Sui dynasty',
			type: Ranged,
			year1: 589,
			year2: 618,
			chapter: 13,
			region: Asia,
			layer: 5
		},{
			text: 'Life of Xuanzang',
			type: Ranged,
			year1: 602,
			year2: 664,
			chapter: 13,
			region: Asia,
			layer: 6
		},{
			text: 'Reign of Sui Yangdi',
			type: Ranged,
			year1: 604,
			year2: 618,
			chapter: 13,
			region: Asia,
			layer: 7
		},{
			text: 'Tang dynasty',
			type: Ranged,
			year1: 618,
			year2: 907,
			chapter: 13,
			region: Asia,
			layer: 8
		},{
			text: 'Reign of Tang Taizong',
			type: Ranged,
			year1: 627,
			year2: 649,
			chapter: 13,
			region: Asia,
			layer: 5
		},{
			text: 'Silla dynasty',
			type: Ranged,
			year1: 669,
			year2: 935,
			chapter: 13,
			region: Asia,
			layer: 3
		},{
			text: 'Nara Period',
			type: Ranged,
			year1: 710,
			year2: 794,
			chapter: 13,
			region: Asia,
			layer: 4
		},{
			text: 'An Lushan\'s rebellion',
			type: Ranged,
			year1: 755,
			year2: 757,
			chapter: 13,
			region: Asia,
			layer: 11
		},{
			text: 'Heian period',
			type: Ranged,
			year1: 794,
			year2: 1185,
			chapter: 13,
			region: Asia,
			layer: 2
		},{
			text: 'Huang Chao\'s rebellion',
			type: Ranged,
			year1: 875,
			year2: 884,
			chapter: 13,
			region: Asia,
			layer: 9
		},{
			text: 'Song dynasty',
			type: Ranged,
			year1: 960,
			year2: 1279,
			chapter: 13,
			region: Asia,
			layer: 3
		},{
			text: 'Reign of Song Taizu',
			type: Ranged,
			year1: 960,
			year2: 976,
			chapter: 13,
			region: Asia,
			layer: 8
		},{
			text: 'First issuance of government-sponsored paper money',
			type: Point,
			year: 1024,
			chapter: 13,
			region: Asia,
			layer: 11
		},{
			text: 'Life of Zhu Xi',
			type: Ranged,
			year1: 1130,
			year2: 1200,
			chapter: 13,
			region: Asia,
			layer: 1
		},{
			text: 'Kamakura period',
			type: Ranged,
			year1: 1185,
			year2: 1333,
			chapter: 13,
			region: Asia,
			layer: 13
		},{
			text: 'Muromachi period',
			type: Ranged,
			year1: 1336,
			year2: 1573,
			chapter: 13,
			region: Asia,
			layer: 1
		},{
			text: 'Life of Muhammad',
			type: Ranged,
			year1: 570,
			year2: 632,
			chapter: 14,
			region: Asia,
			layer: 10
		},{
			text: 'The hijra',
			type: Point,
			year: 622,
			chapter: 14,
			region: Asia,
			layer: 11
		},{
			text: 'Muhammad\'s hajj',
			type: Point,
			year: 632,
			chapter: 14,
			region: Asia,
			layer: 11
		},{
			text: 'Compilation of the Quran',
			type: Ranged,
			year1: 650,
			year2: 659,
			chapter: 14,
			region: Asia,
			layer: 7
		},{
			text: 'Umayyad dynasty',
			type: Ranged,
			year1: 661,
			year2: 750,
			chapter: 14,
			region: Asia,
			layer: 5
		},{
			text: 'Abbasid dynasty',
			type: Ranged,
			year1: 750,
			year2: 1258,
			chapter: 14,
			region: Asia,
			layer: 6
		},{
			text: 'Reign of Harun al-Rashid',
			type: Ranged,
			year1: 786,
			year2: 809,
			chapter: 14,
			region: Asia,
			layer: 5
		},{
			text: 'Establishment of Seljuq control over the Abbasid dynasty',
			type: Ranged,
			year1: 1050,
			year2: 1059,
			chapter: 14,
			region: Asia,
			layer: 10
		},{
			text: 'Life of al-Ghazali',
			type: Ranged,
			year1: 1058,
			year2: 1111,
			chapter: 14,
			region: Asia,
			layer: 7
		},{
			text: 'Life of Ibn Rushd',
			type: Ranged,
			year1: 1126,
			year2: 1198,
			chapter: 14,
			region: Asia,
			layer: 7
		},{
			text: 'Reign of Harsha',
			type: Ranged,
			year1: 606,
			year2: 648,
			chapter: 15,
			region: Asia,
			layer: 12
		},{
			text: 'Kingdom of Srivijaya',
			type: Ranged,
			year1: 670,
			year2: 1025,
			chapter: 15,
			region: Asia,
			layer: 7
		},{
			text: 'Conquest of Sind by Umayyad forces',
			type: Point,
			year: 711,
			chapter: 15,
			region: Asia,
			layer: 9
		},{
			text: 'Chola kingdom',
			type: Ranged,
			year1: 850,
			year2: 1267,
			chapter: 15,
			region: Asia,
			layer: 5
		},{
			text: 'Kingdom of Angkor',
			type: Ranged,
			year1: 889,
			year2: 1431,
			chapter: 15,
			region: Asia,
			layer: 4
		},{
			text: 'Raids on India by Mahmud of Ghazni',
			type: Ranged,
			year1: 1001,
			year2: 1027,
			chapter: 15,
			region: Asia,
			layer: 10
		},{
			text: '{{Sultanate%20of%20Delhi|Sultanate of Delhi}}',
			type: Ranged,
			year1: 1206,
			year2: 1526,
			chapter: 15,
			region: Asia,
			layer: 2
		},{
			text: 'Kingdom of Vijayanagar',
			type: Ranged,
			year1: 1336,
			year2: 1565,
			chapter: 15,
			region: Asia,
			layer: 3
		},{
			text: 'Life of guru Kabir',
			type: Ranged,
			year1: 1440,
			year2: 1518,
			chapter: 15,
			region: Asia,
			layer: 4
		},{
			text: 'Life of {{Saint%20Benedict|Saint Basil}} of Caesarea',
			type: Ranged,
			year1: 329,
			year2: 379,
			chapter: 16,
			region: Europe,
			layer: 7
		},{
			text: 'Life of {{Saint%20Benedict|Saint Benedict}} of Nursia',
			type: Ranged,
			year1: 480,
			year2: 547,
			chapter: 16,
			region: Europe,
			layer: 6
		},{
			text: 'Life of Saint Scholastica',
			type: Ranged,
			year1: 482,
			year2: 543,
			chapter: 16,
			region: Europe,
			layer: 7
		},{
			text: 'Reign of Justinian',
			type: Ranged,
			year1: 527,
			year2: 565,
			chapter: 16,
			region: Europe,
			layer: 8
		},{
			text: 'Reign of Pope Gregory I',
			type: Ranged,
			year1: 590,
			year2: 604,
			chapter: 16,
			region: Europe,
			layer: 8
		},{
			text: 'Reign of Leo III',
			type: Ranged,
			year1: 717,
			year2: 741,
			chapter: 16,
			region: Europe,
			layer: 6
		},{
			text: '{{Iconoclasm|Iconoclastic controversy}}',
			type: Ranged,
			year1: 726,
			year2: 843,
			chapter: 16,
			region: Europe,
			layer: 9
		},{
			text: 'Battle of Tours',
			type: Point,
			year: 732,
			chapter: 16,
			region: Europe,
			layer: 10
		},{
			text: 'Carolingian kingdom',
			type: Ranged,
			year1: 751,
			year2: 843,
			chapter: 16,
			region: Europe,
			layer: 10
		},{
			text: 'Reign of {{Charlemagne|Charlemagne}}',
			type: Ranged,
			year1: 768,
			year2: 814,
			chapter: 16,
			region: Europe,
			layer: 11
		},{
			text: 'Coronation of {{Charlemagne|Charlemagne}} as emperor',
			type: Point,
			year: 800,
			chapter: 16,
			region: Europe,
			layer: 12
		},{
			text: 'Conversion of Prince Vladimir of Kiev to Christianity',
			type: Point,
			year: 898,
			chapter: 16,
			region: Europe,
			layer: 9
		},{
			text: 'Schism between Eastern Orthodox and Roman Catholic churches',
			type: Point,
			year: 1054,
			chapter: 16,
			region: Europe,
			layer: 11
		},{
			text: 'Tughril Beg named sultan',
			type: Point,
			year: 1055,
			chapter: 17,
			region: Asia,
			layer: 14
		},{
			text: 'Battle of Manzikert',
			type: Point,
			year: 1071,
			chapter: 17,
			region: Asia,
			layer: 10
		},{
			text: 'Reign of Chinggis Khan',
			type: Ranged,
			year1: 1206,
			year2: 1227,
			chapter: 17,
			region: Asia,
			layer: 7
		},{
			text: 'Mongol conquest of northern China',
			type: Ranged,
			year1: 1211,
			year2: 1234,
			chapter: 17,
			region: Asia,
			layer: 1
		},{
			text: 'Mongol conquest of Persia',
			type: Ranged,
			year1: 1219,
			year2: 1221,
			chapter: 17,
			region: Asia,
			layer: 9
		},{
			text: 'Mongol conquest of Russia',
			type: Ranged,
			year1: 1237,
			year2: 1241,
			chapter: 17,
			region: Asia,
			layer: 7
		},{
			text: 'Mongol conquest of southern China',
			type: Ranged,
			year1: 1264,
			year2: 1279,
			chapter: 17,
			region: Asia,
			layer: 7
		},{
			text: 'Reign of Khubilai Khan',
			type: Ranged,
			year1: 1264,
			year2: 1294,
			chapter: 17,
			region: Asia,
			layer: 9
		},{
			text: 'Yuan dynasty',
			type: Ranged,
			year1: 1279,
			year2: 1368,
			chapter: 17,
			region: Asia,
			layer: 5
		},{
			text: 'Conversion of Ilkhan Ghazan to Islam',
			type: Point,
			year: 1295,
			chapter: 17,
			region: Asia,
			layer: 1
		},{
			text: 'Life of Tamerlane',
			type: Ranged,
			year1: 1336,
			year2: 1405,
			chapter: 17,
			region: Asia,
			layer: 6
		},{
			text: 'Ottoman capture of {{Constantinople|Constantinople}}',
			type: Point,
			year: 1453,
			chapter: 17,
			region: Europe,
			layer: 5
		},{
			text: 'Introduction of bananas to Africa',
			type: Point,
			year: 400,
			chapter: 18,
			region: Africa,
			layer: 6
		},{
			text: 'Kingdom of Ghana',
			type: Ranged,
			year1: 1000,
			year2: 1200,
			chapter: 18,
			region: Africa,
			layer: 9
		},{
			text: 'Swahili cities',
			type: Ranged,
			year1: 1000,
			year2: 1400,
			chapter: 18,
			region: Africa,
			layer: 8
		},{
			text: 'Christian kingdom of Axum',
			type: Ranged,
			year1: 1100,
			year2: 1500,
			chapter: 18,
			region: Africa,
			layer: 10
		},{
			text: 'Kingdom of Great Zimbabwe',
			type: Ranged,
			year1: 1100,
			year2: 1400,
			chapter: 18,
			region: Africa,
			layer: 11
		},{
			text: 'Mali empire',
			type: Ranged,
			year1: 1200,
			year2: 1400,
			chapter: 18,
			region: Africa,
			layer: 12
		},{
			text: 'Reign of Sundiata',
			type: Ranged,
			year1: 1230,
			year2: 1255,
			chapter: 18,
			region: Africa,
			layer: 9
		},{
			text: 'Kingdom of Kongo',
			type: Ranged,
			year1: 1300,
			year2: 1600,
			chapter: 18,
			region: Africa,
			layer: 7
		},{
			text: 'Reign of Mansa Musa',
			type: Ranged,
			year1: 1312,
			year2: 1337,
			chapter: 18,
			region: Africa,
			layer: 9
		},{
			text: 'Mansa Musa\'s pilgrimage to Mecca',
			type: Ranged,
			year1: 1324,
			year2: 1325,
			chapter: 18,
			region: Africa|Asia,
			layer: 1
		},{
			text: 'Coronation of Otto I as Holy Roman emperor',
			type: Point,
			year: 962,
			chapter: 19,
			region: Europe,
			layer: 9
		},{
			text: 'Reign of Emperor Henry IV',
			type: Ranged,
			year1: 1056,
			year2: 1106,
			chapter: 19,
			region: Europe,
			layer: 12
		},{
			text: 'Norman invasion of England',
			type: Point,
			year: 1066,
			chapter: 19,
			region: Europe,
			layer: 11
		},{
			text: 'Reign of Pope Gregory VII',
			type: Ranged,
			year1: 1073,
			year2: 1085,
			chapter: 19,
			region: Europe,
			layer: 11
		},{
			text: 'First crusade',
			type: Ranged,
			year1: 1096,
			year2: 1099,
			chapter: 19,
			region: Europe,
			layer: 14
		},{
			text: 'Life of Eleanor of Aquitaine',
			type: Ranged,
			year1: 1122,
			year2: 1204,
			chapter: 19,
			region: Europe,
			layer: 14
		},{
			text: 'Reign of Emperor Frederick Barbarossa',
			type: Ranged,
			year1: 1152,
			year2: 1190,
			chapter: 19,
			region: Europe,
			layer: 12
		},{
			text: 'Life of Saint Dominic',
			type: Ranged,
			year1: 1170,
			year2: 1221,
			chapter: 19,
			region: Europe,
			layer: 15
		},{
			text: 'Life of Saint Francis',
			type: Ranged,
			year1: 1182,
			year2: 1226,
			chapter: 19,
			region: Europe,
			layer: 16
		},{
			text: 'Recapture of Jerusalem by Saladin',
			type: Point,
			year: 1187,
			chapter: 19,
			region: Europe,
			layer: 17
		},{
			text: 'Fourth crusade',
			type: Ranged,
			year1: 1202,
			year2: 1204,
			chapter: 19,
			region: Europe,
			layer: 17
		},{
			text: 'Life of {{St.%20Thomas%20Aquinas|Saint Thomas Aquinas}}',
			type: Ranged,
			year1: 1225,
			year2: 1274,
			chapter: 19,
			region: Europe,
			layer: 14
		},{
			text: 'Marco Polo\'s trip to China',
			type: Ranged,
			year1: 1271,
			year2: 1295,
			chapter: 19,
			region: Europe|Asia,
			layer: 6
		},{
			text: 'High point of the Toltec empire',
			type: Ranged,
			year1: 950,
			year2: 1150,
			chapter: 20,
			region: Americas,
			layer: 13
		},{
			text: 'Collapse of the Toltec empire',
			type: Point,
			year: 1175,
			chapter: 20,
			region: Americas,
			layer: 13
		},{
			text: 'Inca settlement near Cuzco',
			type: Point,
			year: 1250,
			chapter: 20,
			region: Americas,
			layer: 1
		},{
			text: 'Mongol capture of Baghdad',
			type: Point,
			year: 1258,
			chapter: 17,
			region: Asia,
			layer: 1
		},{
			text: 'Foundation of Tenochtitlan by the Mexica',
			type: Point,
			year: 1345,
			chapter: 20,
			region: Americas,
			layer: 13
		},{
			text: 'Emergence of the five Iroquois nations',
			type: Point,
			year: 1400,
			chapter: 20,
			region: Americas,
			layer: 5
		},{
			text: 'Reign of the Aztec ruler Itzc&#243;atl',
			type: Ranged,
			year1: 1428,
			year2: 1440,
			chapter: 20,
			region: Americas,
			layer: 5
		},{
			text: 'Reign of the ruler Pachacuti',
			type: Ranged,
			year1: 1438,
			year2: 1471,
			chapter: 20,
			region: Americas,
			layer: 6
		},{
			text: 'Reign of the Aztec ruler Motecuzoma I',
			type: Ranged,
			year1: 1440,
			year2: 1469,
			chapter: 20,
			region: Americas,
			layer: 8
		},{
			text: 'Reign of the Aztec Motecuzoma II',
			type: Ranged,
			year1: 1502,
			year2: 1520,
			chapter: 20,
			region: Americas,
			layer: 5
		},{
			text: 'Arrival of Spanish conquerors in Mexico',
			type: Point,
			year: 1519,
			chapter: 20,
			region: Americas,
			layer: 6
		},{
			text: 'Beginning of population growth in Pacific islands',
			type: Point,
			year: 1000,
			chapter: 20,
			region: Oceania,
			layer: 11
		},{
			text: 'Beginning of two-way voyages between Hawai\'i and Tahiti and the Marquesas islands',
			type: Point,
			year: 1100,
			chapter: 20,
			region: Oceania,
			layer: 15
		},{
			text: 'Emergence of distinct social classes and chiefly states in Oceania',
			type: Point,
			year: 1200,
			chapter: 20,
			region: Oceania,
			layer: 18
		},{
			text: 'Construction of fishponds in Hawai\'i',
			type: Point,
			year: 1300,
			chapter: 20,
			region: Oceania,
			layer: 3
		},{
			text: 'Creation of the Mongol artillery unit',
			type: Point,
			year: 1214,
			chapter: 21,
			region: Asia,
			layer: 14
		},{
			text: 'Life of Marco Polo',
			type: Ranged,
			year1: 1253,
			year2: 1324,
			chapter: 21,
			region: Asia|Europe,
			layer: 15
		},{
			text: '{{Rabban%20Sauma|Rabban Sauma}}\'s embassy to Europe',
			type: Ranged,
			year1: 1287,
			year2: 1288,
			chapter: 21,
			region: Europe,
			layer: 14
		},{
			text: '{{John%20of%20Montecorvino|John of Montecorvino}}\'s mission to China',
			type: Ranged,
			year1: 1291,
			year2: 1328,
			chapter: 21,
			region: Europe|Asia,
			layer: 16
		},{
			text: 'Life of Ibn Battuta',
			type: Ranged,
			year1: 1304,
			year2: 1369,
			chapter: 21,
			region: Africa,
			layer: 14
		},{
			text: 'Life of Francesco Petrarca',
			type: Ranged,
			year1: 1304,
			year2: 1374,
			chapter: 21,
			region: Europe,
			layer: 17
		},{
			text: 'First outbreaks of {{Bubonic%20Plague|bubonic plague}} in China',
			type: Point,
			year: 1330,
			chapter: 21,
			region: Asia,
			layer: 18
		},{
			text: 'Hundred Years War',
			type: Ranged,
			year1: 1337,
			year2: 1453,
			chapter: 21,
			region: Europe,
			layer: 15
		},{
			text: 'Arrival of {{Bubonic%20Plague|bubonic plague}} in the Mediterranean basin',
			type: Point,
			year: 1347,
			chapter: 21,
			region: Europe,
			layer: 9
		},{
			text: 'Ming dynasty',
			type: Ranged,
			year1: 1368,
			year2: 1644,
			chapter: 21,
			region: Asia,
			layer: 9
		},{
			text: 'Zheng He\'s expeditions in the Indian Ocean',
			type: Ranged,
			year1: 1405,
			year2: 1433,
			chapter: 21,
			region: Asia,
			layer: 13
		},{
			text: 'Life of Desiderius Erasmus of Rotterdam',
			type: Ranged,
			year1: 1466,
			year2: 1536,
			chapter: 21,
			region: Asia,
			layer: 11
		},{
			text: 'Bartolomeu Dias\'s voyage around Africa',
			type: Point,
			year: 1488,
			chapter: 21,
			region: Africa,
			layer: 5
		},{
			text: 'Christopher Columbus\'s first voyage to the western hemisphere',
			type: Point,
			year: 1492,
			chapter: 21,
			region: Americas,
			layer: 6
		},{
			text: 'Vasco da Gama\'s voyage to India',
			type: Ranged,
			year1: 1497,
			year2: 1498,
			chapter: 21,
			region: Asia,
			layer: 8
		},{
			text: 'Life of {{Prince%20Henry%20the%20Navigator|Prince Henry the Navigator of Portugal}}',
			type: Ranged,
			year1: 1394,
			year2: 1460,
			chapter: 22,
			region: Europe,
			layer: 14
		},{
			text: 'Establishment of Portuguese trading post in Calicut, India',
			type: Point,
			year: 1500,
			chapter: 22,
			region: Asia,
			layer: 6
		},{
			text: 'Ferdinand Magellan\'s circumnavigation of the world',
			type: Ranged,
			year1: 1519,
			year2: 1522,
			chapter: 22,
			region: Europe|Americas|Asia|Africa,
			layer: 8
		},{
			text: 'Spanish conquest of the Philippines',
			type: Ranged,
			year1: 1565,
			year2: 1575,
			chapter: 22,
			region: Asia,
			layer: 2
		},{
			text: 'Establishment of Batavia by the Dutch on the island of Java',
			type: Point,
			year: 1619,
			chapter: 22,
			region: Asia,
			layer: 1
		},{
			text: 'Seven Year\'s War',
			type: Ranged,
			year1: 1756,
			year2: 1763,
			chapter: 22,
			region: Europe|Americas|Africa|Asia,
			layer: 1
		},{
			text: 'Captain James Cook\'s voyages in the Pacific Ocean',
			type: Ranged,
			year1: 1768,
			year2: 1780,
			chapter: 22,
			region: Americas|Oceania,
			layer: 2
		},{
			text: 'Life of Nicolaus Copernicus',
			type: Ranged,
			year1: 1473,
			year2: 1543,
			chapter: 23,
			region: Europe,
			layer: 12
		},{
			text: 'Foundation of the Spanish Inquisition',
			type: Point,
			year: 1478,
			chapter: 23,
			region: Europe,
			layer: 5
		},{
			text: 'Life of Martin Luther',
			type: Ranged,
			year1: 1483,
			year2: 1546,
			chapter: 23,
			region: Europe,
			layer: 13
		},{
			text: 'Life of Ignatius Loyola',
			type: Ranged,
			year1: 1491,
			year2: 1556,
			chapter: 23,
			region: Europe,
			layer: 14
		},{
			text: 'Reign of King Henry VIII',
			type: Ranged,
			year1: 1509,
			year2: 1547,
			chapter: 23,
			region: Europe,
			layer: 10
		},{
			text: 'Life of John Calvin',
			type: Ranged,
			year1: 1509,
			year2: 1564,
			chapter: 23,
			region: Europe,
			layer: 15
		},{
			text: 'Publication of the Ninety-Five Theses',
			type: Point,
			year: 1517,
			chapter: 23,
			region: Europe,
			layer: 17
		},{
			text: 'Reign of Emperor Charles V',
			type: Ranged,
			year1: 1519,
			year2: 1556,
			chapter: 23,
			region: Europe,
			layer: 16
		},{
			text: 'Foundation of the Society of Jesus',
			type: Point,
			year: 1540,
			chapter: 23,
			region: Europe,
			layer: 2
		},{
			text: 'Council of Trent',
			type: Ranged,
			year1: 1545,
			year2: 1563,
			chapter: 23,
			region: Europe,
			layer: 4
		},{
			text: 'Reign of King Phillip II',
			type: Ranged,
			year1: 1556,
			year2: 1598,
			chapter: 23,
			region: Europe,
			layer: 5
		},{
			text: 'Life of Galileo Galilei',
			type: Ranged,
			year1: 1564,
			year2: 1642,
			chapter: 23,
			region: Europe,
			layer: 6
		},{
			text: 'Life of Johannes Kepler',
			type: Ranged,
			year1: 1571,
			year2: 1630,
			chapter: 23,
			region: Europe,
			layer: 8
		},{
			text: 'Spanish Armada',
			type: Point,
			year: 1588,
			chapter: 23,
			region: Europe,
			layer: 1
		},{
			text: 'Thirty Years\' War',
			type: Ranged,
			year1: 1618,
			year2: 1648,
			chapter: 23,
			region: Europe,
			layer: 2
		},{
			text: 'Life of Isaac Newton',
			type: Ranged,
			year1: 1642,
			year2: 1727,
			chapter: 23,
			region: Europe,
			layer: 1
		},{
			text: 'Reign of King Louis XIV',
			type: Ranged,
			year1: 1643,
			year2: 1715,
			chapter: 23,
			region: Europe,
			layer: 3
		},{
			text: 'Peace of Westphalia',
			type: Point,
			year: 1648,
			chapter: 23,
			region: Europe,
			layer: 4
		},{
			text: 'Life of &#201;milie du Ch&#226;telet',
			type: Ranged,
			year1: 1706,
			year2: 1749,
			chapter: 23,
			region: Europe,
			layer: 2
		},{
			text: 'Treaty of Tordesillas',
			type: Point,
			year: 1494,
			chapter: 24,
			region: Europe|Americas,
			layer: 15
		},{
			text: 'Brazil claimed for Portugal by Pedro Alvarez de Cabral',
			type: Point,
			year: 1500,
			chapter: 24,
			region: Americas,
			layer: 16
		},{
			text: 'Smallpox epidemic in the Caribbean',
			type: Point,
			year: 1518,
			chapter: 24,
			region: Americas,
			layer: 18
		},{
			text: 'Spanish conquest of Mexico',
			type: Ranged,
			year1: 1519,
			year2: 1521,
			chapter: 24,
			region: Americas,
			layer: 19
		},{
			text: 'Execution of Cuauht&#233;moc',
			type: Point,
			year: 1525,
			chapter: 24,
			region: Americas,
			layer: 20
		},{
			text: '{{Francisco%20Pizarro|Spanish conquest of Peru}}',
			type: Ranged,
			year1: 1532,
			year2: 1540,
			chapter: 24,
			region: Americas,
			layer: 5
		},{
			text: 'Spanish discovery of silver near Potos&#237;',
			type: Point,
			year: 1545,
			chapter: 24,
			region: Americas,
			layer: 6
		},{
			text: 'Foundation of Port Royal (Nova Scotia)',
			type: Point,
			year: 1604,
			chapter: 24,
			region: Americas,
			layer: 1
		},{
			text: 'Foundation of Jamestown',
			type: Point,
			year: 1607,
			chapter: 24,
			region: Americas,
			layer: 2
		},{
			text: 'Foundation of Quebec',
			type: Point,
			year: 1608,
			chapter: 24,
			region: Americas,
			layer: 3
		},{
			text: 'Foundation of New Amsterdam',
			type: Point,
			year: 1623,
			chapter: 24,
			region: Americas,
			layer: 3
		},{
			text: 'Foundation of the Massachusetts Bay Colony',
			type: Point,
			year: 1630,
			chapter: 24,
			region: Americas,
			layer: 1
		},{
			text: 'Smallpox epidemic on Guam',
			type: Point,
			year: 1688,
			chapter: 24,
			region: Americas,
			layer: 2
		},{
			text: 'French and Indian war in North America',
			type: Ranged,
			year1: 1754,
			year2: 1763,
			chapter: 24,
			region: Americas,
			layer: 3
		},{
			text: 'Transfer of French Canadian possessions to British rule',
			type: Point,
			year: 1763,
			chapter: 24,
			region: Americas,
			layer: 4
		},{
			text: 'Establishment of first European colony in Australia',
			type: Point,
			year: 1788,
			chapter: 24,
			region: Oceania,
			layer: 1

		}
	];

	EVENTS.RANGED = 1;
	EVENTS.POINT = 2;
	EVENTS.ASIA = 1;
	EVENTS.AFRICA = 2;
	EVENTS.EUROPE = 4;
	EVENTS.OCEANIA = 8;
	EVENTS.AMERICAS = 16;
}();