

export const fetchNearbyGlutenFreePlaces = async (latitude: number, longitude: number) => {
    const radius = 32186; // 20 miles in meters
    const type = 'restaurant'; // Specify the type of places you want
    const keyword = 'mexican'; // Keyword for filtering

    const response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&keyword=${keyword}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`);

    if (!response.ok) {
        throw new Error('Failed to fetch nearby places');
    }

    const data = await response.json();
    return data.results; // Returns an array of places
};