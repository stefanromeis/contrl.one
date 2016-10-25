'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var _typeof;

  return {
    setters: [],
    execute: function () {
      _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };

      (function (root, factory) {
        if (typeof define === 'function' && define.amd) {
          define([], factory);
        } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
          module.exports = factory();
        } else {
          factory();
        }
      })(undefined, function () {
        var domNode = '';
        var maxTweets = 20;
        var parseLinks = true;
        var queue = [];
        var inProgress = false;
        var printTime = true;
        var printUser = true;
        var formatterFunction = null;
        var supportsClassName = true;
        var showRts = true;
        var customCallbackFunction = null;
        var showInteractionLinks = true;
        var showImages = false;
        var targetBlank = true;
        var lang = 'en';
        var permalinks = true;
        var dataOnly = false;
        var script = null;
        var scriptAdded = false;

        function handleTweets(tweets) {
          if (customCallbackFunction === null) {
            var x = tweets.length;
            var n = 0;
            var element = document.getElementById(domNode);
            var html = '<ul>';
            while (n < x) {
              html += '<li>' + tweets[n] + '</li>';
              n++;
            }
            html += '</ul>';
            element.innerHTML = html;
          } else {
            customCallbackFunction(tweets);
          }
        }

        function strip(data) {
          return data.replace(/<b[^>]*>(.*?)<\/b>/gi, function (a, s) {
            return s;
          }).replace(/class="(?!(tco-hidden|tco-display|tco-ellipsis))+.*?"|data-query-source=".*?"|dir=".*?"|rel=".*?"/gi, '');
        }

        function targetLinksToNewWindow(el) {
          var links = el.getElementsByTagName('a');
          for (var i = links.length - 1; i >= 0; i--) {
            links[i].setAttribute('target', '_blank');
          }
        }

        function getElementsByClassName(node, classname) {
          var a = [];
          var regex = new RegExp('(^| )' + classname + '( |$)');
          var elems = node.getElementsByTagName('*');
          for (var i = 0, j = elems.length; i < j; i++) {
            if (regex.test(elems[i].className)) {
              a.push(elems[i]);
            }
          }
          return a;
        }

        function extractImageUrl(image_data) {
          if (image_data !== undefined && image_data.innerHTML.indexOf('data-srcset') >= 0) {
            var data_src = image_data.innerHTML.match(/data-srcset="([A-z0-9%_\.-]+)/i)[0];
            return decodeURIComponent(data_src).split('"')[1];
          }
        }

        var twitterFetcher = {
          fetch: function fetch(config) {
            if (config.maxTweets === undefined) {
              config.maxTweets = 20;
            }
            if (config.enableLinks === undefined) {
              config.enableLinks = true;
            }
            if (config.showUser === undefined) {
              config.showUser = true;
            }
            if (config.showTime === undefined) {
              config.showTime = true;
            }
            if (config.dateFunction === undefined) {
              config.dateFunction = 'default';
            }
            if (config.showRetweet === undefined) {
              config.showRetweet = true;
            }
            if (config.customCallback === undefined) {
              config.customCallback = null;
            }
            if (config.showInteraction === undefined) {
              config.showInteraction = true;
            }
            if (config.showImages === undefined) {
              config.showImages = false;
            }
            if (config.linksInNewWindow === undefined) {
              config.linksInNewWindow = true;
            }
            if (config.showPermalinks === undefined) {
              config.showPermalinks = true;
            }
            if (config.dataOnly === undefined) {
              config.dataOnly = false;
            }

            if (inProgress) {
              queue.push(config);
            } else {
              inProgress = true;

              domNode = config.domId;
              maxTweets = config.maxTweets;
              parseLinks = config.enableLinks;
              printUser = config.showUser;
              printTime = config.showTime;
              showRts = config.showRetweet;
              formatterFunction = config.dateFunction;
              customCallbackFunction = config.customCallback;
              showInteractionLinks = config.showInteraction;
              showImages = config.showImages;
              targetBlank = config.linksInNewWindow;
              permalinks = config.showPermalinks;
              dataOnly = config.dataOnly;

              var head = document.getElementsByTagName('head')[0];
              if (script !== null) {
                head.removeChild(script);
              }
              script = document.createElement('script');
              script.type = 'text/javascript';
              if (config.list !== undefined) {
                script.src = 'https://syndication.twitter.com/timeline/list?' + 'callback=twitterFetcher.callback&dnt=false&list_slug=' + config.list.listSlug + '&screen_name=' + config.list.screenName + '&suppress_response_codes=true&lang=' + (config.lang || lang) + '&rnd=' + Math.random();
              } else if (config.profile !== undefined) {
                script.src = 'https://syndication.twitter.com/timeline/profile?' + 'callback=twitterFetcher.callback&dnt=false' + '&screen_name=' + config.profile.screenName + '&suppress_response_codes=true&lang=' + (config.lang || lang) + '&rnd=' + Math.random();
              } else if (config.likes !== undefined) {
                script.src = 'https://syndication.twitter.com/timeline/likes?' + 'callback=twitterFetcher.callback&dnt=false' + '&screen_name=' + config.likes.screenName + '&suppress_response_codes=true&lang=' + (config.lang || lang) + '&rnd=' + Math.random();
              } else {
                script.src = 'https://cdn.syndication.twimg.com/widgets/timelines/' + config.id + '?&lang=' + (config.lang || lang) + '&callback=twitterFetcher.callback&' + 'suppress_response_codes=true&rnd=' + Math.random();
              }
              head.appendChild(script);
            }
          },
          callback: function callback(data) {
            data.body = data.body.replace(/(<img[^c]*class="Emoji[^>]*>)|(<img[^c]*class="u-block[^>]*>)/g, '');

            if (!showImages) {
              data.body = data.body.replace(/(<img[^c]*class="NaturalImage-image[^>]*>|(<img[^c]*class="CroppedImage-image[^>]*>))/g, '');
            }

            if (!printUser) {
              data.body = data.body.replace(/(<img[^c]*class="Avatar"[^>]*>)/g, '');
            }

            var div = document.createElement('div');
            div.innerHTML = data.body;
            if (typeof div.getElementsByClassName === 'undefined') {
              supportsClassName = false;
            }

            function swapDataSrc(element) {
              var avatarImg = element.getElementsByTagName('img')[0];
              avatarImg.src = avatarImg.getAttribute('data-src-2x');
              return element;
            }

            var tweets = [];
            var authors = [];
            var times = [];
            var images = [];
            var rts = [];
            var tids = [];
            var permalinksURL = [];
            var x = 0;

            if (supportsClassName) {
              var tmp = div.getElementsByClassName('timeline-Tweet');
              while (x < tmp.length) {
                if (tmp[x].getElementsByClassName('timeline-Tweet-retweetCredit').length > 0) {
                  rts.push(true);
                } else {
                  rts.push(false);
                }
                if (!rts[x] || rts[x] && showRts) {
                  tweets.push(tmp[x].getElementsByClassName('timeline-Tweet-text')[0]);
                  tids.push(tmp[x].getAttribute('data-tweet-id'));
                  if (printUser) {
                    authors.push(swapDataSrc(tmp[x].getElementsByClassName('timeline-Tweet-author')[0]));
                  }
                  times.push(tmp[x].getElementsByClassName('dt-updated')[0]);
                  permalinksURL.push(tmp[x].getElementsByClassName('timeline-Tweet-timestamp')[0]);
                  if (tmp[x].getElementsByClassName('timeline-Tweet-media')[0] !== undefined) {
                    images.push(tmp[x].getElementsByClassName('timeline-Tweet-media')[0]);
                  } else {
                    images.push(undefined);
                  }
                }
                x++;
              }
            } else {
              var tmp = getElementsByClassName(div, 'timeline-Tweet');
              while (x < tmp.length) {
                if (getElementsByClassName(tmp[x], 'timeline-Tweet-retweetCredit').length > 0) {
                  rts.push(true);
                } else {
                  rts.push(false);
                }
                if (!rts[x] || rts[x] && showRts) {
                  tweets.push(getElementsByClassName(tmp[x], 'timeline-Tweet-text')[0]);
                  tids.push(tmp[x].getAttribute('data-tweet-id'));
                  if (printUser) {
                    authors.push(swapDataSrc(getElementsByClassName(tmp[x], 'timeline-Tweet-author')[0]));
                  }
                  times.push(getElementsByClassName(tmp[x], 'dt-updated')[0]);
                  permalinksURL.push(getElementsByClassName(tmp[x], 'timeline-Tweet-timestamp')[0]);
                  if (getElementsByClassName(tmp[x], 'timeline-Tweet-media')[0] !== undefined) {
                    images.push(getElementsByClassName(tmp[x], 'timeline-Tweet-media')[0]);
                  } else {
                    images.push(undefined);
                  }
                }
                x++;
              }
            }

            if (tweets.length > maxTweets) {
              tweets.splice(maxTweets, tweets.length - maxTweets);
              authors.splice(maxTweets, authors.length - maxTweets);
              times.splice(maxTweets, times.length - maxTweets);
              rts.splice(maxTweets, rts.length - maxTweets);
              images.splice(maxTweets, images.length - maxTweets);
              permalinksURL.splice(maxTweets, permalinksURL.length - maxTweets);
            }

            var arrayTweets = [];
            var x = tweets.length;
            var n = 0;
            if (dataOnly) {
              while (n < x) {
                arrayTweets.push({
                  tweet: tweets[n].innerHTML,
                  author: authors[n].innerHTML,
                  time: times[n].textContent,
                  image: extractImageUrl(images[n]),
                  rt: rts[n],
                  tid: tids[n],
                  permalinkURL: permalinksURL[n] === undefined ? '' : permalinksURL[n].href
                });
                n++;
              }
            } else {
              while (n < x) {
                if (typeof formatterFunction !== 'string') {
                  var datetimeText = times[n].getAttribute('datetime');
                  var newDate = new Date(times[n].getAttribute('datetime').replace(/-/g, '/').replace('T', ' ').split('+')[0]);
                  var dateString = formatterFunction(newDate, datetimeText);
                  times[n].setAttribute('aria-label', dateString);

                  if (tweets[n].textContent) {
                    if (supportsClassName) {
                      times[n].textContent = dateString;
                    } else {
                      var h = document.createElement('p');
                      var t = document.createTextNode(dateString);
                      h.appendChild(t);
                      h.setAttribute('aria-label', dateString);
                      times[n] = h;
                    }
                  } else {
                    times[n].textContent = dateString;
                  }
                }
                var op = '';
                if (parseLinks) {
                  if (targetBlank) {
                    targetLinksToNewWindow(tweets[n]);
                    if (printUser) {
                      targetLinksToNewWindow(authors[n]);
                    }
                  }
                  if (printUser) {
                    op += '<div class="user">' + strip(authors[n].innerHTML) + '</div>';
                  }
                  op += '<p class="tweet">' + strip(tweets[n].innerHTML) + '</p>';
                  if (printTime) {
                    if (permalinks) {
                      op += '<p class="timePosted"><a href="' + permalinksURL[n] + '">' + times[n].getAttribute('aria-label') + '</a></p>';
                    } else {
                      op += '<p class="timePosted">' + times[n].getAttribute('aria-label') + '</p>';
                    }
                  }
                } else {
                  if (tweets[n].textContent) {
                    if (printUser) {
                      op += '<p class="user">' + authors[n].textContent + '</p>';
                    }
                    op += '<p class="tweet">' + tweets[n].textContent + '</p>';
                    if (printTime) {
                      op += '<p class="timePosted">' + times[n].textContent + '</p>';
                    }
                  } else {
                    if (printUser) {
                      op += '<p class="user">' + authors[n].textContent + '</p>';
                    }
                    op += '<p class="tweet">' + tweets[n].textContent + '</p>';
                    if (printTime) {
                      op += '<p class="timePosted">' + times[n].textContent + '</p>';
                    }
                  }
                }
                if (showInteractionLinks) {
                  op += '<p class="interact"><a href="https://twitter.com/intent/' + 'tweet?in_reply_to=' + tids[n] + '" class="twitter_reply_icon"' + (targetBlank ? ' target="_blank">' : '>') + 'Reply</a><a href="https://twitter.com/intent/retweet?' + 'tweet_id=' + tids[n] + '" class="twitter_retweet_icon"' + (targetBlank ? ' target="_blank">' : '>') + 'Retweet</a>' + '<a href="https://twitter.com/intent/favorite?tweet_id=' + tids[n] + '" class="twitter_fav_icon"' + (targetBlank ? ' target="_blank">' : '>') + 'Favorite</a></p>';
                }
                if (showImages && images[n] !== undefined && extractImageUrl(images[n]) !== undefined) {
                  op += '<div class="media">' + '<img src="' + extractImageUrl(images[n]) + '" alt="Image from tweet" />' + '</div>';
                }
                if (showImages) {
                  arrayTweets.push(op);
                } else if (!showImages && tweets[n].textContent.length) {
                  arrayTweets.push(op);
                }

                n++;
              }
            }

            handleTweets(arrayTweets);
            inProgress = false;

            if (queue.length > 0) {
              twitterFetcher.fetch(queue[0]);
              queue.splice(0, 1);
            }
          }
        };

        window.twitterFetcher = twitterFetcher;
        return twitterFetcher;
      });
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL3R3aXR0ZXJGZXRjaGVyLmpzIl0sIm5hbWVzIjpbInJvb3QiLCJmYWN0b3J5IiwiZGVmaW5lIiwiYW1kIiwiZXhwb3J0cyIsIm1vZHVsZSIsImRvbU5vZGUiLCJtYXhUd2VldHMiLCJwYXJzZUxpbmtzIiwicXVldWUiLCJpblByb2dyZXNzIiwicHJpbnRUaW1lIiwicHJpbnRVc2VyIiwiZm9ybWF0dGVyRnVuY3Rpb24iLCJzdXBwb3J0c0NsYXNzTmFtZSIsInNob3dSdHMiLCJjdXN0b21DYWxsYmFja0Z1bmN0aW9uIiwic2hvd0ludGVyYWN0aW9uTGlua3MiLCJzaG93SW1hZ2VzIiwidGFyZ2V0QmxhbmsiLCJsYW5nIiwicGVybWFsaW5rcyIsImRhdGFPbmx5Iiwic2NyaXB0Iiwic2NyaXB0QWRkZWQiLCJoYW5kbGVUd2VldHMiLCJ0d2VldHMiLCJ4IiwibGVuZ3RoIiwibiIsImVsZW1lbnQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiaHRtbCIsImlubmVySFRNTCIsInN0cmlwIiwiZGF0YSIsInJlcGxhY2UiLCJhIiwicyIsInRhcmdldExpbmtzVG9OZXdXaW5kb3ciLCJlbCIsImxpbmtzIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJpIiwic2V0QXR0cmlidXRlIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsIm5vZGUiLCJjbGFzc25hbWUiLCJyZWdleCIsIlJlZ0V4cCIsImVsZW1zIiwiaiIsInRlc3QiLCJjbGFzc05hbWUiLCJwdXNoIiwiZXh0cmFjdEltYWdlVXJsIiwiaW1hZ2VfZGF0YSIsInVuZGVmaW5lZCIsImluZGV4T2YiLCJkYXRhX3NyYyIsIm1hdGNoIiwiZGVjb2RlVVJJQ29tcG9uZW50Iiwic3BsaXQiLCJ0d2l0dGVyRmV0Y2hlciIsImZldGNoIiwiY29uZmlnIiwiZW5hYmxlTGlua3MiLCJzaG93VXNlciIsInNob3dUaW1lIiwiZGF0ZUZ1bmN0aW9uIiwic2hvd1JldHdlZXQiLCJjdXN0b21DYWxsYmFjayIsInNob3dJbnRlcmFjdGlvbiIsImxpbmtzSW5OZXdXaW5kb3ciLCJzaG93UGVybWFsaW5rcyIsImRvbUlkIiwiaGVhZCIsInJlbW92ZUNoaWxkIiwiY3JlYXRlRWxlbWVudCIsInR5cGUiLCJsaXN0Iiwic3JjIiwibGlzdFNsdWciLCJzY3JlZW5OYW1lIiwiTWF0aCIsInJhbmRvbSIsInByb2ZpbGUiLCJsaWtlcyIsImlkIiwiYXBwZW5kQ2hpbGQiLCJjYWxsYmFjayIsImJvZHkiLCJkaXYiLCJzd2FwRGF0YVNyYyIsImF2YXRhckltZyIsImdldEF0dHJpYnV0ZSIsImF1dGhvcnMiLCJ0aW1lcyIsImltYWdlcyIsInJ0cyIsInRpZHMiLCJwZXJtYWxpbmtzVVJMIiwidG1wIiwic3BsaWNlIiwiYXJyYXlUd2VldHMiLCJ0d2VldCIsImF1dGhvciIsInRpbWUiLCJ0ZXh0Q29udGVudCIsImltYWdlIiwicnQiLCJ0aWQiLCJwZXJtYWxpbmtVUkwiLCJocmVmIiwiZGF0ZXRpbWVUZXh0IiwibmV3RGF0ZSIsIkRhdGUiLCJkYXRlU3RyaW5nIiwiaCIsInQiLCJjcmVhdGVUZXh0Tm9kZSIsIm9wIiwid2luZG93Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBVUMsaUJBQVNBLElBQVQsRUFBZUMsT0FBZixFQUF3QjtBQUN2QixZQUFJLE9BQU9DLE1BQVAsS0FBa0IsVUFBbEIsSUFBZ0NBLE9BQU9DLEdBQTNDLEVBQWdEO0FBRTlDRCxpQkFBTyxFQUFQLEVBQVdELE9BQVg7QUFDRCxTQUhELE1BR08sSUFBSSxRQUFPRyxPQUFQLHlDQUFPQSxPQUFQLE9BQW1CLFFBQXZCLEVBQWlDO0FBSXRDQyxpQkFBT0QsT0FBUCxHQUFpQkgsU0FBakI7QUFDRCxTQUxNLE1BS0E7QUFFTEE7QUFDRDtBQUNGLE9BYkEsYUFhTyxZQUFXO0FBQ2pCLFlBQUlLLFVBQVUsRUFBZDtBQUNBLFlBQUlDLFlBQVksRUFBaEI7QUFDQSxZQUFJQyxhQUFhLElBQWpCO0FBQ0EsWUFBSUMsUUFBUSxFQUFaO0FBQ0EsWUFBSUMsYUFB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ekIsUUFBUXBFLENBQVIsRUFBV2dGLFdBQWhDLEdBQThDLE1BQXBEO0FBQ0Q7QUFDRGEsMEJBQU0sc0JBQXVCaEcsT0FBT0csQ0FBUCxFQUFVZ0YsV0FBakMsR0FBK0MsTUFBckQ7QUFDQSx3QkFBSWxHLFNBQUosRUFBZTtBQUNiK0csNEJBQU0sMkJBQTJCeEIsTUFBTXJFLENBQU4sRUFBU2dGLFdBQXBDLEdBQWtELE1BQXhEO0FBQ0Q7QUFDRjtBQUNGO0FBQ0Qsb0JBQUk1RixvQkFBSixFQUEwQjtBQUN4QnlHLHdCQUFNLDZEQUNGLG9CQURFLEdBQ3FCckIsS0FBS3hFLENBQUwsQ0FEckIsR0FFRiw4QkFGRSxJQUdEVixjQUFjLG1CQUFkLEdBQW9DLEdBSG5DLElBSUYsdURBSkUsR0FLRixXQUxFLEdBS1lrRixLQUFLeEUsQ0FBTCxDQUxaLEdBS3NCLGdDQUx0QixJQU1EVixjQUFjLG1CQUFkLEdBQW9DLEdBTm5DLElBTTBDLGFBTjFDLEdBT0Ysd0RBUEUsR0FRRmtGLEtBQUt4RSxDQUFMLENBUkUsR0FRUSw0QkFSUixJQVNEVixjQUFjLG1CQUFkLEdBQW9DLEdBVG5DLElBUzBDLGtCQVRoRDtBQVVEO0FBQ0Qsb0JBQUlELGNBQWNpRixPQUFPdEUsQ0FBUCxNQUFjNkIsU0FBNUIsSUFBeUNGLGdCQUFnQjJDLE9BQU90RSxDQUFQLENBQWhCLE1BQStCNkIsU0FBNUUsRUFBdUY7QUFDckZnRSx3QkFBTSx3QkFDRixZQURFLEdBQ2FsRSxnQkFBZ0IyQyxPQUFPdEUsQ0FBUCxDQUFoQixDQURiLEdBRUYsNkJBRkUsR0FFOEIsUUFGcEM7QUFHRDtBQUNELG9CQUFJWCxVQUFKLEVBQWdCO0FBQ2R1Riw4QkFBWWxELElBQVosQ0FBaUJtRSxFQUFqQjtBQUNELGlCQUZELE1BRU8sSUFBSSxDQUFDeEcsVUFBRCxJQUFlUSxPQUFPRyxDQUFQLEVBQVVnRixXQUFWLENBQXNCakYsTUFBekMsRUFBaUQ7QUFDdEQ2RSw4QkFBWWxELElBQVosQ0FBaUJtRSxFQUFqQjtBQUNEOztBQUVEN0Y7QUFDRDtBQUNGOztBQUVESix5QkFBYWdGLFdBQWI7QUFDQS9GLHlCQUFhLEtBQWI7O0FBRUEsZ0JBQUlELE1BQU1tQixNQUFOLEdBQWUsQ0FBbkIsRUFBc0I7QUFDcEJvQyw2QkFBZUMsS0FBZixDQUFxQnhELE1BQU0sQ0FBTixDQUFyQjtBQUNBQSxvQkFBTStGLE1BQU4sQ0FBYSxDQUFiLEVBQWUsQ0FBZjtBQUNEO0FBQ0Y7QUE3U2tCLFNBQXJCOztBQWlUQW1CLGVBQU8zRCxjQUFQLEdBQXdCQSxjQUF4QjtBQUNBLGVBQU9BLGNBQVA7QUFDRCxPQXZZQSxDQUFEIiwiZmlsZSI6InNlcnZpY2VzL3R3aXR0ZXJGZXRjaGVyLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
