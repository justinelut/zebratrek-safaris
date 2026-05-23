export default async function seedTestimonials(payload: any) {
  const testimonials = [
    { guestName: 'James & Sophie Mitchell', guestCountry: 'United Kingdom', tripType: 'Honeymoon Safari', rating: 5, featured: true, status: 'approved', quote: "We've travelled extensively, but nothing prepared us for this. Waking up to elephants outside our tent, the sundowner overlooking the Mara — it was the most romantic week of our lives." },
    { guestName: 'Dr. Hans Weber', guestCountry: 'Germany', tripType: 'Photography Safari', rating: 5, featured: true, status: 'approved', quote: "Daniel's knowledge of big cat behaviour is extraordinary. He positioned us perfectly for a cheetah hunt at golden hour. I came home with portfolio-worthy images I never thought possible." },
    { guestName: 'The Nakamura Family', guestCountry: 'Japan', tripType: 'Family Safari', rating: 5, featured: true, status: 'approved', quote: "Our children (8 and 11) still talk about their junior ranger badges. The guides made everything accessible and exciting for them. A family trip we'll treasure forever." },
    { guestName: 'Catherine Dubois', guestCountry: 'France', tripType: 'Classic Masai Mara', rating: 5, featured: true, status: 'approved', quote: "The silence after a lion's roar fades. The way dust turns gold at six in the evening. ZebraTrek understood exactly what I was looking for — not a tour, but a transformation." },
    { guestName: 'Michael & Lisa Chen', guestCountry: 'United States', tripType: 'Great Migration', rating: 5, featured: false, status: 'approved', quote: "Witnessing the river crossing was a once-in-a-lifetime moment. The mobile camp setup was surprisingly comfortable, and our guide Joseph knew exactly where to position us." },
    { guestName: 'Amara Okafor', guestCountry: 'Nigeria', tripType: 'Luxury Amboseli', rating: 5, featured: false, status: 'approved', quote: "As an African visiting East Africa for the first time, I was moved to tears by the beauty. The elephants against Kilimanjaro at sunrise — no photograph does it justice." },
    { guestName: 'Robert & Emma Thompson', guestCountry: 'Australia', tripType: 'Classic Masai Mara', rating: 4, featured: false, status: 'approved', quote: "Excellent organisation from start to finish. Grace handled every detail perfectly. The only reason it's not 5 stars is because we didn't book a longer trip!" },
    { guestName: 'Isabella Rossi', guestCountry: 'Italy', tripType: 'Honeymoon Safari', rating: 5, featured: false, status: 'approved', quote: "The bush dinner under the stars, with just the two of us and the sounds of the African night — it was more romantic than anything we could have imagined. Peter arranged everything perfectly." },
  ]

  for (const t of testimonials) {
    await payload.create({ collection: 'testimonials', data: t })
  }
  console.log('  ✓ Testimonials (8)')
}
