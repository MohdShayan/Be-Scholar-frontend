import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Box, useColorMode, useColorModeValue } from "@chakra-ui/react";
const Footer = () => {
  const { toggleColorMode } = useColorMode();

  const bgColor = useColorModeValue('gray.200', 'gray.800');
  const textColor = useColorModeValue('black', 'white');
  
  return (
    <Box className='flex flex-col md:flex-row lg:flex-row bg-gray-200 shadow-md justify-center items-center shadow-black'
      bg={bgColor} 
      color={textColor} 
      py={4}
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
  )
}

export default Footer
