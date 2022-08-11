/**
 * @name NekosDotLife
 * @author CriosChan
 * @description A plugin allowing to send any photo from nekos.life in one click
 * @version 2.0.9
 * @invite R7vuNSv
 * @authorid 328191996579545088
 * @updateUrl https://raw.githubusercontent.com/CriosChan/NekosDotLifeBD/main/NekosDotLife.plugin.js
 * @website https://github.com/CriosChan/
 * @source https://github.com/CriosChan/NekosDotLifeBD
 */

const request = require('request').defaults({encoding: null})

function SendBlob(url, callback) {
	request.get(url, (error, response, body) => {
		if(!error && response.statusCode == 200){
			data = "data:" + response.headers["content-type"] + ";base64," + Buffer.from(body).toString('base64');
			callback(data)
		} else {
			log(error, "err")
		}
	
	})
}

function dataURLtoFile(dataurl, filename) {
	var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
	while(n--){
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], filename, {type:mime});
}

function log(text, type){
	if(type == "log") console.log("[NEKOSDOTLIFE] [LOG]", text)
	if(type == "err") console.error("[NEKOSDOTLIFE] [ERROR]", text)
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
		version:"2.0.9",
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
		},
        {
            type: "switch",
            name: "See the image before sending it",
            note: "Just before sending the image the plugin lets you see it and choose whether you want to send it, search for another image of the same type, or cancel the sending.",
            id: "preview",
            value: true
        },
        {
            type: "switch",
            name: "Quit after sending?",
            note: "Will make the interface close each time you send an image.",
            id: "quit_after_send",
            value: false
        }
	],
	changelog: [
		{
			title: "What's new?",
            type: "added",
            items: [
                "There is now a preview of the image before sending. You can disable this option in the plugin settings.",
            ]
		},
		{
            title: "What has been improved?",
            type: "improved",
            items: [
                "No need to download the image before sending it like I used to do.",
            ]
        }
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

		let nekourl = "https://api.nekos.dev/api/"

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
			}

			term()
			{
				const button = document.querySelector(".nekos");
				if (button) button.remove();
				if(document.getElementById("nekossendpanel") != null){
					document.getElementById("nekossendpanel").remove()
				}
				if(document.getElementById("nekospreviewpanel") != null){
					document.getElementById("nekospreviewpanel").remove()
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
								<div class="backdrop-2ByYRN withLayer-2VVmpp" style="opacity: 0.85; background: hsl(0, calc(var(--saturation-factor, 1) * 0%), 0%);" id="nekosdotlife_backdrop"></div>
									<div class="focusLock-2tveLW" role="dialog" aria-labelledby="uid_714" tabindex="-1" aria-modal="true">
										<div class="root-g14mjS small-23Atuv fullscreenOnMobile-ixj0e3" style="opacity: 1; transform: scale(1); width: 720px;">
											<div class="flex-2S1XBF flex-3BkGQD horizontal-112GEH horizontal-1Piu5- flex-3BkGQD directionRow-2Iu2A9 justifyStart-2Mwniq alignCenter-14kD11 noWrap-hBpHBz header-1zd7se" id="uid_714" style="flex: 0 0 auto;">
												<h2 class="wrapper-1HSdhi fontDisplay-3Gtuks base-21yXnu size20-9iTTnl" style="color:white;font-size:24px">NekosDotLife </h2>
												<img src="https://raw.githubusercontent.com/CriosChan/NekosDotLifeBD/main/logo.png" style="width: 40px; height: 40px; padding-left: 10px"/>
											</div>
											<div class="content-2hZxGK content-26qlhD thin-31rlnD scrollerBase-_bVAAt" dir="ltr" style="overflow: hidden scroll; padding-right: 8px;">
												<div class="markdown-19oyJN">
													<div class="paragraph-9M861H" id='NekosButtons'>
															<details open><summary>SFW :</summary><div id="sfw" class="plugin-inputs collapsible" style="display: grid; height: 100%; width: 100%; grid-template-columns: auto auto auto auto auto; grid-gap: 5px;">
													
													</div>
												</div>
												<div aria-hidden="true" style="position: absolute; pointer-events: none; min-height: 0px; min-width: 1px; flex: 0 0 auto; height: 20px;"></div>
											</div>
											
										</div>
										<div id="closebutton" class="flex-2S1XBF flex-3BkGQD horizontalReverse-60Katr horizontalReverse-2QssvL flex-3BkGQD directionRowReverse-HZatnx justifyStart-2Mwniq alignStretch-Uwowzr noWrap-hBpHBz footer-31IekZ" style="flex: 0 0 auto;">
											
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
					})

					document.getElementById("nekosdotlife_backdrop").addEventListener("click", () => {
                        document.getElementById("nekossendpanel").remove()
                     })

					let nsfw = "https://hmtai.herokuapp.com/v2/"
					let Tags = {
							sfw: [
								{url: "v3/images/sfw/img/smug", label: "SMUG", img: "https://cdn.nekos.life/v3/sfw/img/smug/smug_039.jpg"},
								{url: "v3/images/sfw/img/8ball", label: "8BALL", img: "https://cdn.nekos.life/v3/sfw/img/8ball/Go_For_It.png"},
								{url: "v3/images/sfw/img/neko_avatars_avatar", label: "NEKO AVATAR", img: "https://cdn.nekos.life/v3/sfw/img/neko_avatars_avatar/neko_073.jpg"},
								{url: "v3/images/sfw/img/gecg", label: "GECG", img: "https://cdn.nekos.life/v3/sfw/img/gecg/gecg_004.jpg"},
								{url: "v3/images/sfw/img/holo", label: "HOLO", img: "https://cdn.nekos.life/v3/sfw/img/holo/holo_132.jpg"},
								{url: "v3/images/sfw/img/lizard", label: "LIZARD", img: "https://cdn.nekos.life/v3/sfw/img/lizard/lizard_029.jpeg"},
								{url: "v3/images/sfw/img/neko", label: "NEKO", img: "https://cdn.nekos.life/v3/sfw/img/neko/neko_133.jpeg"},
								{url: "v3/images/sfw/img/no_tag_avatar", label: "NO TAG AVATAR", img: "https://cdn.nekos.life/v3/sfw/img/no_tag_avatar/avatar_069.jpeg"},
								{url: "v3/images/sfw/img/holo_avatar", label: "HOLO AVATAR", img: "https://cdn.nekos.life/v3/sfw/img/holo_avatar/holo_07.png"},
								{url: "v3/images/sfw/img/kitsune", label: "KITSUNE", img: "https://cdn.nekos.life/v3/sfw/img/kitsune/kitsune_061.jpg"},
								{url: "v3/images/sfw/img/wallpaper", label: "WALLPAPER", img: "https://cdn.nekos.life/v3/sfw/img/wallpaper/__baimi_and_suiji_dong_jin_rice_hime_drawn_by_shinia__d418d0caabca15a441e6d4966d10a881.jpg"},
								{url: "v3/images/sfw/img/waifu", label: "WAIFU", img: "https://cdn.nekos.life/v3/sfw/img/waifu/b321f420-9826-4862-a018-4dfbea8e056e.jpg"},
								{url: "v3/images/sfw/img/keta_avatar", label: "KETA AVATAR", img: "https://cdn.nekos.life/v3/sfw/img/keta_avatar/avatar_055.png"},
								{url: "v3/images/sfw/img/cat", label: "CAT", img: "https://cdn.nekos.life/v3/sfw/img/cat/cat_414.jpg"},
								{url: "v3/images/sfw/img/kiminonawa", label: "KIMINONAWA", img: 	"https://cdn.nekos.life/v3/sfw/img/kiminonawa/kiminonawa_11.jpg"},
								//{url: "v3/images/sfw/img/shinobu", label: "SHINOBU", img: "https://cdn.nekos.life/v3/sfw/img/kitsune/kitsune_061.jpg"},
							],
							nsfw: [
								{url: "ass", label: "ASS", img: "https://cdn.discordapp.com/attachments/797640225211023390/797640774937608232/kartinka.jpg"},
								{url: "bdsm", label: "BDSM", img: "https://cdn.discordapp.com/attachments/797640801009795113/797649757211590666/kartinka.jpg"},
								{url: "cum", label: "CUM", img: "https://cdn.discordapp.com/attachments/770948564947304448/770983119200190484/1aaa1185-e5f4-4f6d-a189-49106284a87f.jpg"},
								{url: "creampie", label: "CREAMPIE", img: "https://cdn.discordapp.com/attachments/797656864485146694/797658457796116480/kartinka.jpg"},
								{url: "manga", label: "MANGA", img: "https://cdn.discordapp.com/attachments/770948564947304448/771374706984353792/00430-8kYf26o3PAQ.jpg"},
								{url: "femdom", label: "FEMDOM", img: "https://media.discordapp.net/attachments/516059858924208138/660791681620246554/tumblr_phdy21Ypw61v73vj5_1280.jpg"},
								{url: "hentai", label: "HENTAI", img: "https://media.discordapp.net/attachments/527958344921514004/669272658587680790/78320838_p0_master1200.png"},
								{url: "incest", label: "INCEST", img: "https://cdn.discordapp.com/attachments/797715728525819904/797715822185414676/kartinka.jpg"},
								{url: "masturbation", label: "MASTURBATION", img: "https://cdn.discordapp.com/attachments/797716051814645770/797716203279482930/kartinka.png"},
								{url: "public", label: "PUBLIC", img: "https://cdn.discordapp.com/attachments/797717422924759110/797717945374867466/kartinka.jpg"},
								{url: "ero", label: "ERO", img: "https://media.discordapp.net/attachments/527959391446761473/630451849123856422/image0.jpg"},
								{url: "orgy", label: "ORGY", img: "https://media.discordapp.net/attachments/531827568966631425/580662785529348128/74264039_p0_master1200.png"},
								{url: "elves", label: "ELVES", img: "https://cdn.discordapp.com/attachments/798646952454651945/798648027971584060/kartinka.jpg"},
								{url: "yuri", label: "YURI", img: "https://konachan.com/image/ace02093fba803cd4021b295f69d8777/Konachan.com%20-%20303867%202girls%20black_hair%20blue_eyes%20blush%20bow%20bra%20breasts%20censored%20nipples%20pantyhose%20purple_eyes%20purple_hair%20pussy%20tshangen131%20underwear%20waifu2x%20wet%20yuri.png"},
								{url: "pantsu", label: "PANTSU", img: "https://cdn.discordapp.com/attachments/770948564947304448/770989069110607912/Hentai_nation_2.jpg"},
								{url: "glasses", label: "GLASSES", img: "https://media.discordapp.net/attachments/556959468252954634/638471226087440393/image0.jpg"},
								//{url: "cuckold", label: "CUCKOLD", img: "https://konachan.com/sample/2009598d749a5a111e61d5c65e3c757c/Konachan.com%20-%20317279%20sample.jpg"},
								{url: "blowjob", label: "BLOWJOB", img: "https://cdn.discordapp.com/attachments/797651567121137664/797652579491381288/kartinka.jpg"},
								{url: "boobjob", label: "BOOBJOB", img: "https://cdn.discordapp.com/attachments/797652668977250324/797653787652653076/kartinka.jpg"},
								{url: "thighs", label: "THIGHS", img: "https://media.discordapp.net/attachments/562434823222722560/732490108556673104/image0.jpg"},
								//{url: "vagina", label: "VAGINA", img: "https://cdn.discordapp.com/attachments/797717947945713696/797718018037645332/kartinka.png"},
								{url: "ahegao", label: "AHEGAO", img: "https://cdn.discordapp.com/attachments/798594181768675408/798642252921831484/kartinka.jpg"},
								{url: "uniform", label: "UNIFORM", img: "https://media.discordapp.net/attachments/527960044566740992/753708813609205760/Character_Konori_Mii_Tsuchimikado_MotoharuArtist_Mimura_Kaoru174A1236Dd1A71C82513C0C36B19Cca0.jpg"},
								{url: "gangbang", label: "GANGBANG", img: "https://cdn.discordapp.com/attachments/770948564947304448/770988869780635688/3cfbdf1c-d533-4ba9-ab3d-ca49d2ac0b0a.gif"},
								{url: "tentacles", label: "TENTACLES", img: "https://media.discordapp.net/attachments/531827778664923137/745758789713657936/16691138.webp"},
								{url: "gif", label: "GIF", img: "https://media.discordapp.net/attachments/531827568966631425/581689350186860556/MMfgQRb.gif"},
								{url: "nsfwNeko", label: "NSFW NEKO", img: "https://media.discordapp.net/attachments/476921568291848205/633437591756210206/image-2.png"},
								//{url: "nsfwMobileWallpaper", label: "NSFW MOBILE WALLPAPER", img: "https://cdn.discordapp.com/attachments/770948564947304448/771035043568156682/ZNo3wUfy0i8.jpg"},
								{url: "zettaiRyouiki", label: "ZETTAI RYOUIKI", img: "https://konachan.com/image/ddcc4b7734345d2de572ceb8661300a1/Konachan.com%20-%20316653%20aqua_eyes%20blush%20couch%20navel%20original%20skirt%20soyubee%20thighhighs%20wink%20zettai_ryouiki.jpg"},

							]
					}
					
					Tags.sfw.forEach(tag => {
						this.createbuttons(tag.label, tag.img, "sfw").addEventListener("click", () => {
							this.send(nekourl + tag.url, false, false)
						});
					});
					
					if(this.settings.nsfwswitch){
						document.getElementById("NekosButtons").insertAdjacentHTML('beforeEnd', `
															<details open><summary>NSFW :</summary><div id="nsfw" class="plugin-inputs collapsible" style="display: grid; height: 100%; width: 100%; grid-template-columns: auto auto auto auto auto; grid-gap: 5px; margin-top: 22px">
															`)
						Tags.nsfw.forEach(tag => {
							this.createbuttons(tag.label, tag.img, "nsfw").addEventListener("click", () => {
								this.send(nsfw + tag.url, this.settings.spoiler, true)
							});
						});
					}
				})
			}

			send(requestURL, spoiler, nsfwornot){
				
				request(requestURL, {json: true}, (error, res, body) => {
					if (error) {
						return log(error, "err")
					};
					if (!error && res.statusCode == 200) {
						let channelID = BdApi.findModuleByProps("getLastSelectedChannelId").getChannelId();
						let url = ''
						if(nsfwornot == true) url = body.url;
						if(nsfwornot == false) url = res.body.data.response.url;
						log(url, "log")
						let filename = url.split("/")
						filename = filename[filename.length - 1]
						if(this.settings.preview){
							const html = `<div class="layerContainer-2v_Sit" id="nekospreviewpanel">
							<div class="layer-1Ixpg3">
							<div class="backdrop-2ByYRN withLayer-2VVmpp" style="opacity: 0.85; background: hsl(0, calc(var(--saturation-factor, 1) * 0%), 0%);" id="nekosdotlife_backdrop"></div>
								<div class="focusLock-2tveLW" role="dialog" aria-labelledby="uid_714" tabindex="-1" aria-modal="true">
									<div class="root-g14mjS small-23Atuv fullscreenOnMobile-ixj0e3" style="opacity: 1; transform: scale(1); width: 720px;">
										<div class="flex-2S1XBF flex-3BkGQD horizontal-112GEH horizontal-1Piu5- flex-3BkGQD directionRow-2Iu2A9 justifyStart-2Mwniq alignCenter-14kD11 noWrap-hBpHBz header-1zd7se" id="uid_714" style="flex: 0 0 auto;">
											<h2 class="wrapper-1HSdhi fontDisplay-3Gtuks base-21yXnu size20-9iTTnl" style="color:white;font-size:24px">${filename}</h2>
										</div>
										<div class="content-2hZxGK content-26qlhD thin-31rlnD scrollerBase-_bVAAt" dir="ltr" style="overflow: hidden scroll; padding-right: 8px;">
											<div class="markdown-19oyJN">
												<div class="paragraph-9M861H" id='previewImage' style="height: 500px; display: flex; justify-content: center; align-items: center">
													<img src="${url}" style="max-width: 100%; max-height: 100%"></img>
												</div>
											</div>
											<div aria-hidden="true" style="position: absolute; pointer-events: none; min-height: 0px; min-width: 1px; flex: 0 0 auto; height: 20px;"></div>
										</div>
										<div id="ChoiceButton" class="flex-2S1XBF flex-3BkGQD horizontalReverse-60Katr horizontalReverse-2QssvL flex-3BkGQD directionRowReverse-HZatnx justifyStart-2Mwniq alignStretch-Uwowzr noWrap-hBpHBz footer-31IekZ" style="display: grid; grid-template-columns: auto auto auto; justify-content: center; grid-gap: 10px">
										
										</div>
									</div>
									
								</div>
							</div>
						</div>
						`;//width: 500px; height:500px;position: relative; display:inline-block; overflow: hidden; margin:0
							document.querySelector("#app-mount").insertAdjacentHTML('beforeEnd', html);
							const cancel = DOMTools.createElement(`<button type="submit" class="button-f2h6uQ lookFilled-yCfaCM colorRed-rQXKgM sizeMedium-2bFIHr grow-2sR_-F"><div class="contents-3ca1mk">Cancel sending</div></button>`)
							document.getElementById("ChoiceButton").append(cancel)
							cancel.addEventListener("click", () => {
								document.getElementById("nekospreviewpanel").remove()
							})

							const imageChange = DOMTools.createElement(`<button type="submit" class="button-f2h6uQ lookFilled-yCfaCM colorBrand-I6CyqQ sizeMedium-2bFIHr grow-2sR_-F"><div class="contents-3ca1mk">Find a new image of the same category</div></button>`)
							document.getElementById("ChoiceButton").append(imageChange)
							imageChange.addEventListener("click", () => {
								document.getElementById("nekospreviewpanel").remove()
								this.send(requestURL, spoiler, nsfwornot)
							})

							const send = DOMTools.createElement(`<button type="submit" class="button-f2h6uQ lookFilled-yCfaCM colorGreen-3y-Z79 sizeMedium-2bFIHr grow-2sR_-F"><div class="contents-3ca1mk">Send this image</div></button>`)
							document.getElementById("ChoiceButton").append(send)
							send.addEventListener("click", () => {
								document.getElementById("nekospreviewpanel").remove()
								SendBlob(url, (data) => {
									//log(data, "log")
									BdApi.findModuleByProps("upload", "instantBatchUpload").upload({
										channelId: channelID,
										file: dataURLtoFile(data, filename),
										draftType: 0,
										message: {
											"channelId": channelID,
											"content": "",
											"tts": false,
											"invalidEmojis": [],
											"validNonShortcutEmojis": []
										},
										hasSpoiler: spoiler,
										filename: filename,
									})
									if(this.settings.quit_after_send){
										document.getElementById("nekossendpanel").remove()
									}
								})
							})
						}
						
					};
				})
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