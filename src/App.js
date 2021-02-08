import React, { useRef, useEffect } from 'react'
import ScrollMagic from "scrollmagic"; // Or use scrollmagic-with-ssr to avoid server rendering problems
import { TweenMax, TimelineMax } from "gsap"; // Also works with TweenLite and TimelineLite
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import './App.css'
import { Box, Container, Grid, Typography } from '@material-ui/core'
import lottie from 'lottie-web'
import animData from './data';

import Header from './components/header'


function App() {

  ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);
  const controller = new ScrollMagic.Controller();

  const animRef = useRef();

  useEffect(() => {

    var scrollPercent;
    var accelamount = 0.4;
    var delay = 0;
   
    var bgAnimScene = new ScrollMagic.Scene({
      triggerElement: animRef.current,
      duration: 4200,
      triggerHook: 0,
    })
    // .addIndicators()
    .setPin(animRef.current)
    .addTo(controller);

    var bgAnim = lottie.loadAnimation({
      container: animRef.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      rendererSettings: {
        progressiveLoad: false,
        preserveAspectRatio: 'xMidYMid meet'
      },
      animationData: animData
    });

    bgAnim.addEventListener('DOMLoaded',
    function (e) { 
      console.log('Lottie Loaded');
      TweenMax.to(animRef.current, 0.5, { opacity: 1 });
    });

    bgAnimScene.on('update', e => {
      scrollPercent = 100 * window.scrollY / (window.document.body.offsetHeight - window.innerHeight);
    });

    setInterval(() => {
      delay += (scrollPercent - delay) * accelamount;
      bgAnim.goToAndStop((delay / 100) * 199, true)
    }, 33.3)
  });


  const statsRef = useRef();

  useEffect(() => {
    // gsap.fromTo(statsRef.current, { opacity: 0, yPercent: 3 }, { duration: 0.5, opacity: 1, yPercent: 0 });

    var timeline = new TimelineMax();
    const statsAnim = TweenMax.fromTo(statsRef.current, 2, { opacity: 0, yPercent: 5 }, { opacity: 1, yPercent: 0 });
    const statsAnim2 = TweenMax.to(statsRef.current, 2, { opacity: 0, yPercent: -5 });

    timeline.add(statsAnim).add(statsAnim2, "+=1");


    //Text animation Scene
    const statisticsScene = new ScrollMagic.Scene({
      duration: 800,
      offset: 20,
      triggerElement: statsRef.current,
      triggerHook: 0
    })
      .setTween(timeline)
      .setPin(statsRef.current)
      .addTo(controller);
      
    console.log(statisticsScene);
  });


  return (
    <div className="App">

      <Header/>

      <div ref={animRef} id="animation"></div>
      
      <div className="content">
        <div className="intro h100">
          <Typography variant="h1" id="title">Cornell Rocketry Team</Typography>
        </div>

        <Container ref={statsRef} className="statistics h100">
          <div className="center">
            <Box mb={12}>
              <Typography variant="h2">
                At a Glance
              </Typography>
            </Box>
            <Grid
              container
              direction="row"
              justify="space-between"
            >
              <Grid item xs={3}>
                <Typography variant="h2" className="statsNum">51</Typography>

                <Typography variant="h5">Team Members</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h2" className="statsNum">6</Typography>
                <Typography variant="h5">Subteams</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h2" className="statsNum">12</Typography>
                <Typography variant="h5">Majors</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h2" className="statsNum">17</Typography>
                <Typography variant="h5">Rockets Launched</Typography>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default App;
