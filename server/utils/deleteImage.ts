import cloudinary from "./cloudinary";

const destroyImage = async (image_url: string) => {
  try {
    const publicId: any = extractPublicId(image_url)
    const result = await cloudinary.uploader.destroy(publicId);
    console.log(result)
    console.log('Image deleted successfully:', result);
    return result;
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};

const extractPublicId = (imageUrl: string) => {
  // Use a regular expression to match the public ID part of the URL
  const regex = /\/upload\/(?:v\d+\/)?([^/.]+)\.[a-z]+$/i;
  const match = imageUrl.match(regex);
  return match ? match[1] : null; // Return the public ID if found, otherwise null
};

export default destroyImage