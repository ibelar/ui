import $ from 'jquery';

import registerPlugin from './plugin';

// Import our plugins
import spinner from 'plugins/spinner';
import reloadView from 'plugins/reloadView';
import ajaxec from 'plugins/ajaxec';
import addParams from 'plugins/addParams';
import bindFormKeydown from 'plugins/bindFormKeydown';

// Register our plugins
registerPlugin('spinner', spinner);
registerPlugin('reloadView', reloadView);
registerPlugin('ajaxec', ajaxec);
registerPlugin('addParams', addParams);
registerPlugin('bindFormKeydown', bindFormKeydown);

$.addParams = function ( url, data )
{
    if ( ! $.isEmptyObject(data) )
    {
        url += ( url.indexOf('?') >= 0 ? '&' : '?' ) + $.param(data);
    }

    return url;
}
