'use strict';

const Joi = require('joi');
const Paginator = require('paginator');
const { QueryTypes } = require('sequelize');

const Models = require('../../db/models');
const Land = Models.Land;
const User = Models.User;
const Validator = require('../utils/validator');


class LandAdminController {
  findAll(req, res, next) {
    let options = {
      page: req.query.page || 1,
      paginate: req.query.limit || 10,
    };

    Land.paginate(options)
      .then(function(data) {
        let paginator = new Paginator(options.paginate, 5).build(
          data.total,
          options.page
        );
        data.current_page = paginator.current_page;
        data.next_page = paginator.next_page;
        data.previous_page = paginator.previous_page;
        data.has_previous_page = paginator.has_previous_page;
        data.has_next_page = paginator.has_next_page;
        res.render('land/index', { paginator: data });
      })
      .catch(function(err) {
        next(err);
      });
  }

  save(req, res) {
    var land = req.land;
    var data = req.body;
    
    const validationSchema = {
        name: Joi.string().required(),
        level: Joi.string().required(),
        plots_count: Joi.number()
            .integer()
            .required(),
        area_size: Joi.number()
            .required(),
        area_type: Joi.string().required(),
        use_type: Joi.string().required(),
        location: Joi.string().required(),
        entity: Joi.string().required(),
        acquisition_type: Joi.string().required(),
        year_acquisition: Joi.number()
            .integer()
            .required(),
        year_estab: Joi.number()
            .integer()
            .required(),
        ownership: Joi.string().required(),
        status: Joi.string().required(),
        reason_conservation: Joi.string().required(),
        notes:Joi.string().required(),
        know_owner: Joi.boolean().required(),
        are_u_owner: Joi.boolean().required(),
        catastro_number:Joi.number()
            .integer()
            .required(),
        owner_name: Joi.string().required(),
        owner_email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        owner_phone: Joi.string().required(),
        inheritance_land: Joi.boolean().required(),
        inheritance_agree: Joi.boolean().required(),
        lands_problem: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string()),
        lands_other_problem: Joi.string().allow(null, ''),
        has_mortgage: Joi.boolean().required(),
        has_surveying: Joi.boolean().required(),
        lands_main_uses: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string()),
        lands_other_main_uses: Joi.string().allow(null, ''),
        lands_structures: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string()),
        lands_other_structures: Joi.string().allow(null, ''),
        lands_attributes: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string()),
        lands_other_attributes: Joi.string().allow(null, ''),
        has_contamination: Joi.boolean().required(),
        wich_use:Joi.string().required(),
        importance_of_knowing:Joi.string().required(),
    };

    // Validata data.
    const result = Joi.validate(data, validationSchema, {
      abortEarly: false,
      allowUnknown: true,
    });

    if (result.error) {
      // Add error flash messages.
      req.flash('field_errors', Validator.getErrors(result.error.details));
      return res.redirect('/admin/land/' + (land.isNewRecord ? '-1' : land.id));
    }
    
    const cleaned_data = result.value;

    land.name = cleaned_data.name;
    land.level = cleaned_data.level;
    if(req.file){
        var nuevaCadena = (req.file.path).replace("public","")
        land.photograph = nuevaCadena; 
    }
    
    land.location = cleaned_data.location;
    
    if(cleaned_data.lands_attributes instanceof Array ){
        land.main_attributes = cleaned_data.lands_attributes;
    }else{
        if(cleaned_data.lands_attributes === null | cleaned_data.lands_attributes == null){
            land.main_attributes = new Array();
        }else{
            land.main_attributes = new Array(cleaned_data.lands_attributes);
        }
    }    
    
    land.other_main_attributes = cleaned_data.lands_other_attributes;
    
    if(cleaned_data.lands_main_uses instanceof Array ){
        land.main_uses = cleaned_data.lands_main_uses;
    }else{
        if(cleaned_data.lands_main_uses === null | cleaned_data.lands_main_uses == null){
            land.main_uses = new Array();
        }else{
            land.main_uses = new Array(cleaned_data.lands_main_uses);
        }
    }    
    
    land.other_main_uses = cleaned_data.lands_other_main_uses;
    
    if(! cleaned_data.lands_problem instanceof Array ){
        if(cleaned_data.lands_problem === null | cleaned_data.lands_problem == null){
            cleaned_data.lands_problem = new Array();  
        }else{
            cleaned_data.lands_problem = new Array(cleaned_data.lands_problem); 
        }
    }
    if(!cleaned_data.lands_main_uses instanceof Array ){
        if(cleaned_data.lands_main_uses === null | cleaned_data.lands_main_uses == null ){
            cleaned_data.lands_main_uses = new Array();  
        }else{
            cleaned_data.lands_main_uses = new Array(cleaned_data.lands_main_uses);  
        }
    }    
    if(!cleaned_data.lands_structures instanceof Array ){
        if(cleaned_data.lands_structures === null | cleaned_data.lands_structures == null){
            cleaned_data.lands_structures = new Array();  
        }else{
            cleaned_data.lands_structures = new Array(cleaned_data.lands_structures);  
        }
    }    
    if(!cleaned_data.lands_attributes instanceof Array ){
        if(cleaned_data.lands_attributes === null | cleaned_data.lands_attributes == null){
            cleaned_data.lands_attributes = new Array();  
        }else{
            cleaned_data.lands_attributes = new Array(cleaned_data.lands_attributes);  
        }
    }    
    
    land.metadata = {
        are_u_owner: cleaned_data.are_u_owner,
        catastro_number: cleaned_data.catastro_number,
        owner_name: cleaned_data.owner_name,
        owner_email: cleaned_data.owner_email,
        owner_phone: cleaned_data.owner_phone,
        inheritance_land: cleaned_data.inheritance_land,
        inheritance_agree: cleaned_data.inheritance_agree,
        lands_problem: cleaned_data.lands_problem,
        lands_other_problem: cleaned_data.lands_other_problem,
        has_mortgage: cleaned_data.has_mortgage,
        has_surveying: cleaned_data.has_surveying,
        lands_main_uses: cleaned_data.lands_main_uses,
        lands_other_main_uses: cleaned_data.lands_other_main_uses,
        lands_structures: cleaned_data.lands_structures,
        lands_other_structures: cleaned_data.lands_other_structures,
        lands_attributes: cleaned_data.lands_attributes,
        lands_other_attributes: cleaned_data.lands_other_attributes,
        has_contamination: cleaned_data.has_contamination,
        wich_use: cleaned_data.wich_use,
        importance_of_knowing: cleaned_data.importance_of_knowing,
        know_owner: cleaned_data.know_owner,
    };
    
    land.plots_count = cleaned_data.plots_count;
    land.area_size = cleaned_data.area_size;
    land.area_type = cleaned_data.area_type;    
    land.entity = cleaned_data.entity;
    land.use_type = cleaned_data.use_type;
    land.acquisition_type = cleaned_data.acquisition_type;
    land.year_estab = cleaned_data.year_estab;
    land.year_acquisition = cleaned_data.year_acquisition;
    land.reason_conservation = cleaned_data.reason_conservation;
    land.ownership = cleaned_data.ownership;         
    land.notes = cleaned_data.notes;         
    land.status = cleaned_data.status;
    land.user_id = req.user.id;
    
    land
      .save()
      .then(function() {
        if(req.land.id){            
            console.log("ESTE ES EL USUARIO: "+req.land.user_id.email);
            User.findOne({
                where: {
                  id: req.land.user_id
                }
            }).then(function(USER_LAND) {
                console.log("EXISTE: "+USER_LAND.first_name)
                if( cleaned_data.status == 'approved' ){
                    const auth = {
                      auth: {
                        api_key: process.env.MAILGUN_API_KEY,
                        domain: process.env.MAILGUN_DOMAIN,
                      },
                    };
                    var transporter = nodemailer.createTransport(MailGun(auth));
                    // variables para email
                    const sitio = process.env.SERVER_URL + '/land/'+land.id;
                    const contacto = process.env.SERVER_URL +'/contact-us'
                    const html = TemplateEngine.render(
                      'template_email/land_approved_email.html',
                      { site: sitio,contact: contacto }
                    );

                    const mailOptions = {
                      from: process.env.DEFAULT_EMAIL_FROM, // sender address
                      to: USER_LAND.email, // list of receivers
                      subject: '¡Felicidades! Tu propuesta está lista. ¡Riega la voz!', // Subject line
                      html: html,
                    };
                    transporter.sendMail(mailOptions, function(err, info) {
                      console.log(err, info);
                    });
                    res.send('');
            
                }else if( cleaned_data.status == 'denied' ){
                      const auth = {
                        auth: {
                          api_key: process.env.MAILGUN_API_KEY,
                          domain: process.env.MAILGUN_DOMAIN,
                        },
                      };
                      var transporter = nodemailer.createTransport(MailGun(auth));
                      // variables para email
                      const sitio = process.env.SERVER_URL + '/reset-password/';
                      const contacto = process.env.SERVER_URL +'/contact-us'
                      const html = TemplateEngine.render(
                        'template_email/recovery_password_email.html',
                        { site: sitio, notes: req.land.notes, contact: contacto }
                      );

                      const mailOptions = {
                        from: process.env.DEFAULT_EMAIL_FROM, // sender address
                        to: USER_LAND.email, // list of receivers
                        subject: 'Tenemos buenas y malas noticias', // Subject line
                        html: html,
                      };
                      transporter.sendMail(mailOptions, function(err, info) {
                        console.log(err, info);
                      });
                      res.send('');
                }
                
              })
              .catch(function(err) {
                console.log("ERROR: "+JSON.stringify(err))
                
              });
        }        
          
        req.flash('success', 'Your data has been saved.');
      })
      .catch(function(err) {
        req.flash('error', err.message);
        console.log("error:" +err.message);
      })
      .finally(function() {
        res.redirect('/admin/land/' + land.id);
      });
        
  }

  get(req, res) {
    let land = req.land.get({ plain: true });
    res.render('land/form', { object: land });
  }

  remove(req, res, next) {
    var land = req.land;

    land
      .destroy()
      .then(function() {
        res.redirect('/admin/land');
      })
      .catch(function(err) {
        next(err);
      });
  }
}

module.exports = new LandAdminController();
