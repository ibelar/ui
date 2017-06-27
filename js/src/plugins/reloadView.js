import $ from 'jquery';

export default class reloadView {
    constructor(element, options) {
        const $element = $(element);

        $element.spinner({
            'loaderText': '',
            'active': true,
            'inline': true,
            'centered': true,
            'replace': true});

        if(options.uri) {
            $.get(options.uri, options.uri_options, (data) => {
                //$element.replaceWith(data);
                const jData = $('<div/>').append(data);
                $element.replaceWith(jData.find('#'+$element.attr('id'))[0].outerHTML);
                jData.find('script').each(function(i,el){
                    eval(el.innerHTML);
                });
            });
        }
    }
}

reloadView.DEFAULTS = {
    uri: null,
    uri_options: {},
};
