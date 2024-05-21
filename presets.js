const { combineRgb } = require('@companion-module/base');

const icons = {
    hide: 'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAABCtJREFUSEu1lU2MU1UUgL/Tn1eKOChhDCDRBFwYQSQMCIMurDLTN7Wv7UhSCSaALmRhDHFDdEfcqDujLNQYfxdqEabt68y8ZoZMFMQBMZpoROKCBBNN0KAgzNB2+o68zrzSKU7cwF3dd++55zv/T7jJS3z9+VJ5c3XiwnfZbHbyRjIbgIFiuU9Ei4gej4YD8Xg8fvlGQRqAUql0+5SGvwC9H9GvWiGFUnmnqvYCa4C7UBThjIh8q4pjBOt2IpGozGVQM0S5oaFOox74ErhX4GhlMtKXzcYuFQrlHg1oEZg3h5LzKrx+bsniV3evX19rl2kCvIvBwcElNTd4FFgJHKtORuIe5GBpdEWofvmPdDr9j23bi92AcZ/W3dUE2I7KQzNKfw6oJFKp+JlWyCzAjBfHgHtmhJqQuUIwUHS2ivAmsBQ4HZKp7mQy+Zcvfy1EuVzQiHYcB7qAPHAHsLnVk1wuFzWiHc8gnM4kzVFfSSOHbmgYYaPAcNoyE9cBBmxnr8BrwNfVyYuPQKdhRCvldkih5Dyu2jDgcDXM9qxpnm9U4sDYbRKq/AAsV5Hd/cn4O975dJlOX54F5gc0uCKV6vH25HJjC4xo5XdgQasnzbKGXMYyn/KtLQw6proMA2cXLoisjMViUw1A3naeA/Yr+mG/1bfLfzBgOw8KeGHzVzMnvifi6up0uu90E2I7RxQeBn0iY/UN+IACkALZlrHinzUBpfLzovrGVbffBVkNumk6hJHeRgkPOqZb1yX9qb4PWt48K6pvi/BJOmlu9wGfA1uBnRnL/KhdGHhL3MpelciIl0iQ8eqk0eNBxsbG5sVisSvNN8XhXSLyvgi5dNJ80gc8fbVL3xMopS3T8oUP2c4DAfge+Lsuoa76RPCcEa2OTHsi4+Je6fV6o7WE87ZTArxC2NGfMj9uAGzbnl8n/CuwKKBudyqVGPcf5W3H9+4ScAAIAjum72dDBkrlLlE9CUyEZGq51w/Xpmmx/CKiryj8EqK21rKsiUYlDQ11huvyqSCPtjXbb8CyVkjeLlughwReSFvm/maZept9+/YF1nZt8sZENzAWNcTyp6qqSr400iOqq8Cd0JCO1sLhP43JqVFE1rfmJD9Y3phO9J4QEZ0F8D4OOs7SYE2+Ab3zasLPgOzJWHG7zfLmZ85xFhk1vOZaBpwQt7KlPSezZpH3slh0VqloUZEVM5oOo3pANPhjJeKeuqVeN2puoBslpiLbBDqbRNWT1WhoS7an54J/dh2gEfdcLhqJdryksAfomMuDmfNLgr7s0oCtQ/WkEdLHEonExetC1K7Iqy5XQilXMYXAOtC7gZrAKVR/cgMcqU3My3v9kBsZWRi+Uh8R2OBBfE/+04P/sXjO60KhcKsGIt6A3CCuJNLpuAe8sasxIOdX12SSce+/Mj1Nb+b6F8OG6yjwCFZqAAAAAElFTkSuQmCC',
    image: 'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAVtJREFUSEvl1b9Lw0AUB/Dvq/gDdHJwcOwmbv0DHM0ZvV7c6+a/oNClKAVR/wER5y5dmhCFxKWrQ6GDxT+hLoKLSx3upNDUGK5p82syY/Lufe7de0kIBV9UcH78AWzXGwDYTYIqQuP4iDVnrYkCKknyaayiulU1rnVrtYDF2UJHZ7ve74ZmIPkB4+1rkHwBDZI/ACB8xHOBjutfEVSdgKbgrBE3BJOeKIuzUhA3F7Bd7wvAOoBPi7PNAgD/FlBnQQXtdndjde37TlSNkyiWqgJNkkcAhwSqCW60ws+DsU3Ug3CCjuudE3AzuTdcWZJl0zRHQUwmwHny95RUXQChBtKF4MZlZsBxnrdVSb4CiDZ5RLJUFmJ/OEZSVXDf6y1vvX+8EFDRT5BqWfyglhqwXe8BwGnceJKUFSHMfqoKknxd/xGQ5Fh0sXEv2huAnYxA3+JsOnEL/bmygIUDPxja4BnugbnIAAAAAElFTkSuQmCC',
    next: 'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAVdJREFUSEvdlb9Og1AUh39HjC6+gvoO+gLWRWgkQAcXp6aLrYPxNXTWtcaY6GKKYBU2n8H4DMbUxJjoYv9wDAQSpBQuw41JmcjNx/n4nQvnEiRfJLk+5kTQcx5bPF5wG42dQVHLRDnb9V4ADE1d3YhaZLseA/gg4qaxqzmzJBU5mLpKaUFcl254vNS2rNpnVhQLhLk8wTeAFQBvALdMXXtIS1ICIW5aMKE1KHwJYCsu3KXg58gwjK9UKwFBbkoQLoSFevd+m5hP4jSvDN63dO0pSVCF+7MHyYOh5LbfX1cCpQugFqUhOgdzJ7ytws0UJL2/c70DBk7jNNFyWlDG/Z/Atv1VVoILAm3Hb3kG4DCboIzLTSBtk0U/P1Gu6EcbANwU+NEKudxRQYTrYLTcKRsVIlxWIHHYOf7xcHFytVevvxeNa1uUc/1nBo8sXd2ckxNN5sEvvUW/BIJSKJ+0wtkAAAAASUVORK5CYII=',
    overlay: 'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAA8VJREFUSEu1lV9MW1Ucx7+/c2kZjA0jGIm+GH0xmsw/WzbiHgzG0HJZeylLqsnUaSYqcz4QURRRm7nhpmGaiHPDTafGh9044LZY6LaYaNTgAhu++GJiNDHBBTcTWaQtveen5/ZWC6Wlxnif7r3n9/t9z/n8/hzC//xQufFHR+O3QNP2Ofa23dfWpn9Xju+qAvF4fH3KFnsJeBJAhRs0Q4zBVLLyxXC46UopoZICI9GJB4nwOoBrAUiABrLB+GkAAsBFZjwTCvo/KiayooBljW9gQe8AuMt1PAdbPpLDksUl3gew2V3/GrbsWAnbEgEXx34COgFoAC6D0WMEfMeJiPN3ycwUHUs8ysABAFerzDAwWKnJl3Rd/z1n+7fAcDR+tyDxCYB6Z5FwQqYrutvb771UivHw8Nk68iwOEGina/erZA61B1u+zIZxH1fgFIC6/yhwiQE9FPCfWyKgPizLWgeq3MuEPW7FXCbgueA237EyEGVA/BbZ6ZcNw5gvQJSPIRZL3GyTPAamreUkmUCfC1BHIND8/XKcS5LsYJKYy1WDFUvsYOAgwNcXKdOfAepuC/hOqsDR6MStrFGd0er7ouAE1lhiJzOfcAMNkkz2qaPGYrFqmzy9qpryGi0NwoHatZWvNjU1Jc0zZ2q9C5lXQKSaURDoASPg+3hJDkzT9Hqq1/cQoxfAGgbm1HuuRE+Nnb1R48wQwH/YQj61vbX1p7xS7XerL0ng/amF+dfC4XC6IMnqx8jI+A2owHEC3eMafCuJdoW2+abz+Y5+mthCko8ycJvT2+DPkMGuUKjlx3y7oqPCGhu/n5neANCg/Bn8IS+KZ5WzVoEBJt7hlvksQF25PBRNsoOoal2vAP1yYXpyKBKJSIdtSvaDebfrqDpUDbzqbK/QYa+wn1edG4lExB0bG3dLcP3iwnx/AaLR2MRDAD5wA82QFHsMo/krB1tsYrMAhnI4AMyQEB1Ga/NUtn9Ob4WQb/+zzu1tgZaRghxEo/FGJnEkL9BJ24Ou7X7/rGmamndNbRcRJy9MTx5WJ7Ss09exkIcA3JfbmGDZGQzqk0UbTR319o2Natipy+UqAFdA2Hexof7Q45s2LSrHo1NTnobZuW4GvQBgLYDfwNw3c/6bI0q4rCSb8fg1XlscBPCwQxv8gwQeYxZVgvhNADep5BPRe3Za6yk2FFe90RR/At4FsCF/Zwyc/+vC6cwNteXVU3IWLTd2sN255QkQKWwM5l4j4B9aPgBXEln1BPlOpmlW1dTUSF3XU8V2XHLYlev0b+z+BHQ2mCj5syaJAAAAAElFTkSuQmCC',
    playPause: 'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAapJREFUSEu1lr9LG2EYxz9PLhJSaqXgLtR/IAgOneSW9kguGhBuaqaAe4N2vtCpoJbuRenSIRBSvUsaSjc7uGizOwmFQpeWDIbmx73lqgERL78u96733Ofz8tzzfDkh4iMR8wkUVNyvT4j32puG8TPMJQIFn44bfxA8FK9y68b7aSXBAqehbkFPNGKFbPbZxaSikQIF5wIrQFcJr7tXrTeWZXXGFY0UNM9OtdTK0yKiSsADBRciFHKmcTKOZKQglzX+11RqtSXN0w4BHVAicqDR3TFN8/cw0diCAaTqfn4hSt4Ci8Av4GUua3wMkkws8EGu6z7uqfg7IH8NVl/6MW9rM5O5vCuaSjCAHLkNXSn8ti2BaivE7rZbe5Zl9Qc1oQQ+pFwuJxPJR7aCHUAEvn0/O12zbdvzn89SsA3EgObCw8Sqruu90IK7LUKk1Llq7YZukeM4i33m9iP5yNXjRl4EHz7bMY1s0TrtVjyRnC8qKIEkZx4V/lQAqcjC7mZhIolrP8Q8ESlumM8/jJOc99UELlq1Xl9OwI90Ov13WvjQRQsDvf1u5H8V/wC8z90ZRPNe3QAAAABJRU5ErkJggg==',
    previous: 'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAWJJREFUSEvdlT1OAlEQgL8Bgo02xBjjMfQCNoZV2XWp6BQLK2s8iETjb7SxsUA2kLA0xjPoDfQGQkdwzBJIcNk/YzYmbLPJy5f55s3Me09I+ZOU4zMngmbLfQMGtmmsR5Ws0eiuSJ5KuVSsJ+VGJWq2XPX+tmmElsxpdyxVuQMKv+FiBY+uW8gPOAcqk6yDBGFcpKDZ6uyA3AKrQB9YDNppFBcocBxn6SuTrwtyMM76haHsk9X3aUESbkbw1OpsCvIArAE9gZM907jw9yop90MAXANHXjBFn7OaO7SsrVHW04KknNcrv8CL86kitXKpeOUfxcm0jddjuTBBD9WabW1fxghiuSDBGXA8KZEMM1XbLn4ElCgRNyPwFnzN6wvUEjQ5lAsdU80unKJU48Y0jos8aE7b3VXlHliOOmhR3P9eFdNT9MfLrvuq6KBsGhtx13Amp5ZtGTdJuTl50dJ8+FMv0Te76y4oOdUv3QAAAABJRU5ErkJggg==',
    rewind: 'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAgpJREFUSEu1lDtoFFEUhr87ExYCgqABiZVJYSdYRLAwAQvd2cS7MyHY+Cp8YCuxkRSCiKTRiF3aFD6yoDu7M5PciChqIYogltopKqSIoKIgm50jU7jumuwruzntnPt/Z87jV2xyqHr6haK5ieKdq53ZTmpYF1AIzHWBi4BYYu/KZg993ChkDSCpXBQXgLJScsI9krm3UfHkXQ3ADxanQV1KxEGOejqT70S8BuCH5grC5ZYEhW8o3ihkYdWWuxOjo5/qvav8QVuAWjUBcjal01rrX/+DaltUNNdQTAGxUnK8Uf/vh48GbVmdBM4BKYSXyzv7hs8PDZWqIWuH/G+DYuCkp507jdrmR9EeYnsJ6BeYGddOsn2VWHdN84G5oSCpTspWeWBibOxDI0ghWhqRWJ4CJZvSgNb689/8uofmh4szStT7Vg/ND8xt4JhCplydmW4KaGmbqpIKoTkowmPguaedka4DcsZsS5VYAb562tnefUDuyZZU7+8fwHdPO1u7DigWF/bHynqByGsvm9nXdYAfmDnglIKrrnYqjlB3i9oZsh+aYYRniYdZYg9Wu2/HgHz0cK+KYwPsELg1rp3EiRsfWivVP4ii3Zb0TCJyBugBXi339x1oahV+YBLzaicE1HxvirPpdPpnQ7NLPrYIWBHkrRIrVKLmXffwl6Z23U7J7eR2PORmsE0H/AEiFLwZykt0zwAAAABJRU5ErkJggg==',
    show: 'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAA71JREFUSEvFlVtoHGUUx39ndrNpYtqoWDBeCFoQSbRqUtCgIIstO1lndjYNDVpLUaQXlFJ8VEHii+iTAYVSLYKIliZtsrdsJknDFuyDoEXRaFu8BPVFilZrbcht5+jEnXVzM30J/Z6++c7/O/9z/uecb4Q1XrLG/rm2BIVCYd2fV6ZsT8UUaEG5Yz5jYUJEzqjiRkLFbDwen15JiWUzyOfz1TOe8RIeBxHqV5Hxogo9F26+6fV9W7bMLsYuIUil8k2EjAywqQQ+pSK9go6HdPasf+YZkSYtevdgsBOVh0u4c4ZKPJGITVSSLCBIp0duUcP7BLgd+BHkQNKOZf8vg4GM2ynCW0ADcD4sc22WZf0e3CkTFAqF8KXL06cRHgRO1kQkGYvFrvhAVZVMZmSrF9Lmf0vAeNIyTwZOBgYK10to2vXvCgw5thlfQpDKuK8gvIrwTf111a3RaHTKB/Xm8xsjReMo8NjCTHRkpkqe7DLNi/55Lpe7YU7DXwK3qci+Div2TikY6B0drY9MFX8G1ovntThO/PNydDk3JYoDTCraJ4ifdRewDvTDpN2+K8CmB11TPYaAn+rrqjdFo9G5eYlSWfd54G3gWNI2n/jP+XCrqH6GcqlohFs6ra0/+Lb+wcG7DC/kB1Ernt7tOO3nyyRZ92OFR0S007Ha+wOCNJAAnkra5kcV4P0KhwQOObb5XKVE6dzwEVV9FmVPMmEeqQhqr6geFuGoY5k75wkGMu4JEbaLyNOOFXt/MRiRw0krtr+SIJV1fY33COx1bPPdwJbKus8A74EeT9rtO4IM5g8Fco5t2gG4P+veZ8AXwB9FCbcukugMUOeJ3Lvdio2XCTLuEIKpyu6OhPnBPEE2m60tUuUX+UZDvbZEIu7PwvxKZd3jQCfwF9AHhIIiBzKUA8rkHzXEOAVcqK+rbvQ7sTwH6ezQi4q8pvBtbUQeCGag1KbHgGilRH6/T1exK2jTdDq9Xo3qr4BGFV7osMyecpv6m+7ubuP+1odOA21AoSYiduWgpXKj20S1GfGKCl932O1jyw0aMOZYsW0iogsI/I8TrtsQmpVPQW8FJkAOrvZUpHNDO1SNN0t3vgsx22bb9q8B+ZLHLpNxm1U0o8idJdAYqn2iofHpau9seFLCUuU1CWwG2f1PCVtLuHNFCT8eNMKKBL6ht7e3JlK74WWUA8CGSu2X2f8maM8vDRvfuKrnutKB312ehBOqWGBsBm1EURW+N/wJNxienryc6+rqmlkpiGv7y1xFmqsyr3kGfwPvpIEocHq+HwAAAABJRU5ErkJggg=='
};



