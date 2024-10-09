import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Box, useColorMode, useColorModeValue } from "@chakra-ui/react";

const Footer = () => {
  // Access color mode
  const { toggleColorMode } = useColorMode();

  // Define background and text color based on the theme
  const bgColor = useColorModeValue('gray.200', 'gray.800');
  const textColor = useColorModeValue('black', 'white');
  
  return (
    <Box
      className='flex flex-col md:flex-row lg:flex-row shadow-md justify-center items-center'
      bg={bgColor} // Set background color based on theme
      color={textColor} // Set text color based on theme
      py={4} // Add some padding
    >
      <div className="foot-left">
        <Image
          src="https://drive.google.com/uc?export=download&id=1Mw0EcZHPZRRmK6SPwtBjMTNqYlaizVmL"
          width={80}
          height={80}
          alt='footer'
        />
      </div>
      <div className="foot-right text-md font-light flex flex-col lg:flex-row md:flex-row gap-2">
        Ⓒ Copyright - beScholar 2024 |
        <div className="goto-footer text-sm flex gap-2 mt-1">
          <Link href="/pages/homepage">Go to Home |</Link>
          <Link href="/pages/help">Go to Help |</Link>
          <Link href="/pages/contact">Go to Contact</Link>
        </div>
      </div>
    </Box>
  );
};

export default Footer;
