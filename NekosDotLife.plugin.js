/**
 * @name NekosDotLife
 * @author CriosChan
 * @description A plugin allowing to send any photo from nekos.life in one click
 * @version 2.0.3
 * @invite R7vuNSv
 * @authorid 328191996579545088
 * @updateUrl https://raw.githubusercontent.com/CriosChan/NekosDotLifeBD/main/NekosDotLife.plugin.js
 * @website https://github.com/CriosChan/
 * @source https://github.com/CriosChan/NekosDotLifeBD
 */

const fs = require('fs');
const client = require('https');
const os = require('os');

function downloadImage(url, filepath) {
	return new Promise((resolve, reject) => {
		client.get(url, (res) => {
			if (res.statusCode === 200) {
				res.pipe(fs.createWriteStream(filepath))
					.on('error', reject)
					.once('close', () => resolve(filepath));
				console.log(res)
			} else {
				// Consume response data to free up memory
				res.resume();
				reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));

			}
		});
	});
}

function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

module.exports = (() => {

	const config = {
		info:{
			name:"NekosDotLife",
			authors:[{
				name:"CriosChan",
				discord_id:"328191996579545088",
				github_username:"CriosChan",
			}],
			version:"2.0.3",
			description:"A plugin allowing to send any photo from nekos.life in two clicks",
			github:"https://github.com/CriosChan/NekosDotLifeBD",
			github_raw:"https://raw.githubusercontent.com/CriosChan/NekosDotLifeBD/main/NekosDotLife.plugin.js"
		},
		defaultConfig:
		[
			{
				type: "switch",
				name: "NSFW ? 🔞",
				note: "Allows to activate the NSFW function of the plugin. ⚠️Some SFW can be NSFW, this will be patched soon.",
				id: "nsfwswitch",
				value: false
			},
			{
				type: "switch",
				name: "Spoiler for NSFW ?",
				note: "Allows to send NSFW images as spoiler instead of normal.",
				id: "spoiler",
				value: false
			}
		],
		changelog: [
			{
				title: "NSFW",
				type: "improved",
				items: [
					"You can now ask for the NSFW to be put in spoiler!",
				]
			},
			{
				title: "Upload",
				type: "improved",
				items: [
					"New upload system to allow spoil system.!",
				]
				
			},
			{
				title: "API",
				type: "progress",
				items: [
					"There is unfortunately a big problem with the API of Nekos.Life for the moment which prevents some images to be published :/",
				]
				
			},
		],
		main: "index.js"
	};

    return !global.ZeresPluginLibrary ? class {
        constructor() { this._config = config; }

		getName = () => config.info.name;
		getAuthor = () => config.info.description;
		getVersion = () => config.info.version;

		load()
		{
			BdApi.showConfirmationModal("Library Missing", `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`, {
				confirmText: "Download Now",
				cancelText: "Cancel",
				onConfirm: () =>
				{
					require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (err, res, body) =>
					{
						if (err) return require("electron").shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
						await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
					});
				}
			});
		}

		start() { }
		stop() { }
    } : (([Plugin, Api]) => {
		
        const plugin = (Plugin, Api) =>
		{
			const buttonHTML = `<div class="buttonContainer-2lnNiN da-buttonContainer nekos">
			<button aria-label="NekosDotLife" tabindex="0" type="button" class="buttonWrapper-1ZmCpA da-buttonWrapper button-3BaQ4X button-f2h6uQ lookBlank-21BCro colorBrand-I6CyqQ grow-2sR_-F noFocus-2C7BQj da-noFocus">
				<div class="contents-18-Yxp da-contents button-3AYNKb da-button button-318s1X da-button" style="background: url('https://raw.githubusercontent.com/CriosChan/NekosDotLifeBD/main/logo.png'); width: 30px; height: 30px; background-size: cover; background-position: center">
				</div>
			</button>
		</div>`;

			let opened = false;
			const nekourl = 'https://www.nekos.life/api/'

			const {DiscordSelectors, PluginUtilities, DOMTools, DiscordModules: { UserStore: { getCurrentUser } }} = Api;
			return class NekosDotLife extends Plugin {
				constructor()
				{
					super();
				}
				
				async showChangelog(footer)
				{
					try { footer = (await WebpackModules.getByProps("getUser", "acceptAgreements").getUser("328191996579545088")).tag + " | https://discord.gg/R7vuNSv"; }
					finally { super.showChangelog(footer); }
				}
								
				getDataName = () => this.getName() + "." + getCurrentUser().id;
				loadSettings = s => PluginUtilities.loadSettings(this.getDataName(), PluginUtilities.loadSettings(this.getName(), s || this.defaultSettings));
				saveSettings = s => PluginUtilities.saveSettings(this.getDataName(), this.settings || s);
				
				getSettingsPanel() {
					const panel = this.buildSettingsPanel();
							
					panel.addListener(() => {
						this.term();
						this.init();
					});

					return panel.getElement();
				}

				onStart = () => this.init();
				onStop = () => this.term();

				init()
				{
					const form = document.querySelector("form");
					if (form) this.addButton();
					/*if(this.settings.nsfwswitch != undefined)
							this.settings = this.defaultSettings*/
				}

				term()
				{
					const button = document.querySelector(".nekos");
					if (button) button.remove();
					if(document.getElementById("nekossendpanel") != null){
						document.getElementById("nekossendpanel").remove()
					}
					PluginUtilities.removeStyle(this.getName());
				}

				createbuttons(text, img, sfwornot){
					const buttonhtml = `<div class="buttonContainer-28fw2U da-buttonContainer nekosSub" style='display:inline-block;'>
									<button style="background: url(${img}); width: 100px; height: 100px; background-size: cover; margin: 4px; background-position: center;" aria-label="HugButtonHTML" tabindex="0" type="button" class="buttonWrapper-1ZmCpA da-buttonWrapper button-3BaQ4X button-f2h6uQ lookBlank-21BCro colorBrand-I6CyqQ grow-2sR_-F noFocus-2C7BQj da-noFocus">
										<div class="contents-18-Yxp da-contents button-3AYNKb da-button button-318s1X da-button" style="color: black; font: bold 15px/1 sans-serif; text-shadow: 2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff;">
											${text}
										</div>
									</button>
							</div>`;
						const nekoButton = DOMTools.createElement(buttonhtml);
						document.getElementById(sfwornot).append(nekoButton);
						return nekoButton;
				}
				
				addButton() {
					const form = document.querySelector("form");
					if (form.querySelector(".nekos")) return;
					const button = DOMTools.createElement(buttonHTML);
					form.querySelector(DiscordSelectors.Textarea.buttons).append(button);
					button.addEventListener("click", () => {
						const html = `<div class="layerContainer-2v_Sit" id="nekossendpanel">
									<div class="layer-1Ixpg3">
									<div class="backdrop-2ByYRN withLayer-2VVmpp" style="opacity: 0.85; background: hsl(0, calc(var(--saturation-factor, 1) * 0%), 0%);"></div>
										<div class="focusLock-2tveLW" role="dialog" aria-labelledby="uid_714" tabindex="-1" aria-modal="true">
											<div class="root-g14mjS small-23Atuv fullscreenOnMobile-ixj0e3" style="opacity: 1; transform: scale(1); width: 720px;">
												<div class="flex-2S1XBF flex-3BkGQD horizontal-112GEH horizontal-1Piu5- flex-3BkGQD directionRow-2Iu2A9 justifyStart-2Mwniq alignCenter-14kD11 noWrap-hBpHBz header-1zd7se" id="uid_714" style="flex: 0 0 auto;">
													<h2 class="wrapper-1HSdhi fontDisplay-3Gtuks base-21yXnu size20-9iTTnl">NekosDotLife </h2>
													<img src="https://raw.githubusercontent.com/CriosChan/NekosDotLifeBD/main/logo.png" style="width: 40px; height: 40px"/>
												</div>
												<div class="content-2hZxGK content-26qlhD thin-31rlnD scrollerBase-_bVAAt" dir="ltr" style="overflow: hidden scroll; padding-right: 8px;">
													<div class="markdown-19oyJN">
														<div class="paragraph-9M861H" id='NekosButtons'>
															<div class="flex-2S1XBF flex-3BkGQD horizontal-112GEH horizontal-1Piu5- flex-3BkGQD directionRow-2Iu2A9 justifyStart-2Mwniq alignCenter-14kD11 noWrap-hBpHBz header-1zd7se" id="uid_714" style="flex: 0 0 auto;">
																<h2 class="wrapper-1HSdhi fontDisplay-3Gtuks base-21yXnu size20-9iTTnl" style="padding-right:10px">SFW</h2>
																<div id="sfw">
																
																</div>
															</div>
														</div>
													</div>
													<div aria-hidden="true" style="position: absolute; pointer-events: none; min-height: 0px; min-width: 1px; flex: 0 0 auto; height: 20px;"></div>
												</div>
												<div id="closebutton" class="flex-2S1XBF flex-3BkGQD horizontalReverse-60Katr horizontalReverse-2QssvL flex-3BkGQD directionRowReverse-HZatnx justifyStart-2Mwniq alignStretch-Uwowzr noWrap-hBpHBz footer-31IekZ" style="flex: 0 0 auto;">
												
												</div>
											</div>
										</div>
									</div>
								</div>
								`;
						document.querySelector("#app-mount").insertAdjacentHTML('beforeEnd', html);
						const closebutton = DOMTools.createElement(`<button type="submit" class="button-f2h6uQ lookFilled-yCfaCM colorBrand-I6CyqQ sizeMedium-2bFIHr grow-2sR_-F"><div class="contents-3ca1mk">Close</div></button>`)
						document.getElementById("closebutton").append(closebutton)
						closebutton.addEventListener("click", () => {
							document.getElementById("nekossendpanel").remove()
							opened = false
						})

						const Tags = {
							sfw: [
								{url: "v2/img/smug", type: "url", label: "SMUG", img: "https://cdn.nekos.life/smug/smug_058.gif"},
								{url: "v2/img/baka", type: "url", label: "BAKA", img: "https://cdn.nekos.life/baka/baka_019.gif"},
								{url: "v2/img/tickle", type: "url", label: "TICKLE", img: "https://cdn.nekos.life/tickle/tickle_002.gif"},
								{url: "v2/img/slap", type: "url", label: "SLAP", img: "https://cdn.nekos.life/slap/slap_008.gif"},
								{url: "v2/img/poke", type: "url", label: "POKE", img: "https://cdn.nekos.life/poke/poke_017.gif"},
								{url: "v2/img/pat", type: "url", label: "PAT", img: "https://cdn.nekos.life/pat/pat_066.gif"},
								{url: "neko", type: "neko", label: "NEKO", img: "https://cdn.nekos.life/neko/neko_262.jpeg"},
								{url: "v2/img/meow", type: "url", label: "TICKLE", img: "https://cdn.nekos.life/meow/05FAA.png"},
								{url: "v2/img/kiss", type: "url", label: "KISS", img: "https://cdn.nekos.life/kiss/kiss_082.gif"},
								{url: "hug", type: "url", label: "HUG", img: "https://cdn.nekos.life/hug/hug_020.gif"},
								{url: "v2/img/fox_girl", type: "url", label: "FOXGIRL", img: "https://cdn.nekos.life/fox_girl/kitsune_052.jpg"},
								{url: "v2/img/feed", type: "url", label: "FEED", img: "https://cdn.nekos.life/feed/feed_004.gif"},
								{url: "v2/img/cuddle", type: "url", label: "CUDDLE", img: "https://cdn.nekos.life/cuddle/cuddle_040.gif"},
								{url: "v2/img/kemonomimi", type: "url", label: "KEMONOMIMI", img: "https://cdn.nekos.life/kemonomimi/holo_085.jpg"},
								{url: "v2/img/holo", type: "url", label: "HOLO", img: "https://cdn.nekos.life/holo/holo_137.jpg"},
								{url: "v2/img/woof", type: "url", label: "WOOF", img: "https://cdn.nekos.life/woof/CB2F4.jpg"},
								{url: "v2/img/wallpaper", type: "url", label: "WALLPAPER", img: "https://cdn.nekos.life/wallpaper/4D1bVY5Q3iM.png"},
								{url: "v2/img/goose", type: "url", label: "GOOSE", img: "https://cdn.nekos.life/goose/revnjvtljlwtqks.jpg"},
								{url: "v2/img/gecg", type: "url", label: "GECG", img: "https://cdn.nekos.life/gecg/111_00000.jpg"},
								{url: "v2/img/avatar", type: "url", label: "AVATAR", img: "https://cdn.nekos.life/avatar/avatar_67.png"},
								{url: "v2/img/waifu", type: "url", label: "WAIFU", img: "https://cdn.nekos.life/waifu/a02459c1-1d9d-4ff4-bb15-e09a58f02a90.jpg"}
							],
							nsfw: [
								{url: "v2/img/Random_hentai_gif", type: "url", label: "RANDOMHENTAIGIF", img: "https://cdn.nekos.life/Random_hentai_gif/Random_hentai_gifNB_2049.gif"},
								{url: "v2/img/pussy", type: "url", label: "PUSSY", img: "https://cdn.nekos.life/pussy/pwank045.gif"},
								{url: "v2/img/les", type: "url", label: "LESBIAN", img: "https://cdn.nekos.life/les/OnlyG157.gif"},
								{url: "v2/img/kuni", type: "url", label: "KUNI", img: "https://cdn.nekos.life/kuni/Kuni_95.gif"},
								{url: "v2/img/cum", type: "url", label: "CUMSLUTS", img: "https://cdn.nekos.life/cum/Cum_190.gif"},
								{url: "v2/img/classic", type: "url", label: "CLASSIC", img: "https://cdn.nekos.life/classic/classic_456.gif"},
								{url: "v2/img/boobs", type: "url", label: "BOOBS", img: "https://cdn.nekos.life/boobs/boobs_178.gif"},
								{url: "v2/img/bj", type: "url", label: "BJ", img: "https://cdn.nekos.life/bj/bjl168.gif"},
								{url: "v2/img/anal", type: "url", label: "ANAL", img: "https://cdn.nekos.life/anal/Anal_049.gif"},
								{url: "v2/img/yuri", type: "url", label: "YURI", img: "https://cdn.nekos.life/yuri/yuri083.jpg"},
								{url: "v2/img/trap", type: "url", label: "TRAP", img: "https://cdn.nekos.life/trap/trap060.jpg"},
								{url: "v2/img/tits", type: "url", label: "TITS", img: "https://cdn.nekos.life/tits/tits031.png"},
								{url: "v2/img/solog", type: "url", label: "GIRLSOLOGIF", img: "https://cdn.nekos.life/solog/Girls_solo179.gif"},
								{url: "v2/img/solo", type: "url", label: "GIRLSOLO", img: "https://cdn.nekos.life/solo/solo065.jpg"},
								{url: "v2/img/pwankg", type: "url", label: "PUSSYWANKGIF", img: "https://cdn.nekos.life/pwankg/Pwank_062.gif"},
								{url: "v2/img/pussy_jpg", type: "url", label: "PUSSYART", img: "https://cdn.nekos.life/pussy_jpg/pussy125.jpg"},
								{url: "v2/img/keta", type: "url", label: "KETA", img: "https://cdn.nekos.life/keta/ke-ta_163.jpg"},
								{url: "v2/img/holoero", type: "url", label: "HOLOERO", img: "https://cdn.nekos.life/holoero/ero_holo_35.jpg"},
								{url: "v2/img/hentai", type: "url", label: "HENTAI", img: "https://cdn.nekos.life/hentai/sex34.jpg"},
								{url: "v2/img/futanari", type: "url", label: "FUTANARI", img: "https://cdn.nekos.life/futanari/futanari64.jpg"},
								{url: "v2/img/femdom", type: "url", label: "FEMDOM", img: "https://cdn.nekos.life/femdom/femdom56.png"},
								{url: "v2/img/feetg", type: "url", label: "FEETGIF", img: "https://cdn.nekos.life/feetg/Feet07.gif"},
								{url: "v2/img/feet", type: "url", label: "FEET", img: "https://cdn.nekos.life/feet/feet80.png"},
								{url: "v2/img/erofeet", type: "url", label: "EROFEET", img: "https://cdn.nekos.life/erofeet/erofeet75.jpg"},
								{url: "v2/img/ero", type: "url", label: "ERO", img: "https://cdn.nekos.life/ero/ero08.png"},
								{url: "v2/img/erok", type: "url", label: "EROKITSUNE", img: "https://cdn.nekos.life/erok/ero_kitsune_005.jpg"},
								{url: "v2/img/erokemo", type: "url", label: "EROKEMONOMIMI", img: "https://cdn.nekos.life/erokemo/ero_neko_v2_337.jpg"},
								{url: "v2/img/eroyuri", type: "url", label: "EROYURI", img: "https://cdn.nekos.life/eroyuri/eroyuri52.jpg"},
								{url: "v2/img/cum_jpg", type: "url", label: "CUMARTS", img: "https://cdn.nekos.life/cum_jpg/cum37.jpg"},
								{url: "v2/img/blowjob", type: "url", label: "BLOWJOB", img: "https://cdn.nekos.life/blowjob/blowjob33.jpg"},
								{url: "v2/img/spank", type: "url", label: "SPANK", img: "https://cdn.nekos.life/spank/1360D.gif"},
								{url: "v2/img/gasm", type: "url", label: "GASM", img: "https://cdn.nekos.life/gasm/407618485787557896.png"},
							]
						};
						
						Tags.sfw.forEach(tag => {
							this.createbuttons(tag.label, tag.img, "sfw").addEventListener("click", () => {
								this.send(nekourl + tag.url, tag.type, false)
							});
						});
						
						if(this.settings.nsfwswitch){
							document.getElementById("NekosButtons").insertAdjacentHTML('beforeEnd', `<div class="flex-2S1XBF flex-3BkGQD horizontal-112GEH horizontal-1Piu5- flex-3BkGQD directionRow-2Iu2A9 justifyStart-2Mwniq alignCenter-14kD11 noWrap-hBpHBz header-1zd7se" id="uid_714" style="flex: 0 0 auto;">
																<h2 class="wrapper-1HSdhi fontDisplay-3Gtuks base-21yXnu size20-9iTTnl" style="padding-right: 10px">NSFW</h2>
																<div id="nsfw">
																
																</div>
															</div>`)
							Tags.nsfw.forEach(tag => {
								this.createbuttons(tag.label, tag.img, "nsfw").addEventListener("click", () => {
									this.send(nekourl + tag.url, tag.type, this.settings.spoiler)
								});
							});
						}
					})
				}

				send(requestURL, type, nsfwornot){
					var request = new Request(requestURL);
					fetch(request).then(function(response) {
						return response.json();
					}).then(function(obj) {
						let channelID = BdApi.findModuleByProps("getLastSelectedChannelId").getChannelId();
						let filename = obj.url.split("/")
						filename = filename[filename.length - 1]
						let extension = filename.split(".")
						let url = ''
						if(type == 'neko') url = obj.neko;
						if(type == 'url') url = obj.url;
						downloadImage(url, os.tmpdir() + "/" + filename).then(() => {
							try{
								fs.readFile(os.tmpdir() + "\\" + filename, function (err, data){
									if(err) throw err;
									let blob = data.toString("base64")
									
									BdApi.findModuleByProps("upload", "instantBatchUpload").upload({
										channelId: channelID,
										file: dataURLtoFile("data:image/" + extension[extension.length - 1] + ";base64," + blob, filename),
										draftType: 0,
										message: {
											"channelId": channelID,
											"content": "",
											"tts": false,
											"invalidEmojis": [],
											"validNonShortcutEmojis": []
										},
										hasSpoiler: nsfwornot,
										filename: filename,
									  })
								})
							}catch(e){
								console.log(e)
							}
						})
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