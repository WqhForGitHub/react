interface PersonWithImage {
  imageId: string
}

export function getImageUrl(person: PersonWithImage, size: string = 's'): string {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  )
}
