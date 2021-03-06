describe("Popover", function() {
	beforeEach(function() {
    loadFixtures('fixture1.html');	  
	});
	
	afterEach(function() {
	  $('.popover').remove();
		$(document).unbind('keydown');
	});

	describe("options", function() {
		
	  it("can set the popover id", function() {
    	$('#middle').popover({header: '#header2', content: '#content2', id: 'middle-popover'});
			expect($('#middle-popover')).toExist();
			expect($('#middle-popover')).toBeHidden();
	  });

	  it("popover id is optional", function() {
    	$('#middle').popover({header: '#header2', content: '#content2'});
			$('#middle').click();	
			expect($('.popover')).toBeVisible();			
	  });
	
		it("will open popover with correct header", function() {
    	$('#middle').popover({header: '#header2', content: '#content2', id: 'middle-popover'});
			$('#middle').click();
			expect($('#header2', '#middle-popover')).toExist();
			expect($('#header2', '#middle-popover')).toHaveHtml('Popover header 2');
		});	
	
		it("will open popover with correct content", function() {
    	$('#middle').popover({header: '#header2', content: '#content2', id: 'middle-popover'});
			$('#middle').click();
			expect($('#content2', '#middle-popover')).toExist();
			expect($('#content2', '#middle-popover')).toHaveHtml('Popover content 2');
		});
			
		it("can set openEvent callback function", function() {
			var counter = 1;
    	$('#middle').popover({header: '#header2', content: '#content2', 
								id: 'middle-popover', openEvent: function() { counter++; }});
			$('#middle').click();
			expect(counter).toEqual(2);
		});	
	
		it("can set openClose callback function", function() {
			var counter = 1;
    	$('#middle').popover({header: '#header2', content: '#content2', 
								id: 'middle-popover', closeEvent: function() { counter++; }});
			$('#middle').click();
			$('#middle').trigger('hidePopover');
			expect(counter).toEqual(2);
		});	
	
	  it("enable closing popover with Escape key by default", function() {
    	$('#middle').popover({header: '#header2', content: '#content2', id: 'middle-popover'});
			$('#middle').click();
			expect($('#middle-popover')).toBeVisible();
			
			var e = jQuery.Event("keydown");
			e.keyCode = 27;
			$(document).trigger(e);
			
			expect($('#middle-popover')).toBeHidden();
	  });	

	  it("can disable closing popover with Escape key", function() {
    	$('#middle').popover({header: '#header2', content: '#content2', 
								id: 'middle-popover', closeOnEsc: false});
			$('#middle').click();
			expect($('#middle-popover')).toBeVisible();
			
			var e = jQuery.Event("keydown");
			e.keyCode = 27;
			$(document).trigger(e);
			
			expect($('#middle-popover')).toBeVisible();
	  });
	

	  it("closing popover with Escape key should be per popover", function() {
			// first popover does close with Esc key the second does not
	    $('#topleft').popover({header: '#header', content: '#content', id: 'top-left-popover'});
	  	$('#middle').popover({header: '#header2', content: '#content2', 
					id: 'middle-popover', closeOnEsc: false});
			$('#middle').click();
			expect($('#middle-popover')).toBeVisible();
		
			var e = jQuery.Event("keydown");
			e.keyCode = 27;
			$(document).trigger(e);
		
			expect($('#middle-popover')).toBeVisible();
	  });	
	
		it("can set popover offsetX", function() {
    	$('#middle').popover({header: '#header2', content: '#content2', 
								id: 'middle-popover'});
			$('#middle').click();
			var offset = $('#middle-popover').offset();

			// now clear created propover and rebuild again with offset to compare
		  $('.popover').remove();
		  loadFixtures('fixture1.html');
			
    	$('#middle').popover({header: '#header2', content: '#content2', 
								id: 'middle-popover', offsetX: 10});
			$('#middle').click();
			var offset2 = $('#middle-popover').offset();
			expect(offset2.left).toEqual(offset.left + 10);
		});	
	
		it("can set popover offsetY", function() {
    	$('#middle').popover({header: '#header2', content: '#content2', 
								id: 'middle-popover'});
			$('#middle').click();
			var offset = $('#middle-popover').offset();

			// now clear created propover and rebuild again with offset to compare
		  $('.popover').remove();
		  loadFixtures('fixture1.html');
			
    	$('#middle').popover({header: '#header2', content: '#content2', 
								id: 'middle-popover', offsetY: -10});
			$('#middle').click();
			var offset2 = $('#middle-popover').offset();
			expect(offset2.top).toEqual(offset.top - 10);
		});	
	
		it("can set popover z-index", function() {
    	$('#middle').popover({header: '#header2', content: '#content2', 
								id: 'middle-popover', zindex: 999});
			$('#middle').click();
			expect($('#middle-popover').css('z-index')).toEqual('999');
		});
		
		it("can limit popover directions to bottom", function() {
    	$('#middle').popover({header: '#header2', content: '#content2', 
						id: 'middle-popover', preventLeft: true, preventRight: true, preventTop: true});
			$('#middle').click();
			expect($('.triangle', '#middle-popover')).toHaveClass('bottom');
		});		

		it("can limit popover directions to left", function() {
    	$('#middle').popover({header: '#header2', content: '#content2', 
						id: 'middle-popover', preventBottom: true, preventRight: true, preventTop: true});
			$('#middle').click();
			expect($('.triangle', '#middle-popover')).toHaveClass('left');
		});


		it("can limit popover directions to right", function() {
    	$('#middle').popover({header: '#header2', content: '#content2', 
						id: 'middle-popover', preventBottom: true, preventLeft: true, preventTop: true});
			$('#middle').click();
			expect($('.triangle', '#middle-popover')).toHaveClass('right');
		});
		
		it("can limit popover directions to top", function() {
    	$('#middle').popover({header: '#header2', content: '#content2', 
						id: 'middle-popover', preventBottom: true, preventRight: true, preventLeft: true});
			$('#middle').click();
			expect($('.triangle', '#middle-popover')).toHaveClass('top');
		});
	});
	
	describe("direction algorithm", function() {
		
		it("takes into account top left corner", function() {
	    $('#topleft').popover({header: '#header', content: '#content', id: 'top-left-popover'});
			$('#topleft').click();
			expect($('.triangle', '#top-left-popover')).not.toHaveClass('top');
			expect($('.triangle', '#top-left-popover')).not.toHaveClass('left');
		});

		it("takes into account top right corner", function() {
	    $('#topright').popover({header: '#header', content: '#content', id: 'top-right-popover'});
			$('#topright').click();
			expect($('.triangle', '#top-right-popover')).not.toHaveClass('top');
			expect($('.triangle', '#top-right-popover')).not.toHaveClass('right');
		});

		it("takes into account bottom left corner", function() {
	    $('#bottomleft').popover({header: '#header', content: '#content', id: 'bottom-left-popover'});
			$('#bottomleft').click();
			expect($('.triangle', '#bottom-left-popover')).not.toHaveClass('bottom');
			expect($('.triangle', '#bottom-left-popover')).not.toHaveClass('left');
		});
		
		it("takes into account bottom right corner", function() {
	    $('#bottomright').popover({header: '#header', content: '#content', id: 'bottom-right-popover'});
			$('#bottomright').click();
			expect($('.triangle', '#bottom-right-popover')).not.toHaveClass('bottom');
			expect($('.triangle', '#bottom-right-popover')).not.toHaveClass('right');
		});
		
		it("takes into account left window limits & direction options", function() {
	    $('#middle').popover({header: '#header2', content: '#content2', 
					id: 'middle-popover', preventLeft: true, preventRight: true});
			$('#middle').click();					
			expect($('.triangle', '#middle-popover')).not.toHaveClass('left');
			expect($('.triangle', '#middle-popover')).not.toHaveClass('right');
		});	

		it("takes into account general window limits & direction options", function() {
	    $('#middleleft').popover({header: '#header3', content: '#content3', 
					id: 'middle-left-popover', preventTop: true});
			$('#middleleft').click();					
			expect($('.triangle', '#middle-left-popover')).not.toHaveClass('left');
			expect($('.triangle', '#middle-left-popover')).not.toHaveClass('top');
		});
		
		it("takes into account right window limits & direction options", function() {
	    $('#middleright').popover({header: '#header4', content: '#content4', 
					id: 'middle-right-popover', preventBottom: true});
			$('#middleright').click();					
			expect($('.triangle', '#middle-right-popover')).not.toHaveClass('bottom');
			expect($('.triangle', '#middle-right-popover')).not.toHaveClass('right');
		});		
		
	});	
	
	
	describe("events", function() {

		it("clicking button toggles popover", function() {
	    $('.box').popover({header: '#header5', content: '#content5', id: 'box-popover'});
			$('#box1').click();
			expect($('#box-popover')).toBeVisible();
			$('#box1').click();
			expect($('#box-popover')).toBeHidden();			
			$('#box1').click();
			expect($('#box-popover')).toBeVisible();
		});

		it("can open popover with 'showPopover' button event", function() {
    	$('#middle').popover({header: '#header2', content: '#content2', id: 'middle-popover'});
			$('#middle').trigger('showPopover');
			expect($('#middle-popover')).toBeVisible();			
		});

		it("can close popover with 'hidePopover' button event", function() {
    	$('#middle').popover({header: '#header2', content: '#content2', id: 'middle-popover'});
			$('#middle').click();
			$('#middle').trigger('hidePopover');
			expect($('#middle-popover')).toBeHidden();			
		});

		it("can close popover with 'hidePopover' document event", function() {
    	$('#middle').popover({header: '#header2', content: '#content2', id: 'middle-popover'});
			$('#middle').click();
			$(document).trigger('hideOpenPopover');
			expect($('#middle-popover')).toBeHidden();			
		});
		
		it("opening a popover fires the document 'popoverOpened' event", function() {
    	$('#middle').popover({header: '#header2', content: '#content2', id: 'middle-popover'});
			spyOnEvent($(document), 'popoverOpened');
			$('#middle').click();
			expect('popoverOpened').toHaveBeenTriggeredOn($(document));
		});

		it("closing a popover fires the document 'popoverClosed' event", function() {
    	$('#middle').popover({header: '#header2', content: '#content2', id: 'middle-popover'});
			spyOnEvent($(document), 'popoverClosed');
			$('#middle').click();
			$('#middle').trigger('hidePopover');			
			expect('popoverClosed').toHaveBeenTriggeredOn($(document));
		});
		
	});
	
	
	describe("advanced", function() {

		it("multiple buttons can open the same popover", function() {
	    $('#topleft, #topright, #bottomleft, #bottomright').popover({header: '#header', content: '#content', id: 'corner-popover'});
			expect($('#corner-popover')).toBeHidden();
			$('#topleft').click();
			expect($('#corner-popover')).toBeVisible();			
			$('#topright').click();
			expect($('#corner-popover')).toBeVisible();
			$('#bottomright').click();
			expect($('#corner-popover')).toBeVisible();
			$('#bottomleft').click();
			expect($('#corner-popover')).toBeVisible();
		});
	  
		it("clicking sequential buttons opens & closes popovers", function() {
	    $('#middle').popover({header: '#header2', content: '#content2', id: 'middle-popover', preventLeft: true, preventRight: true});
	    $('#middleleft').popover({header: '#header3', content: '#content3', id: 'middle-left-popover', preventTop: true});
	    $('#middleright').popover({header: '#header4', content: '#content4', id: 'middle-right-popover', preventBottom: true});
 			$('#middle').click();
			expect($('#middle-popover')).toBeVisible();		
 			$('#middleleft').click();
			expect($('#middle-popover')).toBeHidden();
			expect($('#middle-left-popover')).toBeVisible();	
 			$('#middleright').click();
			expect($('#middle-left-popover')).toBeHidden();
			expect($('#middle-right-popover')).toBeVisible();	
		});
		
		it("supports popover on dynamically created buttons", function() {
			$('.box').popover({header: '#header5', content: '#content5', id: 'box-popover', live: true});
			$('#box1').click();
			expect($('#box-popover')).toBeVisible();
			$('#box1').click();
			expect($('#box-popover')).toBeHidden();
			$('body').append($("<div class='test-but box' id='box2'>Click me</div>"));
			$('#box2').click();
			expect($('#box-popover')).toBeVisible();
			
			var e = jQuery.Event("keydown");
			e.keyCode = 27;
			$(document).trigger(e);
			expect($('#box-popover')).toBeHidden();
			
			this.after(function() { $('#box2').remove(); });
		});
		
	});	

});