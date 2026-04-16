export interface City {
  name: string;
  state: string;
  lat: number;
  lng: number;
  type: 'metro' | 'major' | 'city' | 'tourist';
  hasAirport: boolean;
  hasRailway: boolean;
}

export const indianCities: City[] = [
  // Telangana
  { name: "Hyderabad", state: "Telangana", lat: 17.385, lng: 78.4867, type: "metro", hasAirport: true, hasRailway: true },
  { name: "Warangal", state: "Telangana", lat: 17.9784, lng: 79.5941, type: "city", hasAirport: false, hasRailway: true },
  { name: "Karimnagar", state: "Telangana", lat: 18.4386, lng: 79.1288, type: "city", hasAirport: false, hasRailway: true },
  { name: "Nizamabad", state: "Telangana", lat: 18.6725, lng: 78.0940, type: "city", hasAirport: false, hasRailway: true },
  { name: "Khammam", state: "Telangana", lat: 17.2473, lng: 80.1514, type: "city", hasAirport: false, hasRailway: true },
  
  // Kerala
  { name: "Kochi", state: "Kerala", lat: 9.9312, lng: 76.2673, type: "major", hasAirport: true, hasRailway: true },
  { name: "Thiruvananthapuram", state: "Kerala", lat: 8.5241, lng: 76.9366, type: "major", hasAirport: true, hasRailway: true },
  { name: "Kozhikode", state: "Kerala", lat: 11.2588, lng: 75.7804, type: "major", hasAirport: true, hasRailway: true },
  { name: "Munnar", state: "Kerala", lat: 10.0889, lng: 77.0595, type: "tourist", hasAirport: false, hasRailway: false },
  { name: "Alleppey", state: "Kerala", lat: 9.4981, lng: 76.3388, type: "tourist", hasAirport: false, hasRailway: true },
  { name: "Thrissur", state: "Kerala", lat: 10.5276, lng: 76.2144, type: "city", hasAirport: false, hasRailway: true },
  { name: "Kannur", state: "Kerala", lat: 11.8745, lng: 75.3704, type: "city", hasAirport: true, hasRailway: true },
  { name: "Kollam", state: "Kerala", lat: 8.8932, lng: 76.6141, type: "city", hasAirport: false, hasRailway: true },
  { name: "Thekkady", state: "Kerala", lat: 9.6000, lng: 77.1667, type: "tourist", hasAirport: false, hasRailway: false },
  { name: "Varkala", state: "Kerala", lat: 8.7333, lng: 76.7167, type: "tourist", hasAirport: false, hasRailway: true },
  { name: "Kumarakom", state: "Kerala", lat: 9.5917, lng: 76.4308, type: "tourist", hasAirport: false, hasRailway: false },
  { name: "Wayanad", state: "Kerala", lat: 11.6854, lng: 76.1320, type: "tourist", hasAirport: false, hasRailway: false },
  
  // Andhra Pradesh
  { name: "Vijayawada", state: "Andhra Pradesh", lat: 16.5062, lng: 80.6480, type: "major", hasAirport: true, hasRailway: true },
  { name: "Visakhapatnam", state: "Andhra Pradesh", lat: 17.6868, lng: 83.2185, type: "major", hasAirport: true, hasRailway: true },
  { name: "Tirupati", state: "Andhra Pradesh", lat: 13.6288, lng: 79.4192, type: "city", hasAirport: true, hasRailway: true },
  { name: "Guntur", state: "Andhra Pradesh", lat: 16.3067, lng: 80.4365, type: "city", hasAirport: false, hasRailway: true },
  { name: "Nellore", state: "Andhra Pradesh", lat: 14.4426, lng: 79.9865, type: "city", hasAirport: false, hasRailway: true },
  { name: "Rajahmundry", state: "Andhra Pradesh", lat: 17.0005, lng: 81.8040, type: "city", hasAirport: true, hasRailway: true },
  { name: "Amaravati", state: "Andhra Pradesh", lat: 16.5131, lng: 80.5150, type: "city", hasAirport: false, hasRailway: false },
  
  // Tamil Nadu
  { name: "Chennai", state: "Tamil Nadu", lat: 13.0827, lng: 80.2707, type: "metro", hasAirport: true, hasRailway: true },
  { name: "Madurai", state: "Tamil Nadu", lat: 9.9252, lng: 78.1198, type: "major", hasAirport: true, hasRailway: true },
  { name: "Coimbatore", state: "Tamil Nadu", lat: 11.0168, lng: 76.9558, type: "major", hasAirport: true, hasRailway: true },
  { name: "Ooty", state: "Tamil Nadu", lat: 11.4102, lng: 76.6950, type: "tourist", hasAirport: false, hasRailway: true },
  
  // Karnataka
  { name: "Bengaluru", state: "Karnataka", lat: 12.9716, lng: 77.5946, type: "metro", hasAirport: true, hasRailway: true },
  { name: "Mysuru", state: "Karnataka", lat: 12.2958, lng: 76.6394, type: "major", hasAirport: true, hasRailway: true },
  { name: "Mangaluru", state: "Karnataka", lat: 12.9141, lng: 74.8560, type: "major", hasAirport: true, hasRailway: true },
  
  // Maharashtra
  { name: "Mumbai", state: "Maharashtra", lat: 19.0760, lng: 72.8777, type: "metro", hasAirport: true, hasRailway: true },
  { name: "Pune", state: "Maharashtra", lat: 18.5204, lng: 73.8567, type: "metro", hasAirport: true, hasRailway: true },
  { name: "Goa", state: "Goa", lat: 15.2993, lng: 74.1240, type: "tourist", hasAirport: true, hasRailway: true },
  
  // North India
  { name: "Delhi", state: "Delhi", lat: 28.7041, lng: 77.1025, type: "metro", hasAirport: true, hasRailway: true },
  { name: "Jaipur", state: "Rajasthan", lat: 26.9124, lng: 75.7873, type: "major", hasAirport: true, hasRailway: true },
  { name: "Agra", state: "Uttar Pradesh", lat: 27.1767, lng: 78.0081, type: "tourist", hasAirport: true, hasRailway: true },
  { name: "Varanasi", state: "Uttar Pradesh", lat: 25.3176, lng: 82.9739, type: "tourist", hasAirport: true, hasRailway: true },
  { name: "Lucknow", state: "Uttar Pradesh", lat: 26.8467, lng: 80.9462, type: "major", hasAirport: true, hasRailway: true },
  { name: "Kolkata", state: "West Bengal", lat: 22.5726, lng: 88.3639, type: "metro", hasAirport: true, hasRailway: true },
  { name: "Ahmedabad", state: "Gujarat", lat: 23.0225, lng: 72.5714, type: "metro", hasAirport: true, hasRailway: true },
  { name: "Udaipur", state: "Rajasthan", lat: 24.5854, lng: 73.7125, type: "tourist", hasAirport: true, hasRailway: true },
  { name: "Shimla", state: "Himachal Pradesh", lat: 31.1048, lng: 77.1734, type: "tourist", hasAirport: true, hasRailway: true },
  { name: "Manali", state: "Himachal Pradesh", lat: 32.2396, lng: 77.1887, type: "tourist", hasAirport: false, hasRailway: false },
  { name: "Rishikesh", state: "Uttarakhand", lat: 30.0869, lng: 78.2676, type: "tourist", hasAirport: false, hasRailway: true },
  { name: "Amritsar", state: "Punjab", lat: 31.6340, lng: 74.8723, type: "major", hasAirport: true, hasRailway: true },
  { name: "Chandigarh", state: "Chandigarh", lat: 30.7333, lng: 76.7794, type: "major", hasAirport: true, hasRailway: true },
  { name: "Srinagar", state: "Jammu & Kashmir", lat: 34.0837, lng: 74.7973, type: "tourist", hasAirport: true, hasRailway: false },
  { name: "Leh", state: "Ladakh", lat: 34.1526, lng: 77.5771, type: "tourist", hasAirport: true, hasRailway: false },
  { name: "Darjeeling", state: "West Bengal", lat: 27.0360, lng: 88.2627, type: "tourist", hasAirport: false, hasRailway: true },
];

export function searchCities(query: string): City[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  
  // Search by city name OR state name
  return indianCities.filter(
    c => c.name.toLowerCase().includes(q) || c.state.toLowerCase().includes(q)
  ).slice(0, 10);
}

export function getCityByName(name: string): City | undefined {
  return indianCities.find(c => c.name.toLowerCase() === name.toLowerCase());
}
