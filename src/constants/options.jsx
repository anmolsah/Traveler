export const SelectTravelesList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A sole travels in exploration",
    icon: "🧳",
    people: "1",
  },
  {
    id: 2,
    title: "Friends",
    desc: "A group of friends travels together",
    icon: "🥂",
    people: "2-10",
  },
  {
    id: 3,
    title: "Family",
    desc: "A family travels together",
    icon: "👪",
    people: "2-6",
  },
  {
    id: 4,
    title: "Couples",
    desc: "A couple travels together",
    icon: "❤",
    people: "2",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Budget friendly option",
    icon: "🛺",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "A balanced budget option",
    icon: "🚕",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "A high end budget option",
    icon: "🚗",
  },
];

export const AI_PROMPT =
  "Generate a comprehensive travel plan for the location: {location}, for {totalDays} days, for {traveler} traveler(s) with a budget of {budget}. IMPORTANT: Create itinerary days in sequential order (day_1, day_2, day_3, etc.) for all {totalDays} days. Please provide the response in the following JSON format: { \"hotels\": [{ \"name\": \"Hotel Name\", \"address\": \"Full Address\", \"price_per_night\": \"$100-150\", \"rating\": \"4.5\", \"description\": \"Brief description\", \"amenities\": [\"WiFi\", \"Pool\", \"Gym\"], \"geo_coordinates\": { \"lat\": 0.0, \"lng\": 0.0 } }], \"itinerary\": { \"day_1\": [{ \"place_name\": \"Place Name\", \"description\": \"Description\", \"ticket_pricing\": \"$10-20\", \"travel_time\": \"30 mins\", \"best_time_to_visit\": \"Morning\", \"geo_coordinates\": { \"lat\": 0.0, \"lng\": 0.0 }, \"activity_duration\": \"2-3 hours\" }], \"day_2\": [{ \"place_name\": \"Another Place\", \"description\": \"Description\", \"ticket_pricing\": \"$15-25\", \"travel_time\": \"45 mins\", \"best_time_to_visit\": \"Afternoon\", \"geo_coordinates\": { \"lat\": 0.0, \"lng\": 0.0 }, \"activity_duration\": \"3-4 hours\" }] }, \"transportation\": [{ \"type\": \"Bus/Train/Taxi\", \"cost\": \"$5-10\", \"description\": \"Local transport info\" }], \"packing_list\": [\"Essential items based on destination and weather\"], \"local_info\": { \"currency\": \"USD\", \"language\": \"English\", \"emergency_numbers\": { \"police\": \"911\", \"medical\": \"911\" }, \"weather_info\": \"General weather description\", \"cultural_tips\": [\"Local customs and etiquette\"] }, \"estimated_budget\": { \"accommodation\": \"$200-400\", \"food\": \"$150-300\", \"activities\": \"$100-200\", \"transportation\": \"$50-100\", \"total\": \"$500-1000\" } }";
