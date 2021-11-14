import React from 'react';
import {Box, Typography} from "@material-ui/core";
import icon2 from "../img/icon2.png";
import "../components/FooterMain.css"

const FooterMain = () => {
    return (
    <Box bottom={0} height={220} style={{backgroundColor:"darkgrey"}}>
        <div className="main">
            <div className="main_content" style={{}}>
                <img width="250px" height="70px" src={icon2} align="left" style={{marginTop:'2%', marginRight:'4%'}}/>
                <div className="content2" style={{marginTop:'2%'}}>
                    안정성을 기반한 중고거래 사이트
                    <div className="content1" style={{marginTop:'3%'}}>
                        무엇이든 물어보세요!
                    </div>
                </div>

                <div className="footer_maincontent">
                    <div className="content3" style={{marginTop:'15%'}}>
                        이용약관
                        <div className="content4">
                            개인정보 약관
                        </div>
                        <div className="content5">
                            위치정보 약관
                        </div>
                    </div>
                </div>
        </div>
            <p style={{marginTop:'2%'}}/>
            <div className='mainFooter_copy'> </div>
                <Typography variant="body2" color="textSecondary" align="right" style={{marginTop:'1%', marginRight:'2%'}}>
                    {"CopyRight © "}
                    junseok Shin, seungyeon Seo {new Date().getFullYear()}
                    {"."}
                </Typography>

        </div>
        </Box>
    );
};

export default FooterMain;