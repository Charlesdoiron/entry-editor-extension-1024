import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

import PropTypes from 'prop-types';
import AlloyEditorComponent from './alloyeditor';
import twoParagraphs from './img/two_paragraphs.png';
import { render } from 'react-dom';

import {
  DisplayText,
  Paragraph,
  SectionHeading,
  TextInput,
  Textarea,
  Button,
  FieldGroup,
  RadioButtonField,
  Form,
  Dropdown,
  DropdownList,
  DropdownListItem
} from '@contentful/forma-36-react-components';
import { init, locations } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import '@contentful/forma-36-fcss/dist/styles.css';
import './index.css';

/**
 * To use this demo create a Content Type with the following fields:
 *  title: Short text
 *  body: Long text
 *  hasAbstract: Boolean
 *  abstract: Long text
 *
 *  See https://github.com/contentful/create-contentful-extension/blob/master/docs/examples/entry-editor-content-model.json for details.
 */

export class App extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      title: props.sdk.entry.fields.title.getValue(),
      quote: props.sdk.entry.fields.quote.getValue(),
      quoteForQuoteAndText: props.sdk.entry.fields.quoteForQuoteAndText.getValue(),
      textForQuoteAndText: props.sdk.entry.fields.textForQuoteAndText.getValue(),
      textOneColumn: props.sdk.entry.fields.textOneColumn.getValue(),
      textFirstColumn: props.sdk.entry.fields.textFirstColumn.getValue(),
      textSecondColumn: props.sdk.entry.fields.textSecondColumn.getValue(),
      textThirdColumn: props.sdk.entry.fields.textThirdColumn.getValue(),
      imageForImageAndText: props.sdk.entry.fields.imageForImageAndText.getValue(),
      textForImageAndText: props.sdk.entry.fields.textForImageAndText.getValue(),
      show: ''
    };
  }

  onTitleChangeHandler = event => {
    this.props.sdk.entry.fields.title.setValue(event.target.value);
  };

  onBodyChangeHandler = event => {
    this.setState({ quote: event.target.value });
    this.props.sdk.entry.fields.quote.setValue(event.target.value);
  };
  onQuoteForQuoteAndText = event => {
    this.setState({ quoteForQuoteAndText: event.target.value });
    this.props.sdk.entry.fields.quoteForQuoteAndText.setValue(event.target.value);
  };

  onSelectModule = option => {
    this.setState({ show: option });
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleEditorChange = event => {
    this.setState({ quote: event.target.value });
    this.props.sdk.entry.fields.quote.setValue(event.target.getContent());
  };

  render() {
    return (
      <Form className="f36-margin--l">
        <DisplayText>1024 Plugin Paragraph Selector</DisplayText>
        <Paragraph>Select the Paragraph Module you want to show</Paragraph>

        <TextInput
          testId="field-title"
          onChange={this.onTitleChangeHandler}
          value={this.state.title}
        />
        <SectionHeading>Liste des modules</SectionHeading>
        <p>{this.state.show}</p>
        <Dropdown
          isOpen={this.state.isOpen}
          toggleElement={
            <Button
              size="small"
              buttonType="muted"
              indicateDropdown
              onClick={e => this.setState({ isOpen: !this.state.isOpen })}>
              Liste des Modules
            </Button>
          }>
          <DropdownList>
            <DropdownListItem isTitle>Quote</DropdownListItem>
            <DropdownListItem onClick={e => this.onSelectModule('quote')}>Quote</DropdownListItem>
            <DropdownListItem onClick={e => this.onSelectModule('quote_and_text')}>
              Quote & Text
            </DropdownListItem>
            <DropdownListItem isTitle>Paragraph</DropdownListItem>
            <DropdownListItem onClick={e => this.onSelectModule('one_column')}>
              Text - One column
            </DropdownListItem>
            <DropdownListItem onClick={e => this.onSelectModule('two_column')}>
              Text - Two columns
            </DropdownListItem>
            <DropdownListItem onClick={e => this.onSelectModule('three_column')}>
              Text - Three column
            </DropdownListItem>
            <DropdownListItem isTitle>Image & Text</DropdownListItem>
            <DropdownListItem onClick={e => this.onSelectModule('image_and_text')}>
              Image & Text
            </DropdownListItem>
          </DropdownList>
        </Dropdown>

        {this.state.show === 'quote' && (
          <div>
            <FieldGroup row={false}>
              <SectionHeading>Quote</SectionHeading>
              <Editor
                initialValue={this.state.quote}
                apiKey="doeu6yjrpctwmwa37nr6wujdjwuugp94skyr34bafbxr3ly3"
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                  ],
                  toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help'
                }}
                onChange={this.handleEditorChange}
              />

              {/* <Textarea onChange={this.onBodyChangeHandler} value={this.state.quote} /> */}
            </FieldGroup>
            {/* 
            <AlloyEditorComponent container="editable" onChange={this.onBodyChangeHandler}>
              <TextInput
                testId="field-title"
                onChange={this.onQuoteForQuoteAndText}
                value={this.state.quoteForQuoteAndText}
              />
            </AlloyEditorComponent> */}
          </div>
        )}

        {/* {this.state.show === 'quote_and_text' && (
          <React.Fragment>
            <SectionHeading>Quote & Text</SectionHeading>
            <img src={twoParagraphs} />

            <FieldGroup row={false}>
              <Textarea
                testId="field-quoteForQuoteAndText"
                onChange={this.onBodyChangeHandler}
                value={this.state.quoteForQuoteAndText}
              />
              <Textarea
                testId="field-textForQuoteAndText"
                onChange={this.onBodyChangeHandler}
                value={this.state.textForQuoteAndText}
              />
            </FieldGroup>
          </React.Fragment>
        )} */}
      </Form>
    );
  }
}

init(sdk => {
  if (sdk.location.is(locations.LOCATION_ENTRY_EDITOR)) {
    render(<App sdk={sdk} />, document.getElementById('root'));
  }
});

/**
 * By default, iframe of the extension is fully reloaded on every save of a source file.
 * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
 */
// if (module.hot) {
//   module.hot.accept();
// }
