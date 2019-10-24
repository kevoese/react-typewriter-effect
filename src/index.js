import React, { Component, createRef } from 'react';
import { delay, propTypeValidation, contentInView } from './utils';
import './app.css';

class TypeWriterEffect extends Component {
  state = {
    text: '',
    blink: false,
    hideCursor: true,
    animate: false
  };

  myRef = createRef();

  multiTextDisplay = async arr => {
    for (let e = 0; e < arr.length; e++) {
      await this.runAnimation(arr[e], arr.length - e - 1);
    }
  };

  runAnimation = async (str, erase) => {
    const textArr = typeof str == 'string' && str.trim().split('');
    if (textArr) {
      this.setState({
        blink: false
      });
      let text = '';
      for (let char = 0; char < textArr.length; char++) {
        await delay(this.props.typeSpeed || 120);
        text += textArr[char];
        this.setState({
          text
        });
      }
      this.setState({
        blink: true
      });
      this.props.multiText && (await delay(this.props.multiTextDelay || 2000));
      erase > 0 && (await this.eraseText(text));
    }
  };

  eraseText = async str => {
    const textArr = typeof str == 'string' && str.trim().split('');
    this.setState({
      blink: false
    });
    let text = str.trim();
    for (let char = 0; char < textArr.length; char++) {
      await delay(50);
      text = text.slice(0, -1);
      this.setState({
        text
      });
    }
    this.setState({
      blink: true
    });
  };

  animateOnScroll = async () => {
    if (!this.state.animate && contentInView(this.myRef.current)) {
      this.setState({
        animate: true
      });
      this.props.startDelay && (await delay(this.props.startDelay));
      this.setState({
        hideCursor: false
      });

      this.props.multiText
        ? await this.multiTextDisplay(this.props.multiText)
        : await this.runAnimation(this.props.text);

      this.props.hideCursorAfterText &&
        this.setState({
          hideCursor: true
        });
    }
  };

  componentDidMount() {
    this.animateOnScroll();
    document.addEventListener('scroll', this.animateOnScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.animateOnScroll);
  }

  render() {
    return (
      <div ref={this.myRef} className={'react-typewriter-text-wrap'}>
        <h1
          style={{ ...this.props.textStyle }}
          className="react-typewriter-text"
        >
          {this.state.text}
          <div
            className={`react-typewriter-pointer ${this.state.blink &&
              'add-cursor-animate'} ${
              this.state.hideCursor ? 'hide-typing-cursor' : ''
            }`}
            style={{ backgroundColor: `${this.props.cursorColor}` }}
          ></div>
        </h1>
      </div>
    );
  }
}

TypeWriterEffect.propTypes = propTypeValidation;

export default TypeWriterEffect;
