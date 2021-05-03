/**
 * @name NekosDotLife
 * @author CriosChan
 * @description A plugin allowing to send any photo from nekos.life in one click
 * @version 0.1.2
 * @invite R7vuNSv
 * @authorid 328191996579545088
 * @updateUrl https://raw.githubusercontent.com/CriosChan/NekosDotLifeBD/main/NekosDotLife.plugin.js?token=AIYJQ6DQIXNNS2RYYHBBWT3AR4LFC
 * @website https://github.com/CriosChan/
 * @source https://github.com/CriosChan/NekosDotLifeBD
 */
module.exports = (() => {

	const config = {
		info:{
			name:"NekosDotLife",
			authors:[{
				name:"CriosChan",
				discord_id:"328191996579545088",
				github_username:"CriosChan",
			}],
			version:"0.0.1",
			description:"A plugin allowing to send any photo from nekos.life in one click",
			github:"https://github.com/CriosChan/NekosDotLifeBD",
			github_raw:""},
		main:"index.js"
	};

    return !global.ZeresPluginLibrary ? class {
        constructor() {this._config = config;}
        getName() {return config.info.name;}
        getAuthor() {return config.info.authors.map(a => a.name).join(", ");}
        getDescription() {return config.info.description;}
        getVersion() {return config.info.version;}
        load() {
            BdApi.showConfirmationModal("Library Missing", `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`, {
                confirmText: "Download Now",
                cancelText: "Cancel",
                onConfirm: () => {
                    require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (error, response, body) => {
                        if (error) return require("electron").shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
                        await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
                    });
                }
            });
        }
        start() {}
        stop() {}
    } : (([Plugin, Api]) => {
        const plugin = (Plugin, Api) => {
    const buttonHTML = `<div class="buttonContainer-28fw2U da-buttonContainer nekos">
    <button aria-label="NekosDotLife" tabindex="0" type="button" class="buttonWrapper-1ZmCpA da-buttonWrapper button-38aScr da-button lookBlank-3eh9lL colorBrand-3pXr91 grow-q77ONN da-grow noFocus-2C7BQj da-noFocus">
        <div class="contents-18-Yxp da-contents button-3AYNKb da-button button-318s1X da-button">
            <svg id="svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0, 0, 400,400" version="1.1"><g id="svgg"><path id="path0" d="M179.437 9.400 C 178.782 10.399,178.776 10.400,172.237 10.400 C 165.697 10.400,165.691 10.401,165.037 11.400 C 164.425 12.334,164.162 12.400,161.061 12.400 C 158.035 12.400,157.656 12.489,156.800 13.400 C 155.947 14.308,155.560 14.400,152.605 14.400 C 149.453 14.400,149.323 14.438,148.463 15.600 C 147.602 16.765,147.481 16.800,144.260 16.800 C 141.222 16.800,140.872 16.884,140.075 17.800 C 139.530 18.427,138.782 18.800,138.072 18.800 C 137.381 18.800,136.573 19.190,136.000 19.800 C 135.211 20.640,134.696 20.800,132.776 20.800 C 130.781 20.800,130.409 20.927,129.837 21.800 C 129.355 22.536,128.829 22.800,127.847 22.800 C 126.890 22.800,126.299 23.083,125.761 23.800 C 125.117 24.658,124.692 24.800,122.775 24.800 C 120.908 24.800,120.385 24.965,119.600 25.800 C 119.056 26.379,118.214 26.800,117.600 26.800 C 116.986 26.800,116.144 27.221,115.600 27.800 C 115.058 28.377,114.214 28.800,113.605 28.800 C 112.955 28.800,112.109 29.260,111.400 30.000 C 110.658 30.774,109.853 31.200,109.130 31.200 C 108.304 31.200,107.514 31.725,106.122 33.200 C 104.627 34.785,103.971 35.200,102.963 35.200 C 102.049 35.200,101.508 35.481,101.037 36.200 C 100.557 36.933,100.028 37.200,99.061 37.200 C 98.169 37.200,97.434 37.525,96.800 38.200 C 96.263 38.771,95.413 39.200,94.817 39.200 C 94.081 39.200,93.130 39.850,91.600 41.400 C 90.091 42.928,89.114 43.600,88.404 43.600 C 87.661 43.600,86.561 44.424,84.400 46.600 C 82.257 48.757,81.136 49.600,80.408 49.600 C 78.930 49.600,45.600 82.933,45.600 84.411 C 45.600 85.139,44.711 86.302,42.400 88.600 C 40.069 90.917,39.200 92.058,39.200 92.801 C 39.200 93.538,38.369 94.645,36.200 96.800 C 34.000 98.986,33.200 100.057,33.200 100.820 C 33.200 101.413,32.770 102.265,32.200 102.800 C 31.562 103.400,31.200 104.176,31.200 104.947 C 31.200 105.889,30.717 106.614,29.000 108.251 C 27.326 109.846,26.800 110.624,26.800 111.502 C 26.800 112.234,26.435 112.973,25.800 113.525 C 25.173 114.070,24.800 114.818,24.800 115.528 C 24.800 116.219,24.410 117.027,23.800 117.600 C 23.221 118.144,22.800 118.986,22.800 119.600 C 22.800 120.214,22.379 121.056,21.800 121.600 C 21.221 122.144,20.800 122.986,20.800 123.600 C 20.800 124.214,20.379 125.056,19.800 125.600 C 19.216 126.148,18.800 126.985,18.800 127.610 C 18.800 128.951,18.059 131.200,17.343 132.031 C 17.045 132.379,16.800 133.204,16.800 133.865 C 16.800 134.697,16.430 135.397,15.600 136.137 C 14.551 137.072,14.400 137.474,14.400 139.333 C 14.400 141.085,14.224 141.626,13.400 142.400 C 12.584 143.166,12.400 143.719,12.400 145.400 C 12.400 147.081,12.216 147.634,11.400 148.400 C 10.592 149.159,10.398 149.729,10.390 151.370 C 10.378 153.977,9.798 156.466,9.081 156.990 C 8.715 157.258,8.448 158.497,8.318 160.523 C 8.171 162.810,7.899 163.940,7.301 164.749 C 6.658 165.618,6.454 166.610,6.340 169.426 C 6.234 172.069,5.968 173.469,5.320 174.800 C 4.564 176.352,4.416 177.483,4.244 183.000 C 3.985 191.314,3.713 193.373,2.763 194.233 C 1.581 195.303,1.587 215.102,2.770 216.172 C 3.655 216.974,3.891 219.129,4.238 229.600 C 4.392 234.259,4.613 236.376,4.988 236.800 C 5.855 237.777,6.395 240.396,6.398 243.630 C 6.400 246.344,6.505 246.759,7.400 247.600 C 8.298 248.443,8.400 248.853,8.400 251.600 C 8.400 254.347,8.502 254.757,9.400 255.600 C 10.308 256.453,10.400 256.839,10.400 259.800 C 10.400 262.761,10.492 263.147,11.400 264.000 C 12.216 264.766,12.400 265.319,12.400 267.000 C 12.400 268.681,12.584 269.234,13.400 270.000 C 13.988 270.553,14.400 271.385,14.400 272.021 C 14.400 272.615,14.657 273.315,14.971 273.576 C 15.682 274.166,16.800 277.375,16.800 278.825 C 16.800 279.539,17.141 280.131,17.800 280.563 C 18.533 281.043,18.800 281.572,18.800 282.539 C 18.800 283.431,19.125 284.166,19.800 284.800 C 20.350 285.317,20.800 286.175,20.800 286.707 C 20.800 287.239,21.160 288.131,21.600 288.691 C 22.040 289.250,22.400 290.009,22.400 290.376 C 22.400 290.744,22.850 291.655,23.400 292.400 C 23.950 293.145,24.400 294.056,24.400 294.424 C 24.400 294.791,24.751 295.539,25.181 296.085 C 25.610 296.631,26.225 297.843,26.548 298.778 C 26.870 299.713,27.508 300.741,27.967 301.062 C 28.489 301.428,28.800 302.083,28.800 302.820 C 28.800 303.620,29.182 304.334,30.000 305.063 C 30.849 305.819,31.200 306.498,31.200 307.381 C 31.200 308.351,31.648 309.071,33.200 310.600 C 34.567 311.947,35.200 312.894,35.200 313.595 C 35.200 314.339,36.022 315.437,38.200 317.600 C 40.376 319.761,41.200 320.861,41.200 321.604 C 41.200 322.314,41.872 323.291,43.400 324.800 C 45.493 326.867,45.600 327.071,45.600 329.006 C 45.600 331.278,46.077 332.000,47.578 332.000 C 49.069 332.000,72.400 355.326,72.400 356.817 C 72.400 358.322,73.120 358.800,75.390 358.800 C 77.385 358.800,77.472 358.852,80.400 361.800 C 82.555 363.969,83.662 364.800,84.399 364.800 C 85.142 364.800,86.283 365.669,88.600 368.000 C 90.949 370.363,92.053 371.200,92.821 371.200 C 93.413 371.200,94.265 371.631,94.800 372.200 C 95.400 372.839,96.176 373.200,96.949 373.200 C 97.884 373.200,98.586 373.655,100.037 375.200 C 101.463 376.718,102.197 377.200,103.088 377.200 C 103.822 377.200,104.612 377.574,105.200 378.200 C 105.744 378.779,106.586 379.200,107.200 379.200 C 107.814 379.200,108.656 379.621,109.200 380.200 C 109.744 380.779,110.586 381.200,111.200 381.200 C 111.814 381.200,112.656 381.621,113.200 382.200 C 113.742 382.777,114.586 383.200,115.195 383.200 C 115.845 383.200,116.691 383.660,117.400 384.400 C 118.109 385.140,118.955 385.600,119.605 385.600 C 120.214 385.600,121.058 386.023,121.600 386.600 C 122.234 387.275,122.969 387.600,123.861 387.600 C 124.828 387.600,125.357 387.867,125.837 388.600 C 126.409 389.473,126.781 389.600,128.776 389.600 C 130.696 389.600,131.211 389.760,132.000 390.600 C 132.766 391.416,133.319 391.600,135.000 391.600 C 136.681 391.600,137.234 391.784,138.000 392.600 C 138.776 393.426,139.313 393.600,141.089 393.600 C 142.868 393.600,143.398 393.772,144.165 394.600 C 144.940 395.436,145.457 395.600,147.317 395.600 C 149.268 395.600,149.648 395.735,150.406 396.700 C 151.235 397.756,151.447 397.808,155.735 398.000 C 159.887 398.186,160.228 398.263,160.595 399.100 L 160.990 400.000 201.067 400.000 L 241.144 400.000 241.272 399.100 C 241.392 398.259,241.639 398.187,245.065 398.000 C 248.476 397.814,248.791 397.724,249.594 396.700 C 250.413 395.657,250.632 395.600,253.783 395.600 C 256.888 395.600,257.151 395.534,257.763 394.600 C 258.337 393.724,258.705 393.600,260.737 393.600 C 262.712 393.600,263.185 393.452,263.925 392.600 C 264.669 391.745,265.136 391.600,267.151 391.600 C 269.224 391.600,269.587 391.479,270.163 390.600 C 270.647 389.862,271.170 389.600,272.163 389.600 C 273.156 389.600,273.679 389.338,274.163 388.600 C 274.741 387.719,275.101 387.600,277.200 387.600 C 279.299 387.600,279.659 387.481,280.237 386.600 C 280.707 385.882,281.249 385.600,282.157 385.600 C 283.062 385.600,283.722 385.258,284.475 384.400 C 285.192 383.583,285.899 383.200,286.692 383.200 C 287.435 383.200,288.170 382.838,288.725 382.200 C 289.305 381.534,290.010 381.200,290.840 381.200 C 291.691 381.200,292.333 380.884,292.871 380.200 C 293.402 379.526,294.054 379.200,294.872 379.200 C 295.811 379.200,296.510 378.748,297.963 377.200 C 299.309 375.766,300.144 375.200,300.911 375.200 C 301.649 375.200,302.632 374.579,304.078 373.200 C 305.478 371.865,306.516 371.200,307.201 371.200 C 307.915 371.200,308.889 370.530,310.400 369.000 C 311.823 367.559,312.901 366.800,313.524 366.800 C 314.168 366.800,315.462 365.833,317.537 363.802 C 320.529 360.873,320.647 360.804,322.619 360.802 C 324.961 360.800,327.600 358.669,327.600 356.780 C 327.600 355.326,348.964 334.000,350.422 334.000 C 352.285 334.000,354.400 331.334,354.402 328.983 C 354.404 327.041,354.470 326.934,357.583 323.800 C 359.849 321.520,360.768 320.306,360.781 319.579 C 360.794 318.908,361.486 317.858,362.800 316.515 C 364.064 315.225,364.800 314.124,364.800 313.524 C 364.800 312.931,365.551 311.787,366.800 310.478 C 368.228 308.980,368.800 308.060,368.800 307.257 C 368.800 306.512,369.205 305.772,370.000 305.063 C 370.780 304.368,371.201 303.610,371.202 302.897 C 371.204 302.106,371.762 301.262,373.202 299.872 C 374.650 298.475,375.200 297.641,375.200 296.842 C 375.200 296.183,375.602 295.361,376.200 294.800 C 377.016 294.034,377.200 293.481,377.200 291.800 C 377.200 290.119,377.384 289.566,378.200 288.800 C 378.779 288.256,379.200 287.414,379.200 286.800 C 379.200 286.186,379.621 285.344,380.200 284.800 C 380.875 284.166,381.200 283.431,381.200 282.539 C 381.200 281.572,381.467 281.043,382.200 280.563 C 382.924 280.089,383.200 279.552,383.200 278.620 C 383.200 277.693,383.537 277.032,384.400 276.263 C 385.449 275.328,385.600 274.926,385.600 273.067 C 385.600 271.315,385.776 270.774,386.600 270.000 C 387.416 269.234,387.600 268.681,387.600 267.000 C 387.600 265.319,387.784 264.766,388.600 264.000 C 389.444 263.207,389.600 262.698,389.600 260.739 C 389.600 258.705,389.724 258.338,390.600 257.763 C 391.564 257.132,391.600 256.952,391.600 252.824 C 391.600 248.771,391.654 248.489,392.600 247.600 C 393.545 246.712,393.600 246.427,393.600 242.400 C 393.600 238.373,393.655 238.088,394.600 237.200 C 395.596 236.264,395.600 236.232,395.600 228.933 L 395.600 221.606 396.800 220.537 L 398.000 219.468 398.000 206.209 L 398.000 192.950 396.800 191.800 L 395.600 190.650 395.600 183.395 C 395.600 176.173,395.595 176.135,394.600 175.200 C 393.632 174.290,393.600 174.094,393.600 169.000 C 393.600 163.906,393.568 163.710,392.600 162.800 C 391.691 161.946,391.600 161.562,391.600 158.576 C 391.600 155.514,391.532 155.248,390.600 154.637 C 389.724 154.062,389.600 153.695,389.600 151.661 C 389.600 149.702,389.444 149.193,388.600 148.400 C 387.784 147.634,387.600 147.081,387.600 145.400 C 387.600 143.719,387.416 143.166,386.600 142.400 C 385.776 141.626,385.600 141.085,385.600 139.333 C 385.600 137.474,385.449 137.072,384.400 136.137 C 383.540 135.371,383.200 134.705,383.200 133.790 C 383.200 132.894,382.901 132.288,382.200 131.761 C 381.337 131.113,381.200 130.696,381.200 128.714 C 381.200 126.707,381.074 126.336,380.200 125.763 C 379.477 125.290,379.200 124.752,379.200 123.824 C 379.200 122.971,378.864 122.224,378.200 121.600 C 377.621 121.056,377.200 120.214,377.200 119.600 C 377.200 118.986,376.779 118.144,376.200 117.600 C 375.590 117.027,375.200 116.219,375.200 115.528 C 375.200 114.818,374.827 114.070,374.200 113.525 C 373.522 112.936,373.200 112.243,373.200 111.374 C 373.200 110.448,372.922 109.910,372.200 109.437 C 371.499 108.977,371.200 108.421,371.200 107.573 C 371.200 106.649,370.684 105.836,369.000 104.112 C 367.563 102.640,366.800 101.524,366.800 100.893 C 366.800 100.273,366.084 99.196,364.800 97.885 C 363.486 96.542,362.794 95.492,362.781 94.821 C 362.768 94.094,361.849 92.880,359.583 90.600 C 357.333 88.336,356.401 87.108,356.394 86.400 C 356.387 85.674,355.292 84.305,352.393 81.400 C 349.423 78.423,348.402 77.138,348.401 76.377 C 348.400 74.865,329.137 55.600,327.628 55.600 C 326.839 55.600,325.613 54.624,322.600 51.600 C 319.612 48.600,318.357 47.600,317.585 47.600 C 316.830 47.600,315.707 46.748,313.377 44.409 C 311.067 42.089,309.919 41.216,309.170 41.209 C 308.597 41.204,307.722 40.756,307.200 40.200 C 306.664 39.629,305.813 39.200,305.218 39.200 C 304.513 39.200,303.496 38.552,302.078 37.200 C 300.531 35.725,299.671 35.200,298.800 35.200 C 297.981 35.200,297.417 34.893,296.963 34.200 C 296.483 33.466,295.955 33.200,294.983 33.200 C 294.046 33.200,293.428 32.907,292.871 32.200 C 292.353 31.541,291.686 31.200,290.917 31.200 C 290.142 31.200,289.363 30.797,288.600 30.000 C 287.891 29.260,287.045 28.800,286.395 28.800 C 285.786 28.800,284.942 28.377,284.400 27.800 C 283.856 27.221,283.014 26.800,282.400 26.800 C 281.786 26.800,280.944 26.379,280.400 25.800 C 279.856 25.221,279.014 24.800,278.400 24.800 C 277.786 24.800,276.944 24.379,276.400 23.800 C 275.766 23.125,275.031 22.800,274.139 22.800 C 273.172 22.800,272.643 22.533,272.163 21.800 C 271.589 20.923,271.222 20.800,269.183 20.800 C 267.179 20.800,266.749 20.662,266.071 19.800 C 265.405 18.953,264.953 18.800,263.112 18.800 C 261.312 18.800,260.778 18.629,260.000 17.800 C 259.222 16.972,258.688 16.800,256.894 16.800 C 254.988 16.800,254.601 16.656,253.675 15.600 C 252.668 14.452,252.481 14.400,249.381 14.400 C 246.441 14.400,246.052 14.307,245.200 13.400 C 244.310 12.453,244.031 12.400,239.939 12.400 C 235.772 12.400,235.595 12.365,234.963 11.400 C 234.317 10.413,234.234 10.400,228.800 10.400 C 223.366 10.400,223.283 10.387,222.637 9.400 L 221.982 8.400 201.037 8.400 L 180.092 8.400 179.437 9.400 M132.302 116.969 C 134.365 117.518,139.340 120.548,143.482 123.777 C 144.627 124.670,146.771 126.300,148.246 127.400 C 152.510 130.578,161.240 138.457,168.192 145.399 C 171.716 148.919,175.320 152.407,176.199 153.151 L 177.798 154.502 183.799 154.234 C 187.100 154.087,191.734 153.781,194.097 153.555 C 197.072 153.270,199.965 153.273,203.497 153.565 C 206.304 153.797,211.969 154.108,216.086 154.255 L 223.572 154.522 226.086 152.309 C 227.469 151.091,230.862 147.869,233.627 145.148 C 246.556 132.421,256.770 123.434,260.841 121.200 C 261.443 120.870,263.058 119.895,264.430 119.033 C 269.939 115.573,276.737 115.463,279.738 118.784 C 284.872 124.466,286.141 144.710,283.189 173.800 C 282.030 185.216,282.173 187.183,284.418 190.628 C 288.806 197.363,290.240 201.442,292.798 214.469 C 293.043 215.717,293.483 216.937,293.775 217.179 C 294.379 217.680,301.300 217.785,306.929 217.379 C 315.935 216.728,318.881 219.377,318.963 228.200 C 319.043 236.765,319.590 236.536,295.687 237.937 C 291.002 238.212,290.271 238.352,289.504 239.118 L 288.635 239.987 289.927 241.251 C 290.638 241.945,292.160 242.835,293.310 243.227 C 294.459 243.619,296.930 244.510,298.800 245.207 C 300.670 245.905,303.701 246.899,305.535 247.417 C 307.369 247.935,309.079 248.525,309.335 248.728 C 309.591 248.930,310.443 249.303,311.229 249.555 C 318.935 252.034,315.486 268.022,307.251 267.995 C 305.188 267.989,295.584 265.067,289.400 262.566 C 286.385 261.346,278.331 258.862,276.378 258.550 C 274.310 258.219,272.224 259.248,267.085 263.133 C 255.462 271.918,240.200 278.450,226.288 280.591 C 224.260 280.903,221.700 281.342,220.600 281.566 C 209.911 283.743,187.609 282.673,171.400 279.206 C 157.437 276.219,141.808 268.823,133.400 261.223 C 131.386 259.403,128.116 257.550,126.853 257.514 C 125.680 257.481,114.931 260.776,110.200 262.619 C 93.451 269.145,88.247 269.274,86.039 263.218 C 82.498 253.508,84.250 249.997,93.759 247.741 C 95.056 247.434,96.676 246.925,97.359 246.610 C 98.041 246.296,100.975 245.243,103.878 244.270 C 106.781 243.297,109.435 242.222,109.775 241.882 C 110.115 241.543,111.012 241.060,111.768 240.811 C 113.058 240.385,113.119 240.287,112.750 239.228 L 112.357 238.100 107.278 237.831 C 104.485 237.683,98.870 237.404,94.800 237.210 C 82.050 236.603,80.041 234.923,80.673 225.400 C 81.152 218.204,82.055 217.783,96.687 217.943 C 110.318 218.092,109.516 218.385,110.218 213.000 C 110.543 210.501,111.791 205.299,112.759 202.400 C 113.164 201.190,113.723 199.480,114.001 198.600 C 114.280 197.720,114.851 196.513,115.269 195.918 C 119.083 190.488,119.927 187.364,119.027 182.000 C 116.482 166.836,116.041 150.620,117.640 131.000 C 118.704 117.952,122.466 114.351,132.302 116.969 M154.600 202.162 C 145.086 206.727,145.072 218.719,154.575 223.928 C 159.507 226.632,169.364 222.793,170.804 217.609 C 173.910 206.430,164.467 197.428,154.600 202.162 M237.978 202.198 C 230.975 205.755,229.034 212.516,233.054 219.355 C 237.184 226.382,247.546 226.558,252.518 219.685 C 259.876 209.514,249.098 196.552,237.978 202.198 " stroke="none" fill="#be43a6" fill-rule="evenodd"></path><path id="path1" d="M123.000 117.154 C 118.812 119.081,117.994 122.602,116.773 143.945 C 116.207 153.850,117.245 171.385,119.027 182.000 C 119.927 187.364,119.083 190.488,115.269 195.918 C 114.851 196.513,114.280 197.720,114.001 198.600 C 113.723 199.480,113.164 201.190,112.759 202.400 C 111.791 205.299,110.543 210.501,110.218 213.000 C 109.516 218.385,110.318 218.092,96.687 217.943 C 82.055 217.783,81.152 218.204,80.673 225.400 C 80.041 234.923,82.050 236.603,94.800 237.210 C 98.870 237.404,104.485 237.683,107.278 237.831 L 112.357 238.100 112.750 239.228 C 113.119 240.287,113.058 240.385,111.768 240.811 C 111.012 241.060,110.115 241.543,109.775 241.882 C 109.435 242.222,106.781 243.297,103.878 244.270 C 100.975 245.243,98.041 246.296,97.359 246.610 C 96.676 246.925,95.056 247.434,93.759 247.741 C 84.250 249.997,82.498 253.508,86.039 263.218 C 88.247 269.274,93.451 269.145,110.200 262.619 C 114.931 260.776,125.680 257.481,126.853 257.514 C 128.116 257.550,131.386 259.403,133.400 261.223 C 141.808 268.823,157.437 276.219,171.400 279.206 C 187.609 282.673,209.911 283.743,220.600 281.566 C 221.700 281.342,224.260 280.903,226.288 280.591 C 240.200 278.450,255.462 271.918,267.085 263.133 C 272.224 259.248,274.310 258.219,276.378 258.550 C 278.331 258.862,286.385 261.346,289.400 262.566 C 292.020 263.626,300.612 266.525,303.800 267.426 C 309.551 269.050,312.323 267.419,314.581 261.086 C 316.674 255.214,315.421 250.904,311.229 249.555 C 310.443 249.303,309.591 248.930,309.335 248.728 C 309.079 248.525,307.369 247.935,305.535 247.417 C 303.701 246.899,300.670 245.905,298.800 245.207 C 296.930 244.510,294.459 243.619,293.310 243.227 C 292.160 242.835,290.638 241.945,289.927 241.251 L 288.635 239.987 289.504 239.118 C 290.271 238.352,291.002 238.212,295.687 237.937 C 319.590 236.536,319.043 236.765,318.963 228.200 C 318.881 219.377,315.935 216.728,306.929 217.379 C 301.300 217.785,294.379 217.680,293.775 217.179 C 293.483 216.937,293.043 215.717,292.798 214.469 C 290.240 201.442,288.806 197.363,284.418 190.628 C 282.173 187.183,282.030 185.216,283.189 173.800 C 286.141 144.710,284.872 124.466,279.738 118.784 C 276.737 115.463,269.939 115.573,264.430 119.033 C 263.058 119.895,261.443 120.870,260.841 121.200 C 256.770 123.434,246.556 132.421,233.627 145.148 C 230.862 147.869,227.469 151.091,226.086 152.309 L 223.572 154.522 216.086 154.255 C 211.969 154.108,206.304 153.797,203.497 153.565 C 199.965 153.273,197.072 153.270,194.097 153.555 C 191.734 153.781,187.100 154.087,183.799 154.234 L 177.798 154.502 176.199 153.151 C 175.320 152.407,171.716 148.919,168.192 145.399 C 161.240 138.457,152.510 130.578,148.246 127.400 C 146.771 126.300,144.627 124.670,143.482 123.777 C 134.684 116.918,128.123 114.796,123.000 117.154 M164.499 201.983 C 167.439 203.316,170.143 206.070,170.800 208.400 C 173.305 217.275,168.241 224.600,159.600 224.600 C 149.053 224.600,143.464 212.417,150.540 204.853 C 154.082 201.067,159.859 199.879,164.499 201.983 M248.072 201.973 C 256.987 206.109,257.322 217.798,248.677 223.085 C 241.769 227.310,233.519 223.593,231.352 215.280 C 228.943 206.035,239.212 197.862,248.072 201.973 " stroke="none" fill="#840af2" fill-rule="evenodd"></path></g></svg>
		</div>
	</button>
</div>`;

    let opened = false;
    const nekourl = 'https://www.nekos.life/api/'

    const {DiscordSelectors, DiscordAPI, PluginUtilities, DOMTools, Logger} = Api;
    return class NekosDotLife extends Plugin {
        onStart() {
            const form = document.querySelector("form");
            if (form) this.addButton();
        }
        
        onStop() {
            const button = document.querySelector(".nekos");
            if (button) button.remove();
            const buttons = document.querySelectorAll(".nekosSub");
            for(let i = 1; i <= buttons.length; i++){
                const button = document.querySelector(".nekosSub");
                if (button) button.remove();
            }
            PluginUtilities.removeStyle(this.getName());
        }

        createbuttons(text, form){
            const buttonhtml = `<div class="buttonContainer-28fw2U da-buttonContainer nekosSub" style='display:inline-block;'>
                        <button aria-label="HugButtonHTML" tabindex="0" type="button" class="buttonWrapper-1ZmCpA da-buttonWrapper button-38aScr da-button lookBlank-3eh9lL colorBrand-3pXr91 grow-q77ONN da-grow noFocus-2C7BQj da-noFocus">
                            <div class="contents-18-Yxp da-contents button-3AYNKb da-button button-318s1X da-button">
                                ${text}
                            </div>
                        </button>
                    </div>`;
                const nekoButton = DOMTools.createElement(buttonhtml);
				form.querySelector(DiscordSelectors.Textarea.channelTextArea).append(nekoButton);
                return nekoButton;
        }

        addButton() {
            const form = document.querySelector("form");
            if (form.querySelector(".nekos")) return;
            const button = DOMTools.createElement(buttonHTML);
            form.querySelector(DiscordSelectors.Textarea.buttons).append(button);
            button.addEventListener("click", () => {
				if(opened == true) {
                    const buttons = document.querySelectorAll(".nekosSub");
                    for(let i = 1; i <= buttons.length; i++){
                        const button = document.querySelector(".nekosSub");
                        if (button) button.remove();
                    }
                    opened = false;
                    return;
                }

                opened = true

                const sfwhtml = `<div class="markup-2BOw-j messageContent-2qWWxC nekosSub" >  SFW</div>`;
                const sfw = DOMTools.createElement(sfwhtml);
                form.querySelector(DiscordSelectors.Textarea.channelTextArea).append(sfw);

                this.createbuttons('SMUG', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/smug', 'url')
                });
                this.createbuttons('BAKA', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/baka', 'url')
                });
                this.createbuttons('TICKLE', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/tickle', 'url')
                });
                this.createbuttons('SLAP', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/slap', 'url')
                });
                this.createbuttons('POKE', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/poke', 'url')
                });
                this.createbuttons('PAT', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/pat', 'url')
                });
                this.createbuttons('NEKO', form).addEventListener("click", () => {
                    this.send(nekourl + 'neko', 'neko')
                });
                this.createbuttons('MEOW', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/meow', 'url')
                });
                this.createbuttons('KISS', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/kiss', 'url')
                })
                this.createbuttons('HUG', form).addEventListener("click", () => {
                    this.send(nekourl + 'hug', 'url')
                });
                this.createbuttons('FOXGIRL', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/fox_girl', 'url')
                })
                this.createbuttons('FEED', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/feed', 'url')
                })
                this.createbuttons('CUDDLE', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/cuddle', 'url')
                })
                this.createbuttons('KEMONOMIMI', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/kemonomimi', 'url')
                })
                this.createbuttons('HOLO', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/holo', 'url')
                })
                this.createbuttons('WOOF', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/woof', 'url')
                })
                this.createbuttons('WALLPAPER', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/wallpaper', 'url')
                })
                this.createbuttons('GOOSE', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/goose', 'url')
                })
                this.createbuttons('GECG', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/gecg', 'url')
                })
                this.createbuttons('AVATAR', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/avatar', 'url')
                })
                this.createbuttons('WAIFU', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/waifu', 'url')
                })

                const nsfwhtml = `<div class="markup-2BOw-j messageContent-2qWWxC nekosSub" style='display:block'>  NSFW</div>`;
                const nsfw = DOMTools.createElement(nsfwhtml);
                form.querySelector(DiscordSelectors.Textarea.channelTextArea).append(nsfw);

                this.createbuttons('RANDOMHENTAIGIF', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/Random_hentai_gif', 'url')
                })

                this.createbuttons('PUSSY', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/pussy', 'url')
                })

                this.createbuttons('LESBIAN', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/les', 'url')
                })

                this.createbuttons('KUNI', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/kuni', 'url')
                })

                this.createbuttons('CUMSLUTS', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/cum', 'url')
                })
                
                this.createbuttons('CLASSIC', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/classic', 'url')
                })

                this.createbuttons('BOOBS', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/boobs', 'url')
                })

                this.createbuttons('BJ', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/bj', 'url')
                })

                this.createbuttons('ANAL', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/anal', 'url')
                })
                this.createbuttons('YURI', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/yuri', 'url')
                })
                this.createbuttons('TRAP', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/trap', 'url')
                })
                this.createbuttons('TITS', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/tits', 'url')
                })
                this.createbuttons('GIRLSOLOGIF', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/solog', 'url')
                })
                this.createbuttons('GIRLSOLO', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/solo', 'url')
                })
                this.createbuttons('PUSSYWANKGIF', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/pwankg', 'url')
                })
                this.createbuttons('PUSSYART', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/pussy_jpg', 'url')
                })
                this.createbuttons('KETA', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/keta', 'url')
                })
                this.createbuttons('HOLOERO', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/holoero', 'url')
                })
                this.createbuttons('HENTAI', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/hentai', 'url')
                })
                this.createbuttons('FUTANARI', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/futanari', 'url')
                })
                this.createbuttons('FEMDOM', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/femdom', 'url')
                })
                this.createbuttons('FEETGIF', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/feetg', 'url')
                })
                this.createbuttons('FEET', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/feet', 'url')
                })
                this.createbuttons('EROFEET', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/erofeet', 'url')
                })
                this.createbuttons('ERO', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/ero', 'url')
                })
                this.createbuttons('EROKITSUNE', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/erok', 'url')
                })
                this.createbuttons('EROKEMONOMIMI', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/erokemo', 'url')
                })
                this.createbuttons('EROYURI', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/eroyuri', 'url')
                })
                this.createbuttons('CUMARTS', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/cum_jpg', 'url')
                })
                this.createbuttons('BLOWJOB', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/blowjob', 'url')
                })
                this.createbuttons('SPANK', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/spank', 'url')
                })
                this.createbuttons('GASM', form).addEventListener("click", () => {
                    this.send(nekourl + 'v2/img/gasm', 'url')
                })
            })
        }

        send(requestURL, type){
            var request = new Request(requestURL);
            fetch(request).then(function(response) {
                return response.text();
            }).then(function(text) {
                var obj = JSON.parse(text);                
                let channelID = BdApi.findModuleByProps('getChannelId').getChannelId();
                let MessageQueue = BdApi.findModuleByProps('enqueue');
                let MessageParser = BdApi.findModuleByProps('createBotMessage');
                let msg = MessageParser.createBotMessage(channelID, '');
                let content = ''
                if(type == 'neko') content = obj.neko;
                if(type == 'url') content = obj.url;
                // Send the message
                MessageQueue.enqueue({
                    type: 0,
                    message: {
                        channelId: channelID,
                        content: content,
                        tts: false,
                        nonce: msg.id,
                        }
                    }, r => {
                        return;
                    });
                });
            }

        observer(e) {
            if (!e.addedNodes.length || !e.addedNodes[0] || !e.addedNodes[0].querySelector) return;
            const form = e.addedNodes[0].querySelector(DiscordSelectors.Textarea.inner);
            if (form) this.addButton(form);
        }

    };
};
        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();
