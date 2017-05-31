define([], function() {
    var config = {
        debug: (''.toLowerCase() === '1'),
        domain: {
            baseDomain: "rfi.fr",
            defaultSubdomain: "www",
            mobileSubdomain: "m",
            tabletSubdomain: "t"
                                            },
                comment: {
                                                isEnable: Boolean(1),
            isWidgetEnable: Boolean(1)
        },
        cookieBar: {
            trans: [
                "Les cookies assurent le bon fonctionnement de nos services.",
                "En utilisant ces derniers, vous acceptez l'utilisation des cookies.",
                "/contenu/mentions-legales",
                "En savoir plus...",
                "Masquer"
            ]
        },
        viafoura: {
            scheme: "https",
            domain: "api.viafoura.com",
            version: "v2",
            client: "www.rfi.fr",
            timeout: 10, // in s
            dataType: "jsonp", // or json in same domain query
            cache: true,
            missing_image_url: "http://www.rfi.fr/bundles/aefhermesrfi/img/vf-missing-image.png?version=20170329165514",
            live_url: "/?query=player-live",
            //counterText: "(*count*) comments availables",
            counterText: "comment_counter_text",
            blocks: {
                renderTopUsers: {
                    parent: "div.members-activity ul",
                    children: "<li/>",
                    limit: 10
                },
                renderMostPopular: {
                    parent: "div.most-popular ul",
                    children: "<li/>",
                    limit: 3,
                    days: 7,
                    show: "top"
                },
                renderMostComments: {
                    parent: "div.most-comments ul",
                    children: "<li/>",
                    limit: 5,
                    days: 0,
                    show: "recent"
                }
            }
        },
        gapi: {
            appKey: "AIzaSyASyBI1nJy2IvPllzZw0ZmZZl8g-kC7v-4"
        },
        bsplayer: {
            pl_player_on: "/bundles/aefhermesrfi/img/player_on.gif?version=20170329165514",
            pl_player_off: "/bundles/aefhermesrfi/img/player_off.png?version=20170329165514",
            pl_player_spinner: "/bundles/aefhermesrfi/img/player_spinner.gif?version=20170329165514",
            expand_player_text: "Afficher le lecteur",
            reduce_player_text: "Replier le lecteur"
        },
        disqus: {
            disqus_shortname: "rfi"
        },
        facebook: {
            appId: "113191652055439",
            status: true,
            xfbml: true,
            cookie: true,
            locale: "fr_FR",
            version: 'v2.8',
            file: 'sdk.js'
        },
        linkedin: {
            locale: "fr_FR"
        },
        googleplus: {
            lang: "fr"
        },
        youtube: {
            channelId: "",
            playlist: "uploads",
            baseUrl: "//youtube.com/watch?v=",
            maxItems: 12, // the bxSlider block
            listMaxItems: 10, // the all videos page
            nodeWidth: 202,
            nodes: {
                more: "a#more-dailymotion",
                slider: ".videos-slider",
                sliderAll: "section#videos"
            }
        },
        dailymotion: {
            scheme: "http",
            domain: "api.dmcdn.net",
            path: "all.js",
            user: "",
            maxItems: 12, // the bxSlider block
            listMaxItems: 10, // the all videos page
            nodeWidth: 202,
            nodes: {
                more: "a#more-dailymotion",
                pagination : "#more-dailymotion a.paginationItem",
                slider: ".videos-slider",
                sliderAll: "section#videos"
            }
        },
        datePicker: {
            clearText: "Effacer",
            clearStatus: "",
            closeText: "Fermer",
            closeStatus: "Fermer sans modifier",
            prevText: "<Préc",
            prevStatus: "Voir le mois précédent",
            nextText: "Suiv&gt;",
            nextStatus: "Voir le mois suivant",
            currentText: "Courant",
            currentStatus: "Voir le mois courant",
            monthNames: ["Janvier","Février","Mars",
                         "Avril","Mai","Juin",
                         "Juillet","Août","Septembre",
                         "Octobre","Novembre",
                         "Décembre"],
            monthNamesShort: ["Jan","Fév",
                              "Mar","Avr",
                              "Mai","Jun",
                              "Jul","Aoû",
                              "Sep","Oct",
                              "Nov","Déc"],
            monthStatus: "Voir un autre mois",
            yearStatus: "Voir un autre année",
            weekHeader: "Sm",
            weekStatus: "",
            dayNames: ["Dimanche","Lundi","Mardi",
                       "Mercredi","Jeudi","Vendredi",
                       "Samedi"],
            dayNamesShort: ["Di","Lun",
                            "Ma","Me",
                            "Je","Ve",
                            "Sa"],
            dayNamesMin: ["Di","Lu",
                          "Ma","Me",
                          "Je","Ve",
                          "Sa"],
            dayStatus: "Utiliser DD comme premier jour de la semaine",
            dateStatus: "Choisir le DD, MM d",
            dateFormat: "dd/mm/yy",
            firstDay: 1,
            initStatus: "Choisir la date",
            isRTL: false
        },
        sharing: {
          base_url: "rfi.fr"
        },
                //Symfony 2 urls for ajax
        routes: {
            ticker: {
                latest_infos: "http://www.rfi.fr/ticker/latest-infos/--specialEventBoolean--/--specialEventTid--",
                                latest_infos_push: null
            },
            programList: {
                current_program_infos : "http://www.rfi.fr/programlist/current-program-infos",
                current_program_infos_push : "http://www.rfi.fr/programlist/current-program-infos-push",
                                                            },
            programGrid: {
                grid_update : "http://www.rfi.fr/update-program-grid-info/--programChannel--/",
                grid_info : "http://www.rfi.fr/program-grid-info/--defaultDateSlot--/--defaultTimeSlot--/--programChannel--/",
                grid_current : "http://www.rfi.fr/current-program-grid-info/--programChannel--/"
            },
            pagination: {
                url: "http://www.rfi.fr/pagination/"
            },
            broadcastCalendar: {
                url: "http://www.rfi.fr/broadcast-calendar/"
            }

        },
        ticker: {
            slider_interval: 5000,
            poll_interval: 30000
        },
        programGrid: {
            enable: Boolean(1),
            //program_grid_poll_interval is in second
            //poll_interval is in millisecond
            defaultPlayingChannel: 'monde',
            poll_interval_second: 300
        },
        autopromo: {
            slider_interval: 5000
        },
        programList: {
            /**
             * Todo this parameter is defined in "currentProgramInfosPushAction" and
             * "nextProgramInfosPushAction" method of ProgramListController
             */
            poll_interval: 30000
        },
        modal: {
            overlayOpacity: 0.0,
            readingDirection: "ltr"
        },
        lightbox2: {
            rtl: "0",
            file_path: "/(\\w\\w/)sites/filesrfi", /* Might be useless */
            default_image: "/sites/all/modules/contrib-modif/lightbox2/images/brokenimage.jpg",
            border_size: 10,
            font_color: "000",
            box_color: "fff",
            top_position: "",
            overlay_opacity: 0.8,
            overlay_color: "000",
            disable_close_click: true,
            resize_sequence: 0,
            resize_speed: 400,
            fade_in_speed: 400,
            slide_down_speed: 600,
            use_alt_layout: true,
            disable_resize: false,
            disable_zoom: false,
            force_show_nav: false,
            loop_items: false,
            node_link_text: "View Image Details",
            node_link_target: false,
            image_count: "",
            video_count: "Video !current of !total",
            page_count: "Page !current of !total",
            lite_press_x_close: "Appuyer sur <a href=\"#\" onclick=\"hideLightbox(); return FALSE;\"><kbd>x</kbd></a> pour fermer",
            download_link_text: "",
            enable_login: false,
            enable_contact: false,
            keys_close: "c x 27",
            keys_previous: "p 37",
            keys_next: "n 39",
            keys_zoom: "z",
            keys_play_pause: "32",
            display_image_size: "",
            image_node_sizes: "()",
            trigger_lightbox_classes: "",
            trigger_lightbox_group_classes: "",
            trigger_slideshow_classes: "",
            trigger_lightframe_classes: "",
            trigger_lightframe_group_classes: "",
            custom_class_handler: 0,
            custom_trigger_classes: "",
            disable_for_gallery_lists: true,
            disable_for_acidfree_gallery_lists: true,
            enable_acidfree_videos: true,
            slideshow_interval: 5000,
            slideshow_automatic_start: true,
            slideshow_automatic_exit: true,
            show_play_pause: true,
            pause_on_next_click: false,
            pause_on_previous_click: true,
            loop_slides: false,
            iframe_width: 600,
            iframe_height: 400,
            iframe_border: 1,
            enable_video: false
        },
        tools: {
            getMoreArticleWebservice:"http://www.rfi.fr/getproductswithsectionmobile",
            getMoreArticleWebserviceTag:"http://www.rfi.fr/getproductswithsectionmobiletag"
        }

        
                , opta: {
    params: {
        custID:		"cf538360872c5d21bf72c4ed55703e67",
        timezone:	1,
        language:	"fr",
        callbacks:	["opta_bespokeClientFunction"]
    }
}
, infographie: {
    getInfographicsRoute:"http://www.rfi.fr/webdocumentaires/"
}
    };
    return config;
});
