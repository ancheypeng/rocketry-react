import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Menu, MenuItem, Box } from '@material-ui/core';

import { Link } from 'react-router-dom';

import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
// import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';

const transitionTime = 0.5;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  leftButtons: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: 'black',
    borderBottom: '1px solid black',
    color: 'white',
    transition: `all ${transitionTime}s`,
    boxShadow: 'none',
    paddingTop: 10,
    paddingBottom: 10,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 120,
      paddingRight: 120,
    },
    [theme.breakpoints.up('xl')]: {
      paddingLeft: 190,
      paddingRight: 190,
    },
    '&[data-active="true"]': {
      backgroundColor: '#0C0C0C',
      borderBottom: '1px solid #646464',
      // color: 'black',
      transition: `all ${transitionTime}s`,
      // boxShadow: `0px 0px 10px 0px rgba(0,0,0,0.15)`,
      // paddingTop: 5,
      // paddingBottom: 5,
    },
  },
  logo: {
    height: 50,
    width: 50,
  },
  appBarButtons: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    },
    color: 'lightgrey',
    transition: `all ${transitionTime}s`,
    // '&[data-active="true"]': {
    //   color: 'grey',
    //   transition: `all ${transitionTime}s`,
    // },

  },
  collapseAppBarButtons: {
    flexGrow: 1,
    [theme.breakpoints.up("md")]: {
      display: 'none'
    },
  },
  appBarIconButton: {
    marginRight: -2,
    marginLeft: -2,
    [theme.breakpoints.down("sm")]: {
      marginRight: -4,
      marginLeft: -4,
      "&:hover": {
        backgroundColor: "transparent"
      },
    },
  },
  appBarIcon: {
    color: 'lightgrey',
    transition: `all ${transitionTime}s`,
    // '&[data-active="true"]': {
    //   color: 'grey',
    //   transition: `all ${transitionTime}s`,
    // },
  },
  appBarButton: {
    marginLeft: 15,
    marginRight: 15,
    textTransform: 'none',
    fontSize: '1.1rem',
  },
  homeButton: {
    color: 'white',
    transition: `all ${transitionTime}s`,
    // '&[data-active="true"]': {
    //   color: 'white',
    //   transition: `all ${transitionTime}s`,
    // },
  }
}));

export default function Header({ active }) {
  const classes = useStyles();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        console.log(!scrolled);
        setScrolled(!scrolled);
      }
    };

    document.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      document.removeEventListener('scroll', handleScroll);
    }

  }, [active, scrolled]);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div className={classes.root}>
      <AppBar
        className={classes.appBar}
        data-active={active ? "true" : scrolled.toString()}
      //position={active ? "static" : "fixed"}
      >
        <Toolbar>
          <div className={classes.collapseAppBarButtons}>
            <Box ml={3}>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleClick}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >

              <MenuItem component={Link} to={'/'}>
                Home
                </MenuItem>
              {['Team', 'Rockets', 'Sponsors', 'Outreach', 'Blog', 'Contact'].map((text) => (

                <MenuItem component={Link} to={'/'}>
                  {/* <Link to={`/${text.toLowerCase()}`} key={text}> */}
                  {text}
                  {/* </Link> */}
                </MenuItem>

              ))}
            </Menu>
          </div>

          <div className={`${classes.leftButtons} ${classes.appBarButtons}`} data-active={active ? "true" : scrolled.toString()}>
            <IconButton>
              <img src="crt.png" alt="logo" className={classes.logo} />
            </IconButton>
            {/* <Link to="/"> */}
            <Button
              className={`${classes.homeButton} ${classes.appBarButton}`}
              data-active={active ? "true" : scrolled.toString()}
              component={Link} to={'/'}
            >
              Home
              </Button>
            {/* </Link> */}
            {['Team', 'Rockets', 'Sponsors'].map((text) => (
              <Button color="inherit" className={classes.appBarButton} component={Link} to={'/'}>
                {text}
              </Button>

            ))}
          </div>

          <div>
            <IconButton className={classes.appBarIconButton} target="_blank" href={"https://www.facebook.com/CornellRocketry/"}>
              <FacebookIcon className={classes.appBarIcon} data-active={active ? "true" : scrolled.toString()} />
            </IconButton>
            <IconButton className={classes.appBarIconButton} target="_blank" href={"https://www.instagram.com/cornellrocketry/?hl=en"}>
              <InstagramIcon className={classes.appBarIcon} data-active={active ? "true" : scrolled.toString()} />
            </IconButton>
            <IconButton className={classes.appBarIconButton} target="_blank" href={"https://www.youtube.com/channel/UCOIp04IIwcz8YvBcgrMYOhg"}>
              <YouTubeIcon className={classes.appBarIcon} data-active={active ? "true" : scrolled.toString()} />
            </IconButton>
          </div>

          <div className={classes.appBarButtons} data-active={active ? "true" : scrolled.toString()}>
            <Button color="inherit" className={classes.appBarButton} component={Link} to={'/'}>
              Contact
            </Button>
            {/* <Button color="inherit" className={classes.appBarButton} component={Link} to={'/'}>
              Donate
            </Button> */}
            <Button variant="contained" color="secondary" className={classes.appBarButton} component={Link} to={'/'}>
              Apply
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}