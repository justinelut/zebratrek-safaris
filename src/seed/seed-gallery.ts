export default async function seedGallery(payload: any, images: Record<string, any>) {
  const items = [
    { image: images['wildlife/lion.jpg'], category: 'Wildlife', caption: 'Male lion at golden hour, Masai Mara', location: 'Masai Mara', featured: true, order: 1 },
    { image: images['wildlife/elephant.jpg'], category: 'Wildlife', caption: 'Elephant herd crossing, Amboseli', location: 'Amboseli', featured: true, order: 2 },
    { image: images['wildlife/leopard.jpg'], category: 'Wildlife', caption: 'Leopard in repose', location: 'Samburu', featured: true, order: 3 },
    { image: images['wildlife/cheetah.jpg'], category: 'Wildlife', caption: 'Cheetah scanning the plains', location: 'Masai Mara', order: 4 },
    { image: images['wildlife/giraffe.jpg'], category: 'Wildlife', caption: 'Reticulated giraffe at dusk', location: 'Samburu', order: 5 },
    { image: images['wildlife/zebra.jpg'], category: 'Wildlife', caption: 'Zebra herd at sunset', location: 'Masai Mara', order: 6 },
    { image: images['wildlife/buffalo.jpg'], category: 'Wildlife', caption: 'Cape buffalo in long grass', location: 'Tsavo', order: 7 },
    { image: images['wildlife/rhino.jpg'], category: 'Wildlife', caption: 'White rhino at Lake Nakuru', location: 'Lake Nakuru', order: 8 },
    { image: images['wildlife/wildebeest.jpg'], category: 'Wildlife', caption: 'The Great Migration', location: 'Masai Mara', order: 9 },
    { image: images['wildlife/hippo.jpg'], category: 'Wildlife', caption: 'Hippo pod', location: 'Mara River', order: 10 },
    { image: images['landscapes/savanna-sunrise.jpg'], category: 'Landscapes', caption: 'Dawn over the savanna', location: 'Masai Mara', featured: true, order: 11 },
    { image: images['landscapes/masai-mara.jpg'], category: 'Landscapes', caption: 'Endless plains', location: 'Masai Mara', order: 12 },
    { image: images['landscapes/kilimanjaro.jpg'], category: 'Landscapes', caption: 'Kilimanjaro at first light', location: 'Amboseli', featured: true, order: 13 },
    { image: images['landscapes/sunset-savanna.jpg'], category: 'Landscapes', caption: 'African sunset', location: 'Tsavo', order: 14 },
    { image: images['landscapes/acacia-tree.jpg'], category: 'Landscapes', caption: 'Lone acacia silhouette', order: 15 },
    { image: images['landscapes/lake-flamingos.jpg'], category: 'Landscapes', caption: 'Flamingos at Lake Nakuru', location: 'Lake Nakuru', order: 16 },
    { image: images['lodges/luxury-tent.jpg'], category: 'Camps', caption: 'Luxury tent interior', featured: true, order: 17 },
    { image: images['lodges/lodge-pool.jpg'], category: 'Camps', caption: 'Infinity pool overlooking the bush', order: 18 },
    { image: images['lodges/camp-exterior.jpg'], category: 'Camps', caption: 'Camp at dusk', order: 19 },
    { image: images['experiences/game-drive.jpg'], category: 'Vehicles', caption: 'Custom 4x4 game drive', featured: true, order: 20 },
    { image: images['experiences/hot-air-balloon.jpg'], category: 'Vehicles', caption: 'Hot air balloon at dawn', order: 21 },
    { image: images['experiences/sundowner.jpg'], category: 'Guests', caption: 'Sundowner moment', featured: true, order: 22 },
    { image: images['people/guide.jpg'], category: 'Guests', caption: 'Our guide team', order: 23 },
    { image: images['people/guests-safari.jpg'], category: 'Guests', caption: 'Guests on safari', order: 24 },
  ]

  for (const item of items) {
    if (!item.image) continue
    await payload.create({ collection: 'gallery-images', data: item as any })
  }
  console.log('  ✓ Gallery Images (~24)')
}
