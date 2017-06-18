import React from 'react';
import styles from './App.less';
import DoublyLinkedList from '../helper/DoublyLinkedList';

const list = new DoublyLinkedList();
list.add({
  title: 'Hooked on a Feeling',
  image: 'http://www.feistees.com/wp-content/uploads/2014/08/wsmvl.jpg',
  audio_url: '/music/Hooked On A Feeling.mp3'
});
list.add({
  title: 'The Joker and the thief',
  image: 'https://upload.wikimedia.org/wikipedia/en/9/91/Wolfmother_-_%22Joker_and_the_Thief%22.png',
  audio_url: '/music/Joker and the Thief.mp3'
});
list.add({
  title: 'Twenty one Pilots - Heathens',
  image: 'https://upload.wikimedia.org/wikipedia/en/e/e0/Twentyonepilotsheathens.jpg',
  audio_url: '/music/Twenty One Pilots - Heathens.mp3'
});
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      currentmusic: list.findElementAt(0),
      musicplaying: false,
      progressBar: 0
		};

    this.togglePlayPause = () => {
      if (!this.state.musicplaying) {
        this.audio.play();
      } else {
        this.audio.pause();
      }
      this.setState({musicplaying: !this.state.musicplaying});
    }
    this.playAnother = (newmusic) => {
      this.audio.pause();
      this.audio.load();
      this.setState({ currentmusic: newmusic, progressBar: 0 });
      if (this.state.musicplaying) {
        this.audio.play();
      }
    }
    this.shuffle = () => {
      this.audio.pause();
      this.audio.load();
      this.setState({
        currentmusic: list.findRandomNode(this.state.currentmusic),
        progressBar: 0
      });
      if (this.state.musicplaying) {
        this.audio.play();
      }
    }
    this.updateProgress = () => {
      let value = 0;
      if (this.audio.currentTime > 0) {
        value = Math.floor((100 / this.audio.duration) * this.audio.currentTime);
      }
      this.setState({progressBar : value});
    }

    this.updateMusicProgress = (e) => {
      const total = this.progressBar.offsetWidth;
      const seek = e.offsetX;
      const time = (seek / total);
      this.audio.currentTime = (this.audio.duration * time) 
    };
	}

  componentDidMount() {
    this.audio.addEventListener('timeupdate', this.updateProgress, false);
    this.progressBar.addEventListener('click', this.updateMusicProgress, false);
  }

	render(){
    const music = this.state.currentmusic;
    return (
      <div className="mplayer">
        <h1>{music.data.title}</h1>
        <div className="mplayer-window">
          <figure>
            <img src={music.data.image} alt={music.data.title} />
            { (list.length > 1) &&
            <button className="mplayer-btn" onClick={this.shuffle}>
              <i className="icon-shuffle"></i>
            </button>
            }
          </figure>
          <audio ref={(ele) => { this.audio = ele; }}>
            <source src={music.data.audio_url} type="audio/mpeg" />
          </audio>
          <div ref={(ele) => { this.progressBar = ele; }} className="mplayer-progressbar"><span className="mplayer-progress" style={{width: `${this.state.progressBar}%`}}></span></div>
          <div className="mplayer-actions">
            <button className={`mplayer-btn --prev${music.previous === null ? ' hidden' : ''}`} onClick={() => { this.playAnother(music.previous)}}>
              <i className="icon-prev"></i>
            </button>
            <button className="mplayer-btn --play" onClick={this.togglePlayPause}>
              { this.state.musicplaying ?
              <i className="icon-pause"></i>
              :
              <i className="icon-play"></i>
              }
            </button>
            <button className={`mplayer-btn --next${music.next === null ? ' hidden' : ''}`} onClick={() => { this.playAnother(music.next)}}>
              <i className="icon-next"></i>
            </button>
          </div>
        </div>
      </div>
    )
	}
}

export default App;