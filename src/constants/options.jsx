export const SelectTravelesList=[
    {
        id:1,
        title:'Just Me',
        desc:'A sole travels in exploration',
        icon:'🧳',
        people:'1'
    },
    {
        id:2,
        title:'Friends',
        desc:'A group of friends travels together',
        icon:'🥂',
        people:'2-10'
    },
    {
        id:3,
        title:'Family',
        desc:'A family travels together',
        icon:'👪',
        people:'2-6'
    },
    {
        id:4,
        title:'Couples',
        desc:'A couple travels together',
        icon:'❤',
        people:'2'
    }

]

export const SelectBudgetOptions=[
    {
      id:1,
      title:'Cheap',
      desc:'Budget friendly option',
      icon:'🛺',
    },
    {
        id:2,
        title:'Moderate',
        desc:'A balanced budget option',
        icon:'🚕'
    },
    {
        id:3,
        title:'Luxury',
        desc:'A high end budget option',
        icon:'🚗'
    }
]

export const AI_PROMPT="Generate a travel plan for the location: {location}, for {totalDays} days, for {traveler} traveler(s) with a budget of {budget}. Please provide a list of hotel options, including the hotel name, address, price, image URL, geo-coordinates, rating, and a brief description. Additionally, suggest an itinerary with details for each place, including the place name, description, image URL, geo-coordinates, ticket pricing, travel time to each location, and the best time to visit, organized into a day-by-day plan for the {totalDays} days, all in JSON format.";