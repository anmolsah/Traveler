import { GoogleGenerativeAI } from "@google/generative-ai";
  
  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "generate travel plan for location: Bali for 4 days for couple with cheap budget,give me the list of hotesl with hotel name,hotel address,price ,hotel image url,geo coordinates, rating,description and suggest itinerary with place name ,place details,place image url, geo coordinates, ticket pricing , time to travel each of the loaction for the 4 days with each day plan with best time to visit in json fromat\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"travel_plan\": {\n    \"title\": \"Budget-Friendly 4-Day India Trip for Couples\",\n    \"location\": \"India\",\n    \"duration\": 4,\n    \"budget\": \"Budget\",\n    \"hotel\": [\n      {\n        \"name\": \"The Gateway Hotel, New Delhi\",\n        \"address\": \"Ashoka Rd, Sector 1, Connaught Place, New Delhi, Delhi 110001\",\n        \"price_per_night\": \"$50-$70\",\n        \"image_url\": \"https://www.tajhotels.com/content/dam/taj/india/new-delhi/the-gateway-hotel-new-delhi/hero-image.jpg\",\n        \"geo_coordinates\": {\n          \"latitude\": 28.6328,\n          \"longitude\": 77.2182\n        },\n        \"rating\": 4.5,\n        \"description\": \"A modern hotel with stylish rooms, a rooftop pool, and a well-regarded restaurant. Located in the heart of New Delhi, it's perfect for exploring the city.\"\n      }\n    ],\n    \"itinerary\": [\n      {\n        \"day\": 1,\n        \"title\": \"Delhi: Historical Charm and Vibrant Culture\",\n        \"places\": [\n          {\n            \"name\": \"Red Fort\",\n            \"description\": \"A UNESCO World Heritage site and a magnificent example of Mughal architecture.\",\n            \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Red_Fort_Delhi_India.jpg/1200px-Red_Fort_Delhi_India.jpg\",\n            \"geo_coordinates\": {\n              \"latitude\": 28.6560,\n              \"longitude\": 77.2397\n            },\n            \"ticket_pricing\": \"INR 10 for Indians, INR 200 for foreigners\",\n            \"best_time_to_visit\": \"Morning\",\n            \"estimated_travel_time\": \"30 minutes\"\n          },\n          {\n            \"name\": \"Jama Masjid\",\n            \"description\": \"The largest mosque in India, known for its stunning architecture and intricate details.\",\n            \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Jama_Masjid_Delhi.jpg/1200px-Jama_Masjid_Delhi.jpg\",\n            \"geo_coordinates\": {\n              \"latitude\": 28.6520,\n              \"longitude\": 77.2335\n            },\n            \"ticket_pricing\": \"Free\",\n            \"best_time_to_visit\": \"Afternoon\",\n            \"estimated_travel_time\": \"15 minutes\"\n          },\n          {\n            \"name\": \"Chandni Chowk\",\n            \"description\": \"A bustling market area known for its street food, spices, and traditional Indian crafts.\",\n            \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Chandni_Chowk_2019.jpg/1200px-Chandni_Chowk_2019.jpg\",\n            \"geo_coordinates\": {\n              \"latitude\": 28.6484,\n              \"longitude\": 77.2305\n            },\n            \"ticket_pricing\": \"Free\",\n            \"best_time_to_visit\": \"Evening\",\n            \"estimated_travel_time\": \"15 minutes\"\n          }\n        ]\n      },\n      {\n        \"day\": 2,\n        \"title\": \"Agra: Witnessing the Taj Mahal's Glory\",\n        \"places\": [\n          {\n            \"name\": \"Taj Mahal\",\n            \"description\": \"One of the Seven Wonders of the World, a symbol of love and architectural brilliance.\",\n            \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Taj_Mahal%2C_India_at_sunset.jpg/1200px-Taj_Mahal%2C_India_at_sunset.jpg\",\n            \"geo_coordinates\": {\n              \"latitude\": 27.1751,\n              \"longitude\": 78.0421\n            },\n            \"ticket_pricing\": \"INR 50 for Indians, INR 1100 for foreigners\",\n            \"best_time_to_visit\": \"Sunrise or Sunset\",\n            \"estimated_travel_time\": \"3 hours from Delhi by train\"\n          },\n          {\n            \"name\": \"Agra Fort\",\n            \"description\": \"A magnificent red sandstone fort built by Mughal emperors, offering panoramic views of the Taj Mahal.\",\n            \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Agra_Fort_2011.jpg/1200px-Agra_Fort_2011.jpg\",\n            \"geo_coordinates\": {\n              \"latitude\": 27.1742,\n              \"longitude\": 78.0362\n            },\n            \"ticket_pricing\": \"INR 40 for Indians, INR 600 for foreigners\",\n            \"best_time_to_visit\": \"Afternoon\",\n            \"estimated_travel_time\": \"15 minutes from Taj Mahal\"\n          }\n        ]\n      },\n      {\n        \"day\": 3,\n        \"title\": \"Jaipur: The Pink City's Royal Charm\",\n        \"places\": [\n          {\n            \"name\": \"Hawa Mahal\",\n            \"description\": \"A beautiful palace with 953 windows, designed to allow the royal women to observe life outside without being seen.\",\n            \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Hawa_Mahal_Jaipur_India_01.jpg/1200px-Hawa_Mahal_Jaipur_India_01.jpg\",\n            \"geo_coordinates\": {\n              \"latitude\": 26.9222,\n              \"longitude\": 75.8207\n            },\n            \"ticket_pricing\": \"INR 50 for Indians, INR 200 for foreigners\",\n            \"best_time_to_visit\": \"Morning\",\n            \"estimated_travel_time\": \"3 hours from Agra by train\"\n          },\n          {\n            \"name\": \"City Palace\",\n            \"description\": \"A magnificent palace complex with beautiful gardens, museums, and a royal residence.\",\n            \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/City_Palace_Jaipur.jpg/1200px-City_Palace_Jaipur.jpg\",\n            \"geo_coordinates\": {\n              \"latitude\": 26.9219,\n              \"longitude\": 75.8206\n            },\n            \"ticket_pricing\": \"INR 70 for Indians, INR 300 for foreigners\",\n            \"best_time_to_visit\": \"Afternoon\",\n            \"estimated_travel_time\": \"10 minutes from Hawa Mahal\"\n          },\n          {\n            \"name\": \"Jantar Mantar\",\n            \"description\": \"A unique astronomical observatory with massive sundials and other instruments built in the 18th century.\",\n            \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Jantar_Mantar_Jaipur_India_01.jpg/1200px-Jantar_Mantar_Jaipur_India_01.jpg\",\n            \"geo_coordinates\": {\n              \"latitude\": 26.9202,\n              \"longitude\": 75.8218\n            },\n            \"ticket_pricing\": \"INR 50 for Indians, INR 200 for foreigners\",\n            \"best_time_to_visit\": \"Evening\",\n            \"estimated_travel_time\": \"15 minutes from City Palace\"\n          }\n        ]\n      },\n      {\n        \"day\": 4,\n        \"title\": \"Jaipur: Local Markets & Cultural Experiences\",\n        \"places\": [\n          {\n            \"name\": \"Amber Fort\",\n            \"description\": \"A majestic hilltop fort with stunning architecture and views of the surrounding landscape.\",\n            \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Amber_Fort_Jaipur.jpg/1200px-Amber_Fort_Jaipur.jpg\",\n            \"geo_coordinates\": {\n              \"latitude\": 26.9997,\n              \"longitude\": 75.8264\n            },\n            \"ticket_pricing\": \"INR 100 for Indians, INR 500 for foreigners\",\n            \"best_time_to_visit\": \"Morning\",\n            \"estimated_travel_time\": \"30 minutes from Jaipur city center\"\n          },\n          {\n            \"name\": \"Johari Bazaar\",\n            \"description\": \"A vibrant market known for its jewelry, textiles, and traditional handicrafts.\",\n            \"image_url\": \"https://www.holidify.com/images/cmsuploads/2020/03/Johari-Bazaar-Jaipur-01.jpg\",\n            \"geo_coordinates\": {\n              \"latitude\": 26.9224,\n              \"longitude\": 75.8227\n            },\n            \"ticket_pricing\": \"Free\",\n            \"best_time_to_visit\": \"Afternoon\",\n            \"estimated_travel_time\": \"15 minutes from Amber Fort\"\n          },\n          {\n            \"name\": \"Bapu Bazaar\",\n            \"description\": \"A bustling market offering a variety of goods, including clothes, shoes, and souvenirs.\",\n            \"image_url\": \"https://www.holidify.com/images/cmsuploads/2020/03/Bapu-Bazaar-Jaipur-01.jpg\",\n            \"geo_coordinates\": {\n              \"latitude\": 26.9216,\n              \"longitude\": 75.8200\n            },\n            \"ticket_pricing\": \"Free\",\n            \"best_time_to_visit\": \"Evening\",\n            \"estimated_travel_time\": \"10 minutes from Johari Bazaar\"\n          }\n        ]\n      }\n    ]\n  }\n}\n```"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "generate travel plan for location: Bali for 4 days for couple with cheap budget,give me the list of hotesl with hotel name,hotel address,price ,hotel image url,geo coordinates, rating,description and suggest itinerary with place name ,place details,place image url, geo coordinates, ticket pricing , time to travel each of the loaction for the 4 days with each day plan with best time to visit in json fromat"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"travel_plan\": {\n    \"title\": \"Budget-Friendly 4-Day Bali Trip for Couples\",\n    \"location\": \"Bali, Indonesia\",\n    \"duration\": 4,\n    \"budget\": \"Budget\",\n    \"hotel\": [\n      {\n        \"name\": \"The Kayon Jungle Resort\",\n        \"address\": \"Jl. Raya Ubud, Sayan, Ubud, Kabupaten Gianyar, Bali 80571, Indonesia\",\n        \"price_per_night\": \"$30-$50\",\n        \"image_url\": \"https://www.thekayonjungle.com/wp-content/uploads/2020/11/Kayon-Jungle-Resort-Ubud-Bali.jpg\",\n        \"geo_coordinates\": {\n          \"latitude\": -8.3531,\n          \"longitude\": 115.1519\n        },\n        \"rating\": 4.5,\n        \"description\": \"A charming resort nestled in the jungle, offering peaceful surroundings and beautiful views.  Great for a relaxing getaway.\"\n      },\n      {\n        \"name\": \"The Samaya Seminyak Bali\",\n        \"address\": \"Jl. Drupadi No.18, Seminyak, Kuta Utara, Kabupaten Badung, Bali 80361, Indonesia\",\n        \"price_per_night\": \"$40-$60\",\n        \"image_url\": \"https://www.thesamaya.com/seminyak/images/hotels/seminyak/exterior/thesamaya-seminyak-exterior-1.jpg\",\n        \"geo_coordinates\": {\n          \"latitude\": -8.6489,\n          \"longitude\": 115.0875\n        },\n        \"rating\": 4,\n        \"description\": \"A stylish hotel with modern rooms and a pool, located in the heart of Seminyak, close to shops, restaurants, and beaches.\"\n      }\n    ],\n    \"itinerary\": [\n      {\n        \"day\": 1,\n        \"title\": \"Ubud: Culture and Nature\",\n        \"places\": [\n          {\n            \"name\": \"Tegalalang Rice Terraces\",\n            \"description\": \"Stunning rice paddies with breathtaking views, perfect for photography and enjoying the natural beauty of Bali.\",\n            \"image_url\": \"https://www.thebalibible.com/wp-content/uploads/2018/02/Tegalalang-Rice-Terraces.jpg\",\n            \"geo_coordinates\": {\n              \"latitude\": -8.3456,\n              \"longitude\": 115.1897\n            },\n            \"ticket_pricing\": \"Entrance fee around $2\",\n            \"best_time_to_visit\": \"Morning or late afternoon\",\n            \"estimated_travel_time\": \"30 minutes from Ubud\"\n          },\n          {\n            \"name\": \"Ubud Monkey Forest\",\n            \"description\": \"A sanctuary for Balinese long-tailed macaques, offering a unique and interactive experience.\",\n            \"image_url\": \"https://www.thebalibible.com/wp-content/uploads/2017/02/Ubud-Monkey-Forest.jpg\",\n            \"geo_coordinates\": {\n              \"latitude\": -8.3505,\n              \"longitude\": 115.0922\n            },\n            \"ticket_pricing\": \"Entrance fee around $5\",\n            \"best_time_to_visit\": \"Morning or late afternoon\",\n            \"estimated_travel_time\": \"15 minutes from Tegalalang\"\n          },\n          {\n            \"name\": \"Ubud Traditional Art Market\",\n            \"description\": \"A lively market to browse for souvenirs, textiles, and local crafts.\",\n            \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Ubud_Market_%281%29.jpg/1024px-Ubud_Market_%281%29.jpg\",\n            \"geo_coordinates\": {\n              \"latitude\": -8.3497,\n              \"longitude\": 115.0931\n            },\n            \"ticket_pricing\": \"Free\",\n            \"best_time_to_visit\": \"Afternoon\",\n            \"estimated_travel_time\": \"10 minutes from Monkey Forest\"\n          }\n        ]\n      },\n      {\n        \"day\": 2,\n        \"title\": \"Ubud: Spiritual and Artistic Immersion\",\n        \"places\": [\n          {\n            \"name\": \"Tirta Empul Temple\",\n            \"description\": \"A sacred Hindu temple with holy spring water used for purification rituals.\",\n            \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Tirta_Empul_Temple_1.jpg/1280px-Tirta_Empul_Temple_1.jpg\",\n            \"geo_coordinates\": {\n              \"latitude\": -8.3519,\n              \"longitude\": 115.1001\n            },\n            \"ticket_pricing\": \"Entrance fee around $2\",\n            \"best_time_to_visit\": \"Morning or evening\",\n            \"estimated_travel_time\": \"30 minutes from Ubud\"\n          },\n          {\n            \"name\": \"Ubud Palace\",\n            \"description\": \"A beautiful palace complex showcasing Balinese architecture and traditional dance performances.\",\n            \"image_url\": \"https://www.thebalibible.com/wp-content/uploads/2017/02/Ubud-Palace.jpg\",\n            \"geo_coordinates\": {\n              \"latitude\": -8.3492,\n              \"longitude\": 115.0926\n            },\n            \"ticket_pricing\": \"Entrance fee around $1\",\n            \"best_time_to_visit\": \"Afternoon\",\n            \"estimated_travel_time\": \"10 minutes from Tirta Empul\"\n          },\n          {\n            \"name\": \"Campuhan Ridge Walk\",\n            \"description\": \"A scenic hiking trail offering stunning views of the rice fields and surrounding countryside.\",\n            \"image_url\": \"https://www.thebalibible.com/wp-content/uploads/2017/01/Campuhan-Ridge-Walk-Ubud.jpg\",\n            \"geo_coordinates\": {\n              \"latitude\": -8.3477,\n              \"longitude\": 115.0979\n            },\n            \"ticket_pricing\": \"Free\",\n            \"best_time_to_visit\": \"Late afternoon or evening\",\n            \"estimated_travel_time\": \"30 minutes from Ubud Palace\"\n          }\n        ]\n      },\n      {\n        \"day\": 3,\n        \"title\": \"Seminyak: Beach Life and Shopping\",\n        \"places\": [\n          {\n            \"name\": \"Seminyak Beach\",\n            \"description\": \"A popular beach with soft sand, perfect for sunbathing, swimming, and enjoying the sunset.\",\n            \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Seminyak_Beach_Bali_20180802.jpg/1280px-Seminyak_Beach_Bali_20180802.jpg\",\n            \"geo_coordinates\": {\n              \"latitude\": -8.6478,\n              \"longitude\": 115.0878\n            },\n            \"ticket_pricing\": \"Free\",\n            \"best_time_to_visit\": \"Afternoon\",\n            \"estimated_travel_time\": \"1 hour from Ubud\"\n          },\n          {\n            \"name\": \"Seminyak Shopping\",\n            \"description\": \"Browse the trendy boutiques and shops along Seminyak's streets, finding everything from fashion and accessories to home decor and souvenirs.\",\n            \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Seminyak_shopping_streets.jpg/1280px-Seminyak_shopping_streets.jpg\",\n            \"geo_coordinates\": {\n              \"latitude\": -8.6501,\n              \"longitude\": 115.0875\n            },\n            \"ticket_pricing\": \"Free\",\n            \"best_time_to_visit\": \"Afternoon\",\n            \"estimated_travel_time\": \"10 minutes from Seminyak Beach\"\n          },\n          {\n            \"name\": \"Double Six Beach\",\n            \"description\": \"Another popular beach in Seminyak, known for its lively atmosphere and beach clubs.\",\n            \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Double_Six_Beach_Seminyak_Bali.jpg/1280px-Double_Six_Beach_Seminyak_Bali.jpg\",\n            \"geo_coordinates\": {\n              \"latitude\": -8.6461,\n              \"longitude\": 115.0911\n            },\n            \"ticket_pricing\": \"Free\",\n            \"best_time_to_visit\": \"Evening\",\n            \"estimated_travel_time\": \"15 minutes from Seminyak Shopping\"\n          }\n        ]\n      },\n      {\n        \"day\": 4,\n        \"title\": \"Canggu: Surf Culture and Relaxation\",\n        \"places\": [\n          {\n            \"name\": \"Echo Beach\",\n            \"description\": \"A popular surf spot with a relaxed vibe, offering cafes, restaurants, and beachfront yoga studios.\",\n            \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Echo_Beach_Canggu.jpg/1280px-Echo_Beach_Canggu.jpg\",\n            \"geo_coordinates\": {\n              \"latitude\": -8.6531,\n              \"longitude\": 115.1014\n            },\n            \"ticket_pricing\": \"Free\",\n            \"best_time_to_visit\": \"Morning or afternoon\",\n            \"estimated_travel_time\": \"30 minutes from Seminyak\"\n          },\n          {\n            \"name\": \"The Lawn\",\n            \"description\": \"A popular spot for sunset drinks and dining, offering stunning views of the ocean.\",\n            \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/The_Lawn_Canggu_Bali.jpg/1280px-The_Lawn_Canggu_Bali.jpg\",\n            \"geo_coordinates\": {\n              \"latitude\": -8.6458,\n              \"longitude\": 115.1027\n            },\n            \"ticket_pricing\": \"Free\",\n            \"best_time_to_visit\": \"Late afternoon\",\n            \"estimated_travel_time\": \"10 minutes from Echo Beach\"\n          },\n          {\n            \"name\": \"Canggu Rice Fields\",\n            \"description\": \"Tranquil rice paddies perfect for a relaxing walk or a picnic.\",\n            \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Canggu_Rice_Terraces.jpg/1280px-Canggu_Rice_Terraces.jpg\",\n            \"geo_coordinates\": {\n              \"latitude\": -8.6592,\n              \"longitude\": 115.1069\n            },\n            \"ticket_pricing\": \"Free\",\n            \"best_time_to_visit\": \"Evening\",\n            \"estimated_travel_time\": \"15 minutes from The Lawn\"\n          }\n        ]\n      }\n    ]\n  }\n}\n```\n\n**Explanation:**\n\nThis JSON format provides a comprehensive travel plan for a budget-friendly 4-day trip to Bali for a couple:\n\n* **travel_plan:**\n    * **title:**  The name of the trip for easy reference.\n    * **location:** Specifies the destination.\n    * **duration:** Number of days in the trip.\n    * **budget:**  Indicates the trip is focused on budget-friendly options.\n* **hotel:** An array of suggested hotels with details:\n    * **name:** Hotel name.\n    * **address:** Full address.\n    * **price_per_night:** Estimated price range.\n    * **image_url:** Link to an image of the hotel.\n    * **geo_coordinates:** Latitude and longitude for location pinpointing.\n    * **rating:** Star rating for quick reference.\n    * **description:** Brief summary of the hotel and its features.\n* **itinerary:** A detailed day-by-day schedule:\n    * **day:**  Day number (e.g., 1, 2, 3, 4).\n    * **title:**  A short descriptive title for the day.\n    * **places:**  An array of places to visit on that day.\n        * **name:**  The place's name.\n        * **description:**  Detailed information about the place.\n        * **image_url:**  A link to an image of the place.\n        * **geo_coordinates:** Latitude and longitude for location.\n        * **ticket_pricing:** Estimated entrance fee or cost.\n        * **best_time_to_visit:** Recommended time of day for the best experience.\n        * **estimated_travel_time:**  Approximate travel time from the previous location (or starting point of the day).\n\n**Key Features of this Travel Plan:**\n\n* **Budget-friendly:** It focuses on affordable hotels and attractions with low or free entry fees.\n* **Variety:** The itinerary offers a mix of cultural, natural, and relaxing experiences.\n* **Detailed:** Provides specific locations, estimated costs, and timing suggestions. \n* **Easy to follow:**  Organized into a clear daily schedule.\n\n**How to Use This JSON:**\n\n* You can use this JSON as a base for planning your trip.\n* Modify the itinerary to fit your interests and time constraints.\n* Research additional information (like restaurants, transportation, or booking options) based on the locations provided. \n\n**Additional Tips:**\n\n* Book accommodations in advance, especially during peak seasons.\n* Consider using public transportation or ride-sharing services to save money.\n* Pack lightweight clothing suitable for the tropical climate.\n* Learn a few basic Indonesian phrases for better interactions with locals.\n* Be respectful of local customs and traditions.\n* Enjoy your trip to Bali! \n"},
          ],
        },
      ],
    });