import React from "react";
import './App.css';
import {logout, request} from "./util/APIUtils";
import {AppBar, Button, Container, Grid, Toolbar, Typography} from "@material-ui/core";
import LoadingPage from "./components/etc/LoadingPage";
import Board from "./components/boards/Board";
import {NavLink} from "react-router-dom";
import icon from "./img/icon.png";
import {BiCurrentLocation,BiPencil,BiMap,BiMessageRounded} from "react-icons/bi";
import FooterMain from "./components/FooterMain";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            loading: true,
            addressName: "",
            currentUser: {},
        }
    }

    // main page => 현재 위치 기준으로 모든 게시글 조회
    componentDidMount() {

        const process = async () => {
            const boardListResponse = await request("/boards", "GET", null);
            const boardListJson = await boardListResponse.json();

            const currentUserResponse = await request("/user/me", "GET", null);
            const currentUserJson = await currentUserResponse.json();

            this.setState({
                items: boardListJson.data.sort(function (item1, item2) {
                    return item2.id - item1.id;
                }),
                loading: false,
                currentUser: currentUserJson.data,
            })
        }
        process()
            .catch((response) => {
            response.json().then((json) => {
                if (json.error.code === "U002") window.location.href = "/update/user/info"
                else if (json.error.code === "U003") window.location.href = "/location"
                else if (json.error.status === 401) window.location.href = "/login"
            })
        })
            .catch(console.log);
    }

    render() {
        let boards = this.state.items.length > 0 && (
                this.state.items.map((item, idx) => (
                    <Board
                        item={item}
                        key={item.id}
                    />
                ))
        );

        let navigationBar = (
            <AppBar position="static" style={{
                background: "#EDFBF7"
            }}>
                <Toolbar>
                    <Grid justifyContent="space-between" container>
                        <Grid item>
                            <img width="20%" src={icon} align='left' style={{marginTop:3}} />
                            <Typography variant="body1" style={{
                                color: "black",
                                marginTop:'1%',
                                marginLeft:'300px',
                                fontFamily: 'GongGothicMedium',
                                fontSize:19
                            }}> <BiCurrentLocation style={{marginRight:'1%'}}/>
                                {this.state.items.length > 0 ?
                                    this.state.items[0].location.address_name : "위치를 설정해주시기 바랍니다."}

                            </Typography>
                        </Grid>
                        <div  className="headButton">
                        <Grid >
                            <Button style={{fontFamily: 'IM_Hyemin-Bold', fontSize: 17}}>
                                <NavLink to={{
                                    pathname: "/upload",
                                }}
                                         style={{
                                             textDecorationLine: 'none',
                                             color: 'black'
                                         }}
                                >
                                    게시글 작성하기 <BiPencil/>
                                </NavLink>
                            </Button>
                            <Button style={{fontFamily: 'IM_Hyemin-Bold', fontSize: 17}}>
                                <NavLink to="/location"
                                         style={{
                                             textDecorationLine: 'none',
                                             color: 'black'
                                         }}
                                >
                                    위치 설정하기 <BiMap/>
                                </NavLink>
                            </Button>
                            <Button style={{fontFamily: 'IM_Hyemin-Bold', fontSize: 17}}>
                                <NavLink to="/chatList"
                                         style={{
                                             textDecorationLine: 'none',
                                             color: '#FF4040'
                                         }}
                                >
                                    채팅 <BiMessageRounded/>
                                </NavLink>
                            </Button>
                        </Grid>
                        </div>

                        <Grid>
                            <Typography variant="overline" style={{
                                color: "black",
                                marginTop:"5px",
                                marginLeft:"15px",
                                fontFamily: 'IM_Hyemin-Bold', fontSize: 17
                            }}>
                                안녕하세요 {this.state.currentUser.nickname} 님!
                            </Typography>
                            <Button color="inherit" onClick={logout} style={{
                                color: "black",
                                fontFamily: 'IM_Hyemin-Bold', fontSize: 17
                            }}>
                                / <a style={{marginLeft:'5px'}}></a>로그아웃
                            </Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        );

        let boardListPage = (
            <div>
                {navigationBar}
                <p/>
                <Container  >
                    <div className="boardList">{boards}</div>
                </Container>
            </div>
        );

        let content = LoadingPage();
        if (!this.state.loading) content = boardListPage;

        return (
            <div className="App">
                {content}
            <FooterMain/>
            </div>
        );
    }
}

export default App;
