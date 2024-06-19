import React from 'react';
import { Box, Typography, TextField, Button, Link } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Box sx={{ backgroundColor: '#1c1c1c', color: 'white', padding: '2rem 6%', borderTopLeftRadius: '3rem', borderTopRightRadius: '3rem' }}>
      <Box
        display={isNonMobileScreens ? 'flex' : 'block'}
        justifyContent={isNonMobileScreens ? 'space-between' : 'center'}
        gap="2rem"
      >
        <Box flexBasis="20%" textAlign={isNonMobileScreens ? 'left' : 'center'}>
          <Typography variant="h5" mb="1rem" mt="1rem">Cars By Make</Typography>
          <Box textAlign={isNonMobileScreens ? 'left' : 'center'}>
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Toyota Cars for Sale</Link><br />
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Suzuki Cars for Sale</Link><br />
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Honda Cars for Sale</Link><br />
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Daihatsu Cars for Sale</Link><br />
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Mitsubishi Cars for Sale</Link><br />
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Nissan Cars for Sale</Link><br />
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Mercedes Cars for Sale</Link><br />
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Hyundai Cars for Sale</Link><br />
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>BMW Cars for Sale</Link>
          </Box>
        </Box>
        <Box flexBasis="20%" textAlign={isNonMobileScreens ? 'left' : 'center'}>
          <Typography variant="h5" mb="1rem" mt="1rem">Cars By City</Typography>
          <Box textAlign={isNonMobileScreens ? 'left' : 'center'}>
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Cars in Lahore</Link><br />
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Cars in Karachi</Link><br />
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Cars in Islamabad</Link><br />
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Cars in Rawalpindi</Link><br />
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Cars in Peshawar</Link><br />
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Cars in Faisalabad</Link><br />
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Cars in Multan</Link><br />
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Cars in Gujranwala</Link><br />
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Cars in Sialkot</Link><br />
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Cars in Sargodha</Link>
          </Box>
        </Box>
        <Box flexBasis="20%" textAlign={isNonMobileScreens ? 'left' : 'center'}>
          <Typography variant="h5" mb="1rem" mt="1rem">Explore DriveNet</Typography>
          <Box textAlign={isNonMobileScreens ? 'left' : 'center'}>
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Used Cars</Link><br />
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Used Bikes</Link><br />
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>New Cars</Link><br />
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Auto Parts & Accessories</Link><br />
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Cool Rides</Link><br />
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Forums</Link><br />
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Autoshow</Link><br />
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Sitemap</Link>
          </Box>
        </Box>
        <Box flexBasis="20%" textAlign={isNonMobileScreens ? 'left' : 'center'}>
          <Typography variant="h5" mb="1rem" mt="1rem">DriveNet.com</Typography>
          <Box textAlign={isNonMobileScreens ? 'left' : 'center'}>
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>About DriveNet.com</Link><br />
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Our Products</Link><br />
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Advertise With Us</Link><br />
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>How To Pay</Link><br />
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>FAQs</Link><br />
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Refunds & Returns</Link><br />
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Careers</Link><br />
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Contact Us</Link>
          </Box>
        </Box>
        <Box flexBasis="20%" textAlign={isNonMobileScreens ? 'left' : 'center'}>
          <Typography variant="h5" mb="1rem" mt="1rem">Sell On DriveNet</Typography>
          <Box textAlign={isNonMobileScreens ? 'left' : 'center'}>
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Sell Your Car</Link><br />
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Sell Your Bike</Link><br />
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Sell Accessory</Link>
          </Box>
          <Typography variant="h5" mt="1rem">Subscribe to our Newsletter</Typography>
          <Box display="flex" mt="0.5rem" justifyContent={isNonMobileScreens ? 'left' : 'center'}>
            <TextField variant="outlined" size="small" placeholder="name@email.com" sx={{ bgcolor: 'silver', borderRadius: '4px', flexGrow: 1, color: 'gray' }} />
            <Button variant="contained" color="success" sx={{ ml: '0.5rem' }}>Subscribe</Button>
          </Box>
          <Box mt="1rem" textAlign={isNonMobileScreens ? 'left' : 'center'}>
            <Typography variant="h5" mb="1rem">Follow Us</Typography>
            <Box display="flex" gap="1rem" justifyContent={isNonMobileScreens ? 'left' : 'center'}>
              <i className="fab fa-facebook-f" style={{ fontSize: '2rem' }}></i>
              <i className="fab fa-twitter" style={{ fontSize: '2rem' }}></i>
              <i className="fab fa-pinterest" style={{ fontSize: '2rem' }}></i>
              <i className="fab fa-instagram" style={{ fontSize: '2rem' }}></i>
              <i className="fab fa-youtube" style={{ fontSize: '2rem' }}></i>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ textAlign: 'center', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid gray' }}>
        <Typography variant="body2">
          Copyright © 2023 - 2024 DriveNet Market (Pvt) Ltd. - All Rights Reserved.
        </Typography>
        <Box display="flex" justifyContent="center" flexWrap="wrap">
          <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' }, margin: '0 0.5rem' }}>
            Terms of Service
          </Link>
          <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' }, margin: '0 0.5rem' }}>
            Privacy Policy
          </Link>
        </Box>
        <Typography variant="body2" sx={{ marginTop: '0.5rem' }}>
          Reproduction of material from any DriveNet.com pages without permission is strictly prohibited.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
