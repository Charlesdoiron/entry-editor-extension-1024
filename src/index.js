import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

import PropTypes from 'prop-types';
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

const editorOptions = {
  height: 300,
  menubar: true,
  plugins: [
    'advlist autolink lists link image charmap print preview anchor',
    'searchreplace visualblocks code fullscreen',
    'insertdatetime media table paste code help wordcount'
  ],
  toolbar:
    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help'
};

const EDITOR_API = 'doeu6yjrpctwmwa37nr6wujdjwuugp94skyr34bafbxr3ly3';

export class App extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      titleParagraph: props.sdk.entry.fields.titleParagraph.getValue() || '',
      quote: props.sdk.entry.fields.quote.getValue(),
      quoteForQuoteAndText: props.sdk.entry.fields.quoteForQuoteAndText.getValue(),
      textForQuoteAndText: props.sdk.entry.fields.textForQuoteAndText.getValue(),
      textOneColumn: props.sdk.entry.fields.textOneColumn.getValue(),
      textTwoColumns: props.sdk.entry.fields.textTwoColumns.getValue(),
      textThreeColumns: props.sdk.entry.fields.textThreeColumns.getValue(),
      imageForImageAndText: props.sdk.entry.fields.imageForImageAndText.getValue(),
      textForImageAndText: props.sdk.entry.fields.textForImageAndText.getValue(),
      show: ''
    };
  }

  onTitleChangeHandler = event => {
    this.props.sdk.entry.fields.titleParagraph.setValue(event.target.value);
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

  handleEditorChange = (event, module) => {
    console.log('event', event);
    console.log('module', module);
    this.setState({ [module]: event.target.value });
    this.props.sdk.entry.fields[module].setValue(event.target.getContent());
  };

  render() {
    return (
      <Form className="f36-margin--l">
        <DisplayText>1024 Plugin Paragraph Selector</DisplayText>
        <Paragraph>Select the Paragraph Module you want to show</Paragraph>

        <TextInput
          testId="field-title"
          onChange={this.onTitleChangeHandler}
          value={this.state.titleParagraph}
        />
        <SectionHeading>Liste des modules</SectionHeading>

        <Dropdown
          isOpen={this.state.isOpen}
          toggleElement={
            <Button
              size="small"
              buttonType="muted"
              indicateDropdown
              onClick={e => this.setState({ isOpen: !this.state.isOpen })}>
              Selectionner un module
            </Button>
          }>
          <DropdownList>
            <DropdownListItem isTitle>Quote</DropdownListItem>
            <DropdownListItem onClick={e => this.onSelectModule('quote')}>Quote</DropdownListItem>
            <DropdownListItem onClick={e => this.onSelectModule('quote_and_text')}>
              Quote & Text
            </DropdownListItem>
            <DropdownListItem isTitle>Paragraph</DropdownListItem>
            <DropdownListItem onClick={e => this.onSelectModule('textOneColumn')}>
              Text - One column
            </DropdownListItem>
            <DropdownListItem onClick={e => this.onSelectModule('textTwoColumns')}>
              Text - Two columns
            </DropdownListItem>
            <DropdownListItem onClick={e => this.onSelectModule('textThreeColumns')}>
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
                apiKey={EDITOR_API}
                init={editorOptions}
                onChange={e => this.handleEditorChange(e, 'quote')}
              />
            </FieldGroup>
          </div>
        )}
        {this.state.show === 'quote_and_text' && (
          <div>
            <FieldGroup row={false}>
              <SectionHeading>Quote & Text</SectionHeading>
              <Editor
                initialValue={this.state.quoteForQuoteAndText}
                apiKey={EDITOR_API}
                init={editorOptions}
                onChange={e => this.handleEditorChange(e, 'quoteForQuoteAndText')}
              />
              <Editor
                initialValue={this.state.textForQuoteAndText}
                apiKey={EDITOR_API}
                init={editorOptions}
                onChange={e => this.handleEditorChange(e, 'textForQuoteAndText')}
              />
            </FieldGroup>
          </div>
        )}
        {this.state.show === 'textOneColumn' && (
          <div>
            <FieldGroup row={false}>
              <SectionHeading>Text one column</SectionHeading>
              <Editor
                initialValue={this.state.textOneColumn}
                apiKey={EDITOR_API}
                init={editorOptions}
                onChange={e => this.handleEditorChange(e, 'textOneColumn')}
              />
            </FieldGroup>
          </div>
        )}
        {this.state.show === 'textTwoColumns' && (
          <div>
            <SectionHeading>Text two column</SectionHeading>
            <FieldGroup row={true}>
              <Editor
                initialValue={this.state.textOneColumn}
                apiKey={EDITOR_API}
                init={editorOptions}
                onChange={e => this.handleEditorChange(e, 'textOneColumn')}
              />
              <Editor
                initialValue={this.state.textTwoColumns}
                apiKey={EDITOR_API}
                init={editorOptions}
                onChange={e => this.handleEditorChange(e, 'textTwoColumns')}
              />
            </FieldGroup>
          </div>
        )}
        {this.state.show === 'textThreeColumns' && (
          <div>
            <FieldGroup row={false}>
              <SectionHeading>Text two column</SectionHeading>
              <Editor
                initialValue={this.state.textOneColumn}
                apiKey={EDITOR_API}
                init={editorOptions}
                onChange={e => this.handleEditorChange(e, 'textOneColumn')}
              />
              <Editor
                initialValue={this.state.textTwoColumns}
                apiKey={EDITOR_API}
                init={editorOptions}
                onChange={e => this.handleEditorChange(e, 'textTwoColumns')}
              />
              <Editor
                initialValue={this.state.textThreeColumns}
                apiKey={EDITOR_API}
                init={editorOptions}
                onChange={e => this.handleEditorChange(e, 'textThreeColumns')}
              />
            </FieldGroup>
          </div>
        )}
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
