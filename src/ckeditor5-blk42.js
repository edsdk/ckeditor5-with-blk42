import {
	ClassicEditor,
	Autoformat,
	BlockQuote,
	Bold,
	Essentials,
	Heading,
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	ImageInsertUI,
	Indent,
	Italic,
	Link,
	List,
	MediaEmbed,
	Paragraph,
	PasteFromOffice,
	PictureEditing,
	Table,
	TableToolbar,
	TextTransformation,
	GeneralHtmlSupport,
	Fullscreen
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';
import Blk42 from "@edsdk/blk42-ckeditor5";

export default class CKEditor5WithBlk42 extends ClassicEditor {

	static create(selector, config) {
		return ClassicEditor.create( selector, {
			licenseKey: 'GPL',
			htmlSupport: {
				allow: [
					{
						name: /.*/,
						attributes: true,
						classes: true,
						styles: true
					}
				]
			},
			plugins: [
				GeneralHtmlSupport,
				Essentials,
				Autoformat,
				Bold,
				Italic,
				BlockQuote,
				Heading,
				Image,
				ImageCaption,
				ImageStyle,
				ImageToolbar,
				ImageUpload,
				ImageInsertUI,
				Indent,
				Link,
				List,
				MediaEmbed,
				Paragraph,
				PasteFromOffice,
				PictureEditing,
				Table,
				TableToolbar,
				TextTransformation,
				Blk42,
				Fullscreen
			],
			toolbar: {
				items: [
					'heading',
					'|',
					'bold',
					'italic',
					'link',
					'bulletedList',
					'numberedList',
					'|',
					'outdent',
					'indent',
					'|',
					'uploadImage',
					'blockQuote',
					'insertTable',
					'mediaEmbed',
					'undo',
					'redo',
					'|',
					'fullscreen'
				]
			},
			image: {
				toolbar: [
					'imageStyle:inline',
					'imageStyle:block',
					'imageStyle:side',
					'|',
					'toggleImageCaption',
					'imageTextAlternative'
				]
			},
			table: {
				contentToolbar: [
					'tableColumn',
					'tableRow',
					'mergeTableCells'
				]
			},
			// This value must be kept in sync with the language defined in webpack.config.js.
			language: 'en',
			...config
		} )
	}

}

window.CKEditor5WithBlk42 = CKEditor5WithBlk42;
