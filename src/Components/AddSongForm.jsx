import React, {Component} from "react";
import PropTypes from "prop-types";

/***** ADDSONGFORM component *****/
export default class AddSongForm extends Component {
    constructor(props) {
      super(props);
      this.onTitleChange = this.onTitleChange.bind(this);
      this.onArtistChange = this.onArtistChange.bind(this);
      this.onUrlChange = this.onUrlChange.bind(this);
      this.addButton = this.addButton.bind(this);
    }
  
    state = {
          songTitleValue: "",
          artistValue: "",
          urlValue: "",
          }
  
  
  
    onTitleChange(e) {
      this.setState({songTitleValue: e.target.value});
    }
  
    onArtistChange(e) {
      this.setState({artistValue: e.target.value});
    }
  
    onUrlChange(e) {
      this.setState({urlValue: e.target.value});
    }
  
    addButton(e) {
      e.preventDefault();
      this.props.onSongSubmit(this.state.songTitleValue, this.state.artistValue, this.state.urlValue);
      this.setState({songTitleValue: "",
                     artistValue: "",
                     urlValue: "",
                   })
    }
  
    render() {
      return (
        <div className="menu" style={this.props.menuStyle}>
          <h3>Add a song</h3>
          <form  onSubmit={this.addButton}>
            <table>
              <tbody>
                  <tr>
                    <td>
                      <label htmlFor="title">Song title: </label>
                    </td>
                    <td>
                      <input type="text" id="title" value={this.state.songTitleValue} onChange={this.onTitleChange} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="artist">Artist: </label>
                    </td>
                    <td>
                      <input type="text" id="artist" value={this.state.artistValue} onChange={this.onArtistChange} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="url">URL: </label>
                    </td>
                    <td>
                      <input type="text" id="url" value={this.state.urlValue} onChange={this.onUrlChange} />
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      <input className="addSongButton" type="submit" value="Add song" />
                    </td>
                  </tr>
              </tbody>
            </table>
        </form>
        </div>
      );
    }
  }
  
  AddSongForm.propTypes = {
    menuStyle: PropTypes.object.isRequired,
    onSongSubmit: PropTypes.func.isRequired,
  };