import $ from 'jquery';

export default class bindFormKeydown {

    constructor(element, options) {
        const $element = $(element);
        const settings = $.fn.form.settings;

        $element.off('keydown');
        $element.on('keydown', settings.selector.field, settings, function(event) {
            let
                $field       = $(this),
                key          = event.which,
                isInput      = $field.is(settings.selector.input),
                isCheckbox   = $field.is(settings.selector.checkbox),
                isInDropdown = ($field.closest(settings.selector.uiDropdown).length > 0),
                keyCode      = {
                    enter  : 13,
                    escape : 27
                };

            if( key == keyCode.escape) {
                $field
                    .blur()
                ;
            }

            if(!event.ctrlKey && key == keyCode.enter && isInput && !isInDropdown && !isCheckbox) {
                $field.form('submit');
                event.preventDefault();
            }
        });
    }
}
