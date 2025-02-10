// Avatar.tsx
import React from "react";

interface AvatarProps {
  imageUrl: string;
  altText: string;
  size?: number; // Optional size prop, default to 40px if not provided
}
// import image from '../assets/images/user.png'
const Avatar: React.FC<AvatarProps> = ({ imageUrl, altText, size = 40 }) => {
  
  return (
    <img
      src={imageUrl}
      alt={altText}
      className={`rounded-full  w-10 h-10}`}
    />
  );
};

export default Avatar;
