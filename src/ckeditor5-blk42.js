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
import N1ED from "@edsdk/n1ed-ckeditor5";

// The whole N1ED plugin, set up for Blk42: the blocks come on with a Blk42 key, and whatever else your
// key gets later in the Dashboard (the file manager and the image editor come with N1ED) comes on in this
// same build, buttons included. Until our cloud says what the key runs, the editor starts as a Blk42 one.
const DEMO_API_KEY = 'BL42B5RRdemodemodemodemo';
const EXPECTED_PLUGINS = [ 'Blk42' ];

// The three buttons of Flmngr: upload, browse the files, edit the image (hidden while your key has no file manager)
const FLMNGR_ITEMS = [ '|', 'upload', 'flmngr', 'imgpen' ];
// and on the main toolbar its stock photos (Photos42)
const STOCK_ITEMS = [ 'photos42' ];
// In the image toolbar they come with no separator, so a key without the file manager leaves no gap
const FLMNGR_IMAGE_ITEMS = [ 'upload', 'flmngr', 'imgpen' ];

export default class CKEditor5WithBlk42 extends ClassicEditor {

	static create(selector, config = {}) {

		// One API key, whichever name it is set under; the demo key without one
		const keyOf = name => !!config[name] && config[name].apiKey;
		const apiKey = config.apiKey || keyOf('N1ED') || keyOf('Blk42') || keyOf('Flmngr') || keyOf('flmngr') || keyOf('Image42') ||
			DEMO_API_KEY;

		// N1ED is one plugin here, its parts are not plugins of their own to remove: removePlugins: ['Flmngr']
		// switches the file manager off (and takes its buttons off the toolbars), ['Blk42'] the blocks,
		// and both (or 'N1ED') leave the editor without N1ED at all
		const removePlugins = config.removePlugins || [];
		const noN1ED = removePlugins.indexOf('N1ED') !== -1;
		const noFlmngr = noN1ED || removePlugins.indexOf('Flmngr') !== -1;
		const noBlk42 = noN1ED || removePlugins.indexOf('Blk42') !== -1;
		const withN1ED = !(noFlmngr && noBlk42);
		const flmngrItems = noFlmngr ? [] : FLMNGR_ITEMS;
		const stockItems = noFlmngr ? [] : STOCK_ITEMS;
		const n1ed = Object.assign({ expectedPlugins: EXPECTED_PLUGINS }, config.N1ED || {});
		if (withN1ED && (noFlmngr || noBlk42))
			n1ed.plugins = Object.assign({}, n1ed.plugins || {}, noFlmngr ? { Flmngr: false } : {}, noBlk42 ? { Blk42: false } : {});
		const ours = ['N1ED', 'N1EDCore', 'Blk42', 'Flmngr'];

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
				...( withN1ED ? [ N1ED ] : [] ),
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
					...flmngrItems,
					...stockItems,
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
					'imageTextAlternative',
					...( noFlmngr ? [] : FLMNGR_IMAGE_ITEMS )
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
			...config,
			removePlugins: removePlugins.filter( name => ours.indexOf( name ) === -1 ),
			N1ED: n1ed,
			apiKey: apiKey
		} )
	}

}

window.CKEditor5WithBlk42 = CKEditor5WithBlk42;
