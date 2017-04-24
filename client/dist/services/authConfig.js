'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var configForDevelopment, configForProduction, config;
    return {
        setters: [],
        execute: function () {
            configForDevelopment = {
                providers: {
                    google: {
                        api: {
                            get: 'https://www.googleapis.com/gmail/v1',
                            post: 'https://www.googleapis.com/upload/gmail/v1'
                        },
                        clientId: '746849452307-shhj8dj68odgekedt0v1l9lbmndn0qqu.apps.googleusercontent.com',
                        scopes: ['https://mail.google.com/', "https://www.googleapis.com/auth/calendar.readonly"]
                    },
                    instagram: {
                        api: 'https://api.instagram.com/v1',
                        clientId: '91d4983ff3eb468b917f838029fc1d8e'
                    },
                    facebook: {
                        appId: '672920632846289'
                    },
                    news: {
                        api: 'https://newsapi.org/v1',
                        apiKey: '356bfc9442404652add03b1e0cc1a527'
                    },
                    soundcloud: {
                        clientId: '443f2da68b0ce89934a41dc950c78679',
                        redirectUri: 'http://localhost:9000/dist/callback.html'
                    },
                    spotify: {
                        api: 'https://api.spotify.com/v1',
                        clientId: '3f25006f76cd43a8a52b1452e949b697'
                    },
                    auth0: {
                        clientId: 'bf0m39n56Z4GdBEdpXcgJJZD8927Cgj8',
                        domain: 'contrl.eu.auth0.com'
                    },
                    contrlOne: {
                        api: "http://localhost:3001"
                    }
                }
            };
            configForProduction = {
                providers: {
                    google: {
                        clientId: '239531826023-3ludu3934rmcra3oqscc1gid3l9o497i.apps.googleusercontent.com'
                    },
                    instagram: {
                        clientId: '7561959vdub4x1'
                    },
                    facebook: {
                        clientId: '1653908914832509'
                    }
                }
            };

            if (window.location.hostname === 'localhost') {
                config = configForDevelopment;
            } else {
                config = configForProduction;
            }

            _export('default', config);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2F1dGhDb25maWcuanMiXSwibmFtZXMiOlsiY29uZmlnRm9yRGV2ZWxvcG1lbnQiLCJwcm92aWRlcnMiLCJnb29nbGUiLCJhcGkiLCJnZXQiLCJwb3N0IiwiY2xpZW50SWQiLCJzY29wZXMiLCJpbnN0YWdyYW0iLCJmYWNlYm9vayIsImFwcElkIiwibmV3cyIsImFwaUtleSIsInNvdW5kY2xvdWQiLCJyZWRpcmVjdFVyaSIsInNwb3RpZnkiLCJhdXRoMCIsImRvbWFpbiIsImNvbnRybE9uZSIsImNvbmZpZ0ZvclByb2R1Y3Rpb24iLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhvc3RuYW1lIiwiY29uZmlnIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDSUEsZ0MsR0FBdUI7QUFDdkJDLDJCQUFXO0FBQ1BDLDRCQUFRO0FBQ0pDLDZCQUFLO0FBQ0RDLGlDQUFLLHFDQURKO0FBRURDLGtDQUFNO0FBRkwseUJBREQ7QUFLSkMsa0NBQVUsMEVBTE47QUFNSkMsZ0NBQVEsQ0FBQywwQkFBRCxFQUE2QixtREFBN0I7QUFOSixxQkFERDtBQVNQQywrQkFBVztBQUNQTCw2QkFBSyw4QkFERTtBQUVQRyxrQ0FBVTtBQUZILHFCQVRKO0FBYVBHLDhCQUFVO0FBQ05DLCtCQUFPO0FBREQscUJBYkg7QUFnQlBDLDBCQUFNO0FBQ0ZSLDZCQUFLLHdCQURIO0FBRUZTLGdDQUFRO0FBRk4scUJBaEJDO0FBb0JQQyxnQ0FBWTtBQUNSUCxrQ0FBVSxrQ0FERjtBQUVSUSxxQ0FBYTtBQUZMLHFCQXBCTDtBQXdCUEMsNkJBQVM7QUFDTFosNkJBQUssNEJBREE7QUFFTEcsa0NBQVU7QUFGTCxxQkF4QkY7QUE0QlBVLDJCQUFPO0FBQ0hWLGtDQUFVLGtDQURQO0FBRUhXLGdDQUFRO0FBRkwscUJBNUJBO0FBZ0NQQywrQkFBVztBQUNQZiw2QkFBSztBQURFO0FBaENKO0FBRFksYTtBQXVDdkJnQiwrQixHQUFzQjtBQUN0QmxCLDJCQUFXO0FBQ1BDLDRCQUFRO0FBQ0pJLGtDQUFVO0FBRE4scUJBREQ7QUFJUEUsK0JBQVc7QUFDUEYsa0NBQVU7QUFESCxxQkFKSjtBQU9QRyw4QkFBVTtBQUNOSCxrQ0FBVTtBQURKO0FBUEg7QUFEVyxhOztBQWUxQixnQkFBSWMsT0FBT0MsUUFBUCxDQUFnQkMsUUFBaEIsS0FBNkIsV0FBakMsRUFBOEM7QUFDMUNDLHlCQUFTdkIsb0JBQVQ7QUFDSCxhQUZELE1BR0s7QUFDRHVCLHlCQUFTSixtQkFBVDtBQUNIOzsrQkFFY0ksTSIsImZpbGUiOiJzZXJ2aWNlcy9hdXRoQ29uZmlnLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
