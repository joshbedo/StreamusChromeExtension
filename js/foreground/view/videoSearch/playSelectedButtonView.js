define([
    'text!../template/playSelectedButton.htm',
    'videoSearchResults',
    'streamItems'
], function (PlaySelectedButtonTemplate, VideoSearchResults, StreamItems) {
    'use strict';

    var PlaySelectedButtonView = Backbone.View.extend({

        tagName: 'button',

        className: 'button-label',
                                
        template: _.template(PlaySelectedButtonTemplate),

        enabledTitle: chrome.i18n.getMessage('playSelected'),
        disabledTitle: chrome.i18n.getMessage('playSelectedDisabled'),
        
        events: {
            'click': 'playSelected'
        },

        render: function () {
            this.$el.html(this.template({
                'chrome.i18n': chrome.i18n
            }));

            var disabled = VideoSearchResults.selected().length === 0;

            this.$el.prop('disabled', disabled);

            if (disabled) {
                this.$el.attr('title', this.disabledTitle);
            } else {
                this.$el.attr('title', this.enabledTitle);
            }

            return this;
        },
        
        initialize: function () {
            this.listenTo(VideoSearchResults, 'change:selected', this.render);
        },
        
        playSelected: function() {
            
            if (VideoSearchResults.selected().length > 0) {
                
                var videoInformation = _.map(VideoSearchResults.selected(), function(videoSearchResult) {
                    return videoSearchResult.get('videoInformation');
                });
                console.log("VideoInformation:", videoInformation);
                StreamItems.addMultipleByVideoInformation(videoInformation, true);

            }

        }
        
    });
    
    return PlaySelectedButtonView;
});