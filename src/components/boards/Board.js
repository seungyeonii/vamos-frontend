import React from "react";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    Typography
} from "@material-ui/core";
import {TrendingFlat} from "@material-ui/icons";
import Carousel from "react-material-ui-carousel";
import {ThemeProvider} from "@material-ui/core/styles";
import {unstable_createMuiStrictModeTheme} from '@material-ui/core/styles';

const theme = unstable_createMuiStrictModeTheme();

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props.item,
        };
    }

    render() {
        const board = this.state.item;
        return (
            <Grid container spacing={10} justifyContent="center">
                <Grid item xs={12} sm={12} md={12} key={board.id}>
                    <Card>
                        <ThemeProvider theme={theme}>
                            <Carousel
                                indicatorIconButtonProps={{
                                    style: {
                                        padding: '10px',
                                        color: 'pink',
                                        textAlign: "center",
                                    }

                                }}
                            >
                                {board.photos.length > 0 ?
                                    board.photos.map((image, idx) => {
                                        return (
                                            <img
                                                className="d-block w-100"
                                                key={idx}
                                                src={image.file_download_uri}
                                                alt="First slide"
                                                style={{width: "200px", height: "200px", border: "3px solid pink", borderRadius: "16px"}}
                                            />
                                        );
                                    }) : ""
                                }
                            </Carousel>
                        </ThemeProvider>
                        <CardContent>
                            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                                {board.category_info.category_name[0]}
                            </Typography>
                            <Typography variant="h5" component="h2" gutterBottom>
                                {board.title}
                            </Typography>
                            <Typography variant="body2" component="p">
                                {board.content.substring(0, 150)}
                                {board.content.length > 150 ? <span>...</span> : ""}
                            </Typography>
                        </CardContent>
                        <CardActions style={{justifyContent: "center"}}>
                            <Button size="small" color="secondary">
                                Read More<TrendingFlat/>
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}

export default Board;