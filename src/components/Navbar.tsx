import React from 'react';
import axios from "axios";
import { BsSpotify } from "react-icons/bs";
import { MdAlbum } from "react-icons/md";
import { BiCodeAlt } from "react-icons/bi";
import { FaFolderOpen } from "react-icons/fa";

import "./style/Navbar.css";

type SPOTIFY_STATUS = {
  image: string;
  song: string;
}

type VSCODE_STATUS = {
  editing: string;
  workspace: string;
  image: string;
}

type DISCORD_INFO = {
  img: string;
  online: "#3ba55d" | "#faa81a" | "#ed4245" | "#747f8d";
  spotify?: SPOTIFY_STATUS,
  vscode?: VSCODE_STATUS
};

class Navbar extends React.Component {
  private API_URL: string = "https://api.lanyard.rest/v1/";
  private USER_ID: string = "447128312192434177";
  private DISCORD_CDN: string = "https://cdn.discordapp.com/";
  private borderColors: string[] = [
    "#3ba55d",
    "#faa81a",
    "#ed4245",
    "#747f8d",
  ];

  public state: DISCORD_INFO = {
    img: '',
    online: "#747f8d"
  };

  public componentDidMount() {
    this.loadDiscordStatus();

    setInterval(() => {
      this.loadDiscordStatus();
    }, 10000); // updating status every 10 sec
  }

  public render(): JSX.Element {
    return (
      <>
        <nav className='navbar'>
          <div className='info'>
            <img className='v-image' src={this.state.img}/>
            <div className='status' style={{background: this.state.online}}/>
            {this.state.spotify && (
              <>
                <div className='line'></div>
                <img src={this.state.spotify.image} className='icon'/>
                <div className='appinfo'>
                  <BsSpotify/>
                  <span><MdAlbum/></span>
                </div>
                <div className='appdesc'>
                  <h4>Currently listening to</h4>
                  <p>{this.state.spotify.song}</p>
                </div>
              </>
            )}
            {this.state.vscode && (
              <>
                <div className='line'></div>
                <img src={this.state.vscode.image} className='icon'/>
                <div className='appinfo'>
                  <BiCodeAlt/>
                  <span><FaFolderOpen/></span>
                </div>
                <div className='appdesc'>
                  <h4>{this.state.vscode.editing}</h4>
                  <p>{this.state.vscode.workspace}</p>
                </div>
              </>
            )}
          </div>
        </nav>
      </>
    )
  }

  public loadDiscordStatus(): void {
    axios.get(`${this.API_URL}users/${this.USER_ID}`).then((response) => {

      const apiData = response.data.data;
      const discordUser = apiData.discord_user;
      const activities = apiData.activities;
      
      let status: string;
      let spofityStatus: SPOTIFY_STATUS;
      let vsCodeStauts: VSCODE_STATUS;

      for (const activity of activities) {
        if (activity.name === "Spotify") {
          spofityStatus = {
            image: apiData.spotify.album_art_url,
            song: `${apiData.spotify.artist} - ${apiData.spotify.song}`,
          }
        }

        if (activity.name === "Visual Studio Code") {
          vsCodeStauts = {
            editing: activity.details,
            workspace: activity.state,
            image: `${this.DISCORD_CDN}app-assets/${activity.application_id}/${activity.assets.large_image}.png`
          }
        }
      }

      switch(apiData.discord_status) {
        case "online":
          status = this.borderColors[0];
          break;

        case "idle": 
          status = this.borderColors[1];
          break;

        case "dnd": 
          status = this.borderColors[2];
          break;
        case "offline":
          status = this.borderColors[3];
          break;
      }

      this.setState((state, props) => ({
        img: `${this.DISCORD_CDN}avatars/${discordUser.id}/${discordUser.avatar}.webp?size=80`,
        online: status,
        spotify: spofityStatus,
        vscode: vsCodeStauts,
      }));
    });
  }
}

export default Navbar;
