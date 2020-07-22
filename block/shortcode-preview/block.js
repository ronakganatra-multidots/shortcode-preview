(function(wpI18n, wpBlocks, wpElement, wpEditor, wpComponents, wpBlockEditor) {
  const { __ } = wpI18n;
  const { Component, Fragment } = wpElement;
  const { registerBlockType } = wpBlocks;
  const { InspectorControls, PlainText, RichText } = wpBlockEditor;
  const {
    PanelBody,
    TextControl,
    Icon
  } = wpComponents;
  const { serverSideRender: ServerSideRender } = wp;

  class shortcodePreview extends Component {

    render() {
      
      const { attributes, setAttributes } = this.props;
      const {
        shortcodeText
      } = attributes;

      return (
        <Fragment>
            <div className="wp-block-shortcode components-placeholder swp-rnk-main">
            <label
              className="components-placeholder__label"
            >
                <Icon icon="shortcode" />
				{ __( 'Shortcode' ) }
			</label>
			<PlainText
                className="blocks-shortcode__textarea swp-rnk-shortcode-input"
				value={ shortcodeText }
				placeholder={ __( 'Write shortcode here…' ) }
				onChange={value => {
                    setAttributes({
                      shortcodeText: value
                    });
                  }}
			/>
		</div>
          <InspectorControls key="Shortcode Preview">
            <PanelBody
              title="Shortcode"
              initialOpen="true"
            >
              <div className="main-details swp-rnk-inspector">
                <RichText
                        tagName="p"
                        className="blocks-shortcode__textarea swp-rnk-shortcode-input-inspector"
                        value={ shortcodeText }
                        placeholder={ __( 'shortcode' ) }
                        onChange={value => {
                            setAttributes({
                            shortcodeText: value
                            });
                        }}
                    />
                </div>
            </PanelBody>
          </InspectorControls>
        
          <div className="swp-rnk-preview">
            <ServerSideRender
              block="shortcode-preview/shortcode-preview"
              attributes={{
                shortcodeText: shortcodeText,
              }}
            />
          </div>
        </Fragment>
      );
    }
  }

  const blockAttrs = {
    shortcodeText: {
      type: 'string'
    },
  };

  registerBlockType('shortcode-preview/shortcode-preview', {
    title: __('Shortcode with Preview'),
    icon: 'shortcode',
    keywords: [ "shortcode", "render", "preview" ],
    category: 'widgets',
    attributes: blockAttrs,
    edit: shortcodePreview,
    save() {
      return null;
    }
  });
})(wp.i18n, wp.blocks, wp.element, wp.editor, wp.components, wp.blockEditor);
