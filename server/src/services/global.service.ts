import cloudinary from 'cloudinary'


export const getImageUrl = async (path: string) => {
  return (await cloudinary.v2.uploader.upload(path)).secure_url
};
