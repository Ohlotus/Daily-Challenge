
sizmek_Html5Template_970x250 = function() {
	// Hiding images and will be unhide when all assets are loaded
    $('.stage-images,.stage-copy').css({opacity:0});
    // Establish Method Name
    this.name = 'DCO Html5 Template';
    // Establish Script Details
    this.script = { name: 'sizmek_DCOHtml5_Template_970x250.js', version: '2.0.0' };
	// Call Init Method
    adkit.onReady(this.init.bind(this));

};


sizmek_Html5Template_970x250.prototype = {

    // Function That Creates Element Var
    d: function(id) { return document.getElementById(id); },

    // Initialize DCO HTML5 template
    init: function() {
    	// Handle Feature Tracking
		this.trackAdFeatures('impression', 'Apple_Store_Template_0005');
        // initializing all variables 
        // First check the values from the config.js file and then check the default values

        this.image_1 = adkit.getSVData("Img1");
		this.image_2 = adkit.getSVData("Img2");
        this.image_3 = adkit.getSVData("Img3");
        this.headline = adkit.getSVData("copyHeadline");
        this.copy_1 = adkit.getSVData("copyFrame1");
        this.copy_2 = adkit.getSVData("copyFrame2");
        this.copy_3 = adkit.getSVData("copyFrame3");
		this.copy_button = adkit.getSVData("copyButton");
        this.Standalone = adkit.getSVData("Standalone");
		this.headline_width = adkit.getSVData("widthHeadline");
		this.copy1_width = adkit.getSVData("widthFrame1");
		this.copy2_width = adkit.getSVData("widthFrame2");
		this.copy3_width = adkit.getSVData("widthFrame3");
		this.button_width = adkit.getSVData("widthButton");
		this.button_top = adkit.getSVData("topButton");
		this.button_left = adkit.getSVData("leftButton");
		this.cta_top = adkit.getSVData("topCTA");
		this.cta_left = adkit.getSVData("leftCTA");
        
        this.Standalone = adkit.getSVData("Standalone");

        //Checking Standalone Status
        //If the value of standalone is fale then Set Elements and Start Animation
        if (this.Standalone == "false") {
            this.SetVariables();
            this.bannerAnimation();
            // Establish Reference to this
            var me = this;
            // Handle Ad Setup
            $("#main").click(function() { me.setUpAd(); });
        }

        //If standalone is true then hide everything and display a Static Image
        if (this.Standalone == "true") {
            /*
            $('#main').prepend('<img id="theImg" src="images/standalone.jpg" />')
            $("#ctaBtn").hide();
            $("#logo").hide();
            $("#images").hide();
            $("#headlineText").hide();
            */
        }
    },
    
    // DO NOT REMOVE THE FOLLOWING 
    // Track Ad Features - accepts interaction name and impression type
    trackAdFeatures: function(_interaction, _noun) { 
    	// Establish var to track local mode
    	var isServed;
    	// Verify ad is not local
    	try { isServed = EB._isServingMode(); } catch (err) {};
    	
		if (isServed) { 
			try {			 
				// Grab Ad ID
				var adId = EB._adConfig.adId;
				// Grab Session ID
				var sId = EB._adConfig.sID; 
				// Build Tracking Pixel
				var trackingPixel = "https://bs.serving-sys.com/BurstingPipe/adServer.bs?cn=tf&c=19&mc=imp&pli=16479316&PluID=0&ord=%time%&rtu=-1&pcp=$$sID=" + sId + "|adID=" + adId + "|interactionName=" + _interaction + "|noun=" + _noun + "$$"; 
				// Fire Tracking Pixel by creating a new image.
				new Image().src = trackingPixel; 
				
			}  catch (err) {}
		}
    }, 

    // Function that Sets Elements  
    SetVariables: function() {
       // alert(this.image_1);
        // Setting Elements
        $(".image-1").attr('src',this.image_1);
        $(".image-2").attr('src',this.image_2);
        $(".image-3").attr('src',this.image_3);

		
		//displaying images when image load is completed
		//$('#introImg').attr('src',  this.image).load(function() { $('#introImg').show(); });
		//$('#Img1').attr('src', this.logo).load(function() { $('#Img1').show(); });
		
        $(".headline-copy").text(this.headline);
        $(".copy-1").text(this.copy_1);
        $(".copy-2").text(this.copy_2);
        $(".copy-3").text(this.copy_3);
		$(".button-copy").text(this.copy_button);
		$(".headline-copy").css('max-width', this.headline_width);
		$(".copy-1").css('max-width', this.copy1_width);
		$(".copy-2").css('max-width', this.copy2_width);
		$(".copy-3").css('max-width', this.copy3_width);
		$(".button").css('width', this.button_width);
		$(".button").css('top', this.button_top);
		$(".button").css('left', this.button_left);
		$(".button-copy").css('top', this.cta_top);
		$(".button-copy").css('left', this.cta_left);
        

        //Add Border if 'border=true'
        if (this.border == "true") {
            $("#mainContainer").css('box-sizing', 'border-box');
            $("#mainContainer").css('-moz-box-sizing', 'border-box');
            $("#mainContainer").css('-webkit-box-sizing', 'border-box');
            $("#mainContainer").css('border', '1px solid #000');
        }
    },

    // Handle Animation
    bannerAnimation: function() {

        //Starting image Animation
        $('.stage-images,.stage-copy').animate({opacity:1},1000);


        //images animation:
        var imageSelect = 1;
        var locationAni = setTimeout(function(){

            $(".image-1").animate({opacity:0},1000);
            $(".image-2").delay(4000).animate({opacity:0},1000);
            $(".copy-1").animate({opacity:0},750);
            $(".copy-2").delay(750).animate({opacity:1},750);
            $(".copy-2").delay(2500).animate({opacity:0},750);
            $(".copy-3").delay(5000).animate({opacity:1},750);
            $(".button").delay(6000).animate({opacity:1},1000);
			$(".button-copy").delay(6000).animate({opacity:1},1000);

        },3000);


    },

    //Calculating button text width in pixels
    textWidth: function(text) {
        var calc = '<span style="display:none">' + text + '</span>';
        $('body').append(calc);
        var width = $('body').find('span:last').width();
        $('body').find('span:last').remove();
        return width;
    },

    // Handle Ad Setup
    setUpAd: function() {
        // Ad Clickthrough Button
        EB.clickthrough();
    },

};