module.exports = async function (self) {    
    const presets = {};
    const savedbackgrounds = self.config.backgrounds;
    const savedoverlays = self.config.overlays 

    //Layouts

    presets[`backgrounds`] = {
        type: 'button',
        category: 'Layouts',
        name: `backgrounds`,
        style: {
            text: ``,
            size: 'auto',
            png64: icons.image,
            bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
            {
                down: [
                    {
                        actionId: 'sendbackground',  
                        options: {
                            selectedId: savedbackgrounds.length > 0 ? savedbackgrounds[0].id : null,
                        },
                                   
                    },
                ],
                up: [],
            },
        ],
        feedbacks: [
            {
				feedbackId: 'bgimage',
				options: []
			},
        ], 
    };
    presets[`overlays`] = {
        type: 'button',
        category: 'Layouts',
        name: `overlays`,
        style: {
            text: ``,
            size: 'auto',
            png64: icons.overlay,
            bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
            {
                down: [
                    {
                        actionId: 'sendoverlay',
                        options: {
                            selectedId: savedoverlays.length > 0 ? savedoverlays[0].id : null,
                        }                            
                                           
                    },
                ],
                up: [],
            },
        ],
        feedbacks: [
            {
				feedbackId: 'ovimage',
				options: []
			},
        ], 
    };

    //Remote
    
    presets[`hide`] = {
        type: 'button',
        category: 'Remote',
        name: `Hide`,
        style: {
            text: ``,
            size: 'auto',
            png64: icons.hide,
            bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
            {
                down: [
                    {
                        actionId: 'sendhide',
                        options: [],
                    },
                ],
                up: [],
            },
        ],
        feedbacks: [], 
    };    
    presets[`play/pause`] = {
        type: 'button',
        category: 'Remote',
        name: `Play/pause`,
        style: {
            text: ``,
            size: 'auto',
            png64: icons.playPause,
            bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
            {
                down: [
                    {
                        actionId: 'sendplaypause',
                        options: [],
                    },
                ],
                up: [],
            },
        ],
        feedbacks: [], 
    };
    presets[`rewind`] = {
        type: 'button',
        category: 'Remote',
        name: `rewind`,
        style: {
            text: ``,
            size: 'auto',
            png64: icons.rewind,
            bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
            {
                down: [
                    {
                        actionId: 'sendrewind',
                        options: [],
                    },
                ],
                up: [],
            },
        ],
        feedbacks: [], 
    };
    presets[`show`] = {
        type: 'button',
        category: 'Remote',
        name: `show`,
        style: {
            text: ``,
            size: 'auto',
            png64: icons.show,
            bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
            {
                down: [
                    {
                        actionId: 'sendshow',
                        options: [],
                    },
                ],
                up: [],
            },
        ],
        feedbacks: [], 
    };
    self.setPresetDefinitions(presets);
};
