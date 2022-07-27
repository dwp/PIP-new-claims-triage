const express = require('express')
const router = express.Router()


// Start folder specific routes
router.use('/sprint-24-25', require('./views/sprint-24-25/_routes'));
router.use('/sprint-39', require('./views/sprint-39/_routes'));
router.use('/v11', require('./views/v11/case-review/_routes'));
module.exports = router

//v11//*******************************************************************************************************************************************************v10*
///// case selector routes ////
// Start routes for assigning a caseload)
router.post('/v11/case-selector/ready-for-review', (req, res, next) => {
     // redirect to "case-manager-assign" page.
   res.redirect('/v11/case-selector/case-manager-assign')
 })

// route for assigning cases
router.post('/v11/case-selector/case-manager-assign', (req, res, next) => {
       // Checks radio options, if "Add a new caseload" is selected, route to "create-new-case-ready-review" page.
      if (req.session.data['assign-caseload'] == "new-caseload") {
        // redirect to "create-new-case-ready-review" page.
        res.redirect('/v11/case-selector/create-new-case-ready-review')
      } else {
        // redirect to "ready-for-review-success" page.
        res.redirect('/v11/case-selector/ready-for-review-success')
      }
})

// route for reassigning cases
router.post('/v11/case-selector/case-manager-reassign', (req, res, next) => {
       // Checks radio options, if "Add a new caseload" is selected, route to "create-new-case-ready-review" page.
      if (req.session.data['reassign-caseload'] == "new-caseload") {
         // redirect to "create-new-case-ready-review" page.
          res.redirect('/v11/case-selector/create-new-case-in-review')

      } else {
        // stores data value from URL so the prototype knows which case has been selected.
        // Case name stored as variable which displays dynamically on success page.
        const reassignedCaseName = req.session.data.source
        // Reads out data into command line. (good for debugging)
        console.log(1, req.session.data)
        res.redirect('/v11/case-selector/assigned-for-review-success')
      }
})
// route for creating caseload - ready for review
router.post('/v11/case-selector/create-new-case-ready-review', (req, res, next) => {
         // redirect to "create-caseload-success" page.
        res.redirect('/v11/case-selector/create-caseload-ready-review-success')
      }
)
// route for creating caseload - in review
router.post('/v11/case-selector/create-new-case-in-review', (req, res, next) => {
         // redirect to "create-caseload-success" page.
        res.redirect('/v11/case-selector/create-caseload-in-review-success')
      }
)

// Triage route //
router.post('/v11/case-selector/ready-to-make-next-step', function (req, res) {

// Make a variable and give it the value from 'how-many-balls'
var makearecommendation = req.session.data['next-step']

// Check whether the variable matches a condition
if (makearecommendation == "Yes, move case to ready for review"){
 // Send user to decision page
 res.redirect('ready-for-review')
} else {
 // Send user to referral page
 res.redirect('refer-confirm')
}

})

// Referral assessment route //

router.post('/v11/review/ready-to-make-next-step', function (req, res) {

// Make a variable and give it the value from 'how-many-balls'
var makearecommendation = req.session.data['next-step']

// Check whether the variable matches a condition
if (makearecommendation == "Send case for a decision"){
 // Send user to decision page
 res.redirect('decision')
} else {
 // Send user to referral page
 res.redirect('refer')
}

})
/////////////////////// end case selector routes /////////////
// Referral assessment route //

router.post('/v11/case-review/ready-to-make-next-step', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var makearecommendation = req.session.data['next-step']

  // Check whether the variable matches a condition
  if (makearecommendation == "Case is ready for a decision"){
    // Send user to decision page
    res.redirect('decision')
  } else {
    // Send user to referral page
    res.redirect('refer')
  }
})

//Start routes for the 'adding a question' journey (collated questions view)
// this does not work - seperate ones created below
router.post('/v11/case-review/question-link', (req, res, next) => {
    if (req.session.data['question-for']) {
      console.log('is-this-calling-questions', req.session.data)
      const questionBox = req.session.data['question']
      const answerBox = req.session.data['answer']
      const answeredQuestion = req.session.data['answered-question']
      const section = req.session.data.source

      const queriesQuestions = req.session.data.queriesQuestions || []
      queriesQuestions.push({ answerBox, questionBox, answeredQuestion, section })
      req.session.data.queriesQuestions = queriesQuestions

      let href;

      switch (req.session.data['question-for']) {
        case("Unassigned"):
        href = '/v11/case-review/unassigned-questions';
        break;
        case("Claimant"):
        href = '/v11/case-review/questions-claimant';
        break;
        case("Internal medical support"):
        href = '/v11/case-review/questions-internal-medical-support';
        break;
        case("Internal non medical support"):
        href = '/v11/case-review/questions-internal-non-medical-support';
        break;
        case("External health professional"):
        href = '/v11/case-review/questions-external-medical-health-professional';
        break;
      }
      console.log('question-for');
      req.session.data.queriesQuestions[req.session.data.queriesQuestions.length - 1].action = req.session.data['question-for']
      req.session.data.queriesQuestions[req.session.data.queriesQuestions.length - 1].href = href;
      res.redirect('/v11/case-review/summary')

      }
    })

//test to create a preparing food question

router.post('/v11/case-review/question-preparingfood', (req, res, next) => {
    if (req.session.data['question-for']) {
      console.log('is-this-calling-questions', req.session.data)
      const textBox = req.session.data['question']
      const answerBox = req.session.data['answer']
      const answeredQuestion = req.session.data['answered-question']
      const section = req.session.data.source
      const queriesQuestions = req.session.data.queriesQuestions || ['question-for']
      queriesQuestions.push({ answerBox, questionBox, answeredQuestion, section })
      req.session.data.queriesQuestions = queriesQuestions

      let href;      switch (req.session.data['question-for']) {
        case("Unassigned"):
        href = '/v11/case-review/unassigned-questions';
        break;
        case("Claimant"):
        href = '/v11/case-review/questions-claimant';
        break;
        case("Internal medical support"):
        href = '/v11/case-review/questions-internal-medical-support';
        break;
        case("Internal non medical support"):
        href = '/v11/case-review/questions-internal-non-medical-support';
        break;
        case("External health professional"):
        href = '/v11/case-review/questions-external-medical-health-professional';
        break;
      }
      console.log('question-for');
      req.session.data.queriesQuestions[req.session.data.queriesQuestions.length - 1].action = req.session.data['question-for']
      req.session.data.queriesQuestions[req.session.data.queriesQuestions.length - 1].href = href;
      res.redirect('/v11/case-review/summary')

      }
    })

    //end test to create preparing food question


//Start routes for the 'adding a question' journey (collated questions view)
    //Adding a question to unassigned questions
    router.post('/v11/case-review/question-unassigned-add', (req, res, next) => {
        if (req.session.data['question-for-unassigned']) {
          console.log('is-this-calling-questions', req.session.data)
          const questionBox = req.session.data['question']
          const answerBox = req.session.data['answer']
          const answeredQuestion = req.session.data['answered-question']
          const section = req.session.data.source
          const queriesQuestionsUnassigned = req.session.data.queriesQuestionsUnassigned || ['question-for-unassigned']
          queriesQuestionsUnassigned.push({ answerBox, questionBox, answeredQuestion, section })
          req.session.data.queriesQuestionsUnassigned = queriesQuestionsUnassigned

          let href;

          switch (req.session.data['question-for-unassigned']) {
            case("Unassigned"):
            href = '/v11/case-review/unassigned-questions';
            break;
            case("Claimant"):
            href = '/v11/case-review/questions-claimant';
            break;
            case("Internal medical support"):
            href = '/v11/case-review/questions-internal-medical-support';
            break;
            case("Internal non medical support"):
            href = '/v11/case-review/questions-internal-non-medical-support';
            break;
            case("External health professional"):
            href = '/v11/case-review/questions-external-medical-health-professional';
            break;

          }

          req.session.data.queriesQuestionsUnassigned[req.session.data.queriesQuestionsUnassigned.length - 1].action = req.session.data['question-for-unassigned']
          req.session.data.queriesQuestionsUnassigned[req.session.data.queriesQuestionsUnassigned.length - 1].href = href;
          res.redirect('/v11/case-review/unassigned-questions')
          }
        })

//Adding a question to claimant
        router.post('/v11/case-review/question-add', (req, res, next) => {
            if (req.session.data['question-for-claimant']) {
              console.log('is-this-calling-questions', req.session.data)
              const questionBox = req.session.data['question']
              const answerBox = req.session.data['answer']
              const answeredQuestion = req.session.data['answered-question']
              const section = req.session.data.source
              const queriesQuestions = req.session.data.queriesQuestions || ['question-for-claimant']
              queriesQuestions.push({ answerBox, questionBox, answeredQuestion, section })
              req.session.data.queriesQuestions = queriesQuestions

              let href;

              switch (req.session.data['question-for-claimant']) {
                case("Unassigned"):
                href = '/v11/case-review/unassigned-questions';
                break;
                case("Claimant"):
                href = '/v11/case-review/questions-claimant';
                break;
                case("Internal medical support"):
                href = '/v11/case-review/questions-internal-medical-support';
                break;
                case("Internal non medical support"):
                href = '/v11/case-review/questions-internal-non-medical-support';
                break;
                case("External health professional"):
                href = '/v11/case-review/questions-external-medical-health-professional';
                break;
              }

            //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
              req.session.data.queriesQuestions[req.session.data.queriesQuestions.length - 1].action = req.session.data['question-for-claimant']
              //req.session.data.queriesQuestions[req.session.data.queriesQuestions.length - 1].answered = answered;
              req.session.data.queriesQuestions[req.session.data.queriesQuestions.length - 1].href = href;
              res.redirect('/v11/case-review/questions-claimant')
              }
            })





          // Add a question for internal medical support
            router.post('/v11/case-review/question-internal-medical-support-add', (req, res, next) => {
                if (req.session.data['question-for-internal-medical-support']) {
                  console.log('is-this-calling-questions', req.session.data)
                  const questionBox = req.session.data['question']
                  const answerBox = req.session.data['answer']
                  const answeredQuestion = req.session.data['answered-question']
                  const section = req.session.data.source

                  const queriesQuestionsMedSupport = req.session.data.queriesQuestionsMedSupport || []
                  queriesQuestionsMedSupport.push({ answerBox, questionBox, answeredQuestion, section })
                  req.session.data.queriesQuestionsMedSupport = queriesQuestionsMedSupport

                  let href;

                  switch (req.session.data['question-for-internal-medical-support']) {
                    case("Unassigned"):
                    href = '/v11/case-review/unassigned-questions';
                    break;
                    case("Claimant"):
                    href = '/v11/case-review/questions-claimant';
                    break;
                    case("Internal medical support"):
                    href = '/v11/case-review/questions-internal-medical-support';
                    break;
                    case("Internal non medical support"):
                    href = '/v11/case-review/questions-internal-non-medical-support';
                    break;
                    case("External health professional"):
                    href = '/v11/case-review/questions-external-medical-health-professional';
                    break;
                  }

                //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
                  req.session.data.queriesQuestionsMedSupport[req.session.data.queriesQuestionsMedSupport.length - 1].action = req.session.data['question-for-internal-medical-support']
                  req.session.data.queriesQuestionsMedSupport[req.session.data.queriesQuestionsMedSupport.length - 1].href = href;
                  res.redirect('/v11/case-review/questions-internal-medical-support')

                  }
                })

                      // Add a question for internal non medical support
                        router.post('/v11/case-review/question-internal-non-medical-add', (req, res, next) => {
                            if (req.session.data['question-for-non-medical-support']) {
                              console.log('is-this-calling-questions', req.session.data)
                              const questionBox = req.session.data['question']
                              const answerBox = req.session.data['answer']
                              const answeredQuestion = req.session.data['answered-question']
                              const section = req.session.data.source

                              const queriesQuestionsNonMedical = req.session.data.queriesQuestionsNonMedical || []
                              queriesQuestionsNonMedical.push({ answerBox, questionBox, answeredQuestion, section })
                              req.session.data.queriesQuestionsNonMedical = queriesQuestionsNonMedical

                              let href;

                              switch (req.session.data['question-for-non-medical-support']) {
                                case("Unassigned"):
                                href = '/v11/case-review/unassigned-questions';
                                break;
                                case("Claimant"):
                                href = '/v11/case-review/questions-claimant';
                                break;
                                case("Internal medical support"):
                                href = '/v11/case-review/questions-internal-medical-support';
                                break;
                                case("Internal non medical support"):
                                href = '/v11/case-review/questions-internal-non-medical-support';
                                break;
                                case("External health professional"):
                                href = '/v11/case-review/questions-external-medical-health-professional';
                                break;
                                href = '/v11/case-review/questions';
                              }

                            //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
                              req.session.data.queriesQuestionsNonMedical[req.session.data.queriesQuestionsNonMedical.length - 1].action = req.session.data['question-for-non-medical-support']
                              req.session.data.queriesQuestionsNonMedical[req.session.data.queriesQuestionsNonMedical.length - 1].href = href;
                              res.redirect('/v11/case-review/questions-internal-non-medical-support')

                              }
                            })

                            // Add a question for external health professional
                              router.post('/v11/case-review/question-external-medical-add', (req, res, next) => {
                                  if (req.session.data['question-for-external-health-professional']) {
                                    console.log('is-this-calling-questions', req.session.data)
                                    const questionBox = req.session.data['question']
                                    const answerBox = req.session.data['answer']
                                    const answeredQuestion = req.session.data['answered-question']
                                    const section = req.session.data.source

                                    const queriesQuestionsExternalMedical = req.session.data.queriesQuestionsExternalMedical || []
                                    queriesQuestionsExternalMedical.push({ answerBox, questionBox, answeredQuestion, section })
                                    req.session.data.queriesQuestionsExternalMedical = queriesQuestionsExternalMedical

                                    let href;

                                    switch (req.session.data['question-for-external-health-professional']) {
                                      case("Unassigned"):
                                      href = '/v11/case-review/unassigned-questions';
                                      break;
                                      case("Claimant"):
                                      href = '/v11/case-review/questions-claimant';
                                      break;
                                      case("Internal medical support"):
                                      href = '/v11/case-review/questions-internal-medical-support';
                                      break;
                                      case("Internal non medical support"):
                                      href = '/v11/case-review/questions-internal-non-medical-support';
                                      break;
                                      case("External health professional"):
                                      href = '/v11/case-review/questions-external-medical-health-professional';
                                      break;
                                    }

                                  //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
                                    req.session.data.queriesQuestionsExternalMedical[req.session.data.queriesQuestionsExternalMedical.length - 1].action = req.session.data['question-for-external-health-professional']
                                    req.session.data.queriesQuestionsExternalMedical[req.session.data.queriesQuestionsExternalMedical.length - 1].href = href;
                                    res.redirect('/v11/case-review/questions-external-medical-health-professional')

                                    }
                                  })

//Start routes for preparing food: questions
router.post('/v11/case-review/activities/preparing-food', (req, res, next) => {
    if (req.session.data['who-is-question-for-prepfood']) {
      console.log('is-this-calling', req.session.data)
      const textBox = req.session.data['query-content']
      const section = req.session.data.source

      const queriesPrepFood = req.session.data.queriesPrepFood || []
      queriesPrepFood.push({ textBox, section })
      req.session.data.queriesPrepFood = queriesPrepFood

      let href;

      switch (req.session.data['who-is-question-for-prepfood']) {
        case("Unassigned"):
        href = '/v11/case-review/unassigned-questions';
        break;
        case("Claimant"):
        href = '/v11/case-review/questions-claimant';
        break;
        case("Internal medical support"):
        href = '/v11/case-review/questions-internal-medical-support';
        break;
        case("Internal non medical support"):
        href = '/v11/case-review/questions-internal-non-medical-support';
        break;
        case("External health professional"):
        href = '/v11/case-review/questions-external-medical-health-professional';
        break;
      }

        req.session.data.queriesPrepFood[req.session.data.queriesPrepFood.length - 1].action = req.session.data['who-is-question-for-prepfood']
      req.session.data.queriesPrepFood[req.session.data.queriesPrepFood.length - 1].href = href;
      res.redirect('/v11/case-review/activities/preparing-food')
      }
    })


  //Start routes for eating and drinking: questions
    router.post('/v11/case-review/activities/taking-nutrition', (req, res, next) => {
        if (req.session.data['who-is-question-for-eating']) {
          console.log('is-this-calling', req.session.data)
          const textBox = req.session.data['query-content']
          const section = req.session.data.source

          const queriesEatDrink = req.session.data.queriesEatDrink || []
          queriesEatDrink.push({ textBox, section })
          req.session.data.queriesEatDrink = queriesEatDrink

          let href;

          switch (req.session.data['who-is-question-for-eating']) {
            case("Unassigned"):
            href = '/v11/case-review/unassigned-questions';
            break;
            case("Claimant"):
            href = '/v11/case-review/questions-claimant';
            break;
            case("Internal medical support"):
            href = '/v11/case-review/questions-internal-medical-support';
            break;
            case("Internal non medical support"):
            href = '/v11/case-review/questions-internal-non-medical-support';
            break;
            case("External health professional"):
            href = '/v11/case-review/questions-external-medical-health-professional';
            break;
          }

        //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
          req.session.data.queriesEatDrink[req.session.data.queriesEatDrink.length - 1].action = req.session.data['who-is-question-for-eating']
          req.session.data.queriesEatDrink[req.session.data.queriesEatDrink.length - 1].href = href;
          res.redirect('/v11/case-review/activities/taking-nutrition')
          }
        })

        //Start routes for managing treatments: questions
          router.post('/v11/case-review/activities/managing-treatments', (req, res, next) => {
              if (req.session.data['who-is-question-for-treatments']) {
                console.log('is-this-calling', req.session.data)
                const textBox = req.session.data['query-content']
                const section = req.session.data.source

                const queriesTreatments = req.session.data.queriesTreatments || []
                queriesTreatments.push({ textBox, section })
                req.session.data.queriesTreatments = queriesTreatments

                let href;

                switch (req.session.data['who-is-question-for-treatments']) {
                  case("Unassigned"):
                  href = '/v11/case-review/unassigned-questions';
                  break;
                  case("Claimant"):
                  href = '/v11/case-review/questions-claimant';
                  break;
                  case("Internal medical support"):
                  href = '/v11/case-review/questions-internal-medical-support';
                  break;
                  case("Internal non medical support"):
                  href = '/v11/case-review/questions-internal-non-medical-support';
                  break;
                  case("External health professional"):
                  href = '/v11/case-review/questions-external-medical-health-professional';
                  break;

                }

              //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
                req.session.data.queriesTreatments[req.session.data.queriesTreatments.length - 1].action = req.session.data['who-is-question-for-treatments']
                req.session.data.queriesTreatments[req.session.data.queriesTreatments.length - 1].href = href;
                res.redirect('/v11/case-review/activities/managing-treatments')

                }
              })


//Start routes for washing and bathing: questions
router.post('/v11/case-review/activities/washing-and-bathing', (req, res, next) => {
    if (req.session.data['who-is-question-for-washing']) {
      console.log('is-this-calling', req.session.data)
      const textBox = req.session.data['query-content']
      const section = req.session.data.source

      const queriesWashing = req.session.data.queriesWashing || []
      queriesWashing.push({ textBox, section })
      req.session.data.queriesWashing = queriesWashing

      let href;

      switch (req.session.data['who-is-question-for-washing']) {
        case("Unassigned"):
        href = '/v11/case-review/unassigned-questions';
        break;
        case("Claimant"):
        href = '/v11/case-review/questions-claimant';
        break;
        case("Internal medical support"):
        href = '/v11/case-review/questions-internal-medical-support';
        break;
        case("Internal non medical support"):
        href = '/v11/case-review/questions-internal-non-medical-support';
        break;
        case("External health professional"):
        href = '/v11/case-review/questions-external-medical-health-professional';
        break;

      }

    //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
      req.session.data.queriesWashing[req.session.data.queriesWashing.length - 1].action = req.session.data['who-is-question-for-washing']
      req.session.data.queriesWashing[req.session.data.queriesWashing.length - 1].href = href;
      res.redirect('/v11/case-review/activities/washing-and-bathing')

      }
    })


//Start routes for managing toilet needs: questions
  router.post('/v11/case-review/activities/managing-toilet-needs', (req, res, next) => {
      if (req.session.data['who-is-question-for-toilet']) {
        console.log('is-this-calling', req.session.data)
        const textBox = req.session.data['query-content']
        const section = req.session.data.source

        const queriesToilet = req.session.data.queriesToilet || []
        queriesToilet.push({ textBox, section })
        req.session.data.queriesToilet = queriesToilet

        let href;

        switch (req.session.data['who-is-question-for-toilet']) {
          case("Unassigned"):
          href = '/v11/case-review/unassigned-questions';
          break;
          case("Claimant"):
          href = '/v11/case-review/questions-claimant';
          break;
          case("Internal medical support"):
          href = '/v11/case-review/questions-internal-medical-support';
          break;
          case("Internal non medical support"):
          href = '/v11/case-review/questions-internal-non-medical-support';
          break;
          case("External health professional"):
          href = '/v11/case-review/questions-external-medical-health-professional';
          break;

        }

          //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
            req.session.data.queriesToilet[req.session.data.queriesToilet.length - 1].action = req.session.data['who-is-question-for-toilet']
            req.session.data.queriesToilet[req.session.data.queriesToilet.length - 1].href = href;
            res.redirect('/v11/case-review/activities/managing-toilet-needs')

            }
          })

    //Start routes for dressing and undressing: questions
      router.post('/v11/case-review/activities/dressing-and-undressing', (req, res, next) => {
          if (req.session.data['who-is-question-for-dressing']) {
            console.log('is-this-calling', req.session.data)
            const textBox = req.session.data['query-content']
            const section = req.session.data.source

            const queriesDressing = req.session.data.queriesDressing || []
            queriesDressing.push({ textBox, section })
            req.session.data.queriesDressing = queriesDressing

            let href;

            switch (req.session.data['who-is-question-for-dressing']) {
              case("Unassigned"):
              href = '/v11/case-review/unassigned-questions';
              break;
              case("Claimant"):
              href = '/v11/case-review/questions-claimant';
              break;
              case("Internal medical support"):
              href = '/v11/case-review/questions-internal-medical-support';
              break;
              case("Internal non medical support"):
              href = '/v11/case-review/questions-internal-non-medical-support';
              break;
              case("External health professional"):
              href = '/v11/case-review/questions-external-medical-health-professional';
              break;

            }

                //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
                  req.session.data.queriesDressing[req.session.data.queriesDressing.length - 1].action = req.session.data['who-is-question-for-dressing']
                  req.session.data.queriesDressing[req.session.data.queriesDressing.length - 1].href = href;
                  res.redirect('/v11/case-review/activities/dressing-and-undressing')

                  }
                })

          //Start routes for talking and understanding: questions
            router.post('/v11/case-review/activities/communicating-verbally', (req, res, next) => {
                if (req.session.data['who-is-question-for-talking']) {
                  console.log('is-this-calling', req.session.data)
                  const textBox = req.session.data['query-content']
                  const section = req.session.data.source

                  const queriesTalking = req.session.data.queriesTalking || []
                  queriesTalking.push({ textBox, section })
                  req.session.data.queriesTalking = queriesTalking

                  let href;

                  switch (req.session.data['who-is-question-for-talking']) {
                    case("Unassigned"):
                    href = '/v11/case-review/unassigned-questions';
                    break;
                    case("Claimant"):
                    href = '/v11/case-review/questions-claimant';
                    break;
                    case("Internal medical support"):
                    href = '/v11/case-review/questions-internal-medical-support';
                    break;
                    case("Internal non medical support"):
                    href = '/v11/case-review/questions-internal-non-medical-support';
                    break;
                    case("External health professional"):
                    href = '/v11/case-review/questions-external-medical-health-professional';
                    break;

                  }

                //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
                  req.session.data.queriesTalking[req.session.data.queriesTalking.length - 1].action = req.session.data['who-is-question-for-talking']
                  req.session.data.queriesTalking[req.session.data.queriesTalking.length - 1].href = href;
                  res.redirect('/v11/case-review/activities/communicating-verbally')

                  }
                })

          //Start routes for Reading and understanding: questions
            router.post('/v11/case-review/activities/reading-and-understanding', (req, res, next) => {
                if (req.session.data['who-is-question-for-reading']) {
                  console.log('is-this-calling', req.session.data)
                  const textBox = req.session.data['query-content']
                  const section = req.session.data.source

                  const queriesReading = req.session.data.queriesReading || []
                  queriesReading.push({ textBox, section })
                  req.session.data.queriesReading = queriesReading

                  let href;

                  switch (req.session.data['who-is-question-for-reading']) {
                    case("Unassigned"):
                    href = '/v11/case-review/unassigned-questions';
                    break;
                    case("Claimant"):
                    href = '/v11/case-review/questions-claimant';
                    break;
                    case("Internal medical support"):
                    href = '/v11/case-review/questions-internal-medical-support';
                    break;
                    case("Internal non medical support"):
                    href = '/v11/case-review/questions-internal-non-medical-support';
                    break;
                    case("External health professional"):
                    href = '/v11/case-review/questions-external-medical-health-professional';
                    break;

                  }

                //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
                  req.session.data.queriesReading[req.session.data.queriesReading.length - 1].action = req.session.data['who-is-question-for-reading']
                  req.session.data.queriesReading[req.session.data.queriesReading.length - 1].href = href;
                  res.redirect('/v11/case-review/activities/reading-and-understanding')

                  }
                })

          //Start routes for Mixing with others: questions
            router.post('/v11/case-review/activities/engaging-face-to-face', (req, res, next) => {
                if (req.session.data['who-is-question-for-mixing-people']) {
                  console.log('is-this-calling', req.session.data)
                  const textBox = req.session.data['query-content']
                  const section = req.session.data.source

                  const queriesMixing = req.session.data.queriesMixing || []
                  queriesMixing.push({ textBox, section })
                  req.session.data.queriesMixing = queriesMixing

                  let href;

                  switch (req.session.data['who-is-question-for-mixing-people']) {
                    case("Unassigned"):
                    href = '/v11/case-review/unassigned-questions';
                    break;
                    case("Claimant"):
                    href = '/v11/case-review/questions-claimant';
                    break;
                    case("Internal medical support"):
                    href = '/v11/case-review/questions-internal-medical-support';
                    break;
                    case("Internal non medical support"):
                    href = '/v11/case-review/questions-internal-non-medical-support';
                    break;
                    case("External health professional"):
                    href = '/v11/case-review/questions-external-medical-health-professional';
                    break;

                  }

                //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
                  req.session.data.queriesMixing[req.session.data.queriesMixing.length - 1].action = req.session.data['who-is-question-for-mixing-people']
                  req.session.data.queriesMixing[req.session.data.queriesMixing.length - 1].href = href;
                  res.redirect('/v11/case-review/activities/engaging-face-to-face')

                  }
                })

      //Start routes for managing money: questions
        router.post('/v11/case-review/activities/managing-money', (req, res, next) => {
            if (req.session.data['who-is-question-for-money']) {
              console.log('is-this-calling', req.session.data)
              const textBox = req.session.data['query-content']
              const section = req.session.data.source

              const queriesMoney = req.session.data.queriesMoney || []
              queriesMoney.push({ textBox, section })
              req.session.data.queriesMoney = queriesMoney

              let href;

              switch (req.session.data['who-is-question-for-money']) {
                case("Unassigned"):
                href = '/v11/case-review/unassigned-questions';
                break;
                case("Claimant"):
                href = '/v11/case-review/questions-claimant';
                break;
                case("Internal medical support"):
                href = '/v11/case-review/questions-internal-medical-support';
                break;
                case("Internal non medical support"):
                href = '/v11/case-review/questions-internal-non-medical-support';
                break;
                case("External health professional"):
                href = '/v11/case-review/questions-external-medical-health-professional';
                break;

              }

            //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
              req.session.data.queriesMoney[req.session.data.queriesMoney.length - 1].action = req.session.data['who-is-question-for-money']
              req.session.data.queriesMoney[req.session.data.queriesMoney.length - 1].href = href;
              res.redirect('/v11/case-review/activities/managing-money')

              }
            })
    //Start routes for planning, following journeys: questions
      router.post('/v11/case-review/activities/planning-and-following-journeys', (req, res, next) => {
          if (req.session.data['who-is-question-for-planning']) {
            console.log('is-this-calling', req.session.data)
            const textBox = req.session.data['query-content']
            const section = req.session.data.source

            const queriesPlanning = req.session.data.queriesPlanning || []
            queriesPlanning.push({ textBox, section })
            req.session.data.queriesPlanning = queriesPlanning

            let href;

            switch (req.session.data['who-is-question-for-planning']) {
              case("Unassigned"):
              href = '/v11/case-review/unassigned-questions';
              break;
              case("Claimant"):
              href = '/v11/case-review/questions-claimant';
              break;
              case("Internal medical support"):
              href = '/v11/case-review/questions-internal-medical-support';
              break;
              case("Internal non medical support"):
              href = '/v11/case-review/questions-internal-non-medical-support';
              break;
              case("External health professional"):
              href = '/v11/case-review/questions-external-medical-health-professional';
              break;

            }

          //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
            req.session.data.queriesPlanning[req.session.data.queriesPlanning.length - 1].action = req.session.data['who-is-question-for-planning']
            req.session.data.queriesPlanning[req.session.data.queriesPlanning.length - 1].href = href;
            res.redirect('/v11/case-review/activities/planning-and-following-journeys')

            }
          })


          //Start routes for moving around: questions
            router.post('/v11/case-review/activities/moving-around', (req, res, next) => {
                if (req.session.data['who-is-question-for-moving']) {
                  console.log('is-this-calling', req.session.data)
                  const textBox = req.session.data['query-content']
                  const section = req.session.data.source

                  const queriesMoving = req.session.data.queriesMoving || []
                  queriesMoving.push({ textBox, section })
                  req.session.data.queriesMoving = queriesMoving

                  let href;

                  switch (req.session.data['who-is-question-for-moving']) {
                    case("Unassigned"):
                    href = '/v11/case-review/unassigned-questions';
                    break;
                    case("Claimant"):
                    href = '/v11/case-review/questions-claimant';
                    break;
                    case("Internal medical support"):
                    href = '/v11/case-review/questions-internal-medical-support';
                    break;
                    case("Internal non medical support"):
                    href = '/v11/case-review/questions-internal-non-medical-support';
                    break;
                    case("External health professional"):
                    href = '/v11/case-review/questions-external-medical-health-professional';
                    break;

                  }

                //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
                  req.session.data.queriesMoving[req.session.data.queriesMoving.length - 1].action = req.session.data['who-is-question-for-moving']
                  req.session.data.queriesMoving[req.session.data.queriesMoving.length - 1].href = href;
                  res.redirect('/v11/case-review/activities/moving-around')

                  }
                })


                //Start routes for additional information: questions
                  router.post('/v11/case-review/activities/additional-information', (req, res, next) => {
                      if (req.session.data['who-is-question-for-add-info']) {
                        console.log('is-this-calling', req.session.data)
                        const textBox = req.session.data['query-content']
                        const section = req.session.data.source

                        const queriesAdditional = req.session.data.queriesAdditional || []
                        queriesAdditional.push({ textBox, section })
                        req.session.data.queriesAdditional = queriesAdditional

                        let href;

                        switch (req.session.data['who-is-question-for-add-info']) {
                          case("Unassigned"):
                          href = '/v11/case-review/unassigned-questions';
                          break;
                          case("Claimant"):
                          href = '/v11/case-review/questions-claimant';
                          break;
                          case("Internal medical support"):
                          href = '/v11/case-review/questions-internal-medical-support';
                          break;
                          case("Internal non medical support"):
                          href = '/v11/case-review/questions-internal-non-medical-support';
                          break;
                          case("External health professional"):
                          href = '/v11/case-review/questions-external-medical-health-professional';
                          break;

                        }

                      //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
                        req.session.data.queriesAdditional[req.session.data.queriesAdditional.length - 1].action = req.session.data['who-is-question-for-add-info']
                        req.session.data.queriesAdditional[req.session.data.queriesAdditional.length - 1].href = href;
                        res.redirect('/v11/case-review/activities/additional-information')

                        }
                      })


      //Routes for query condtion1
      router.post('/v11/case-review/condition-one', (req, res, next) => {
          if (req.session.data['who-is-question-for-cond-one']) {
            console.log('is-this-calling', req.session.data)
            const textBox = req.session.data['query-content']
            const section = req.session.data.source

            const queriesConditionOne = req.session.data.queriesConditionOne || []
            queriesConditionOne.push({ textBox, section })
            req.session.data.queriesConditionOne = queriesConditionOne

            let href;

            switch (req.session.data['who-is-question-for-cond-one']) {
              case("Unassigned"):
              href = '/v11/case-review/unassigned-questions';
              break;
              case("Claimant"):
              href = '/v11/case-review/questions-claimant';
              break;
              case("Internal medical support"):
              href = '/v11/case-review/questions-internal-medical-support';
              break;
              case("Internal non medical support"):
              href = '/v11/case-review/questions-internal-non-medical-support';
              break;
              case("External health professional"):
              href = '/v11/case-review/questions-external-medical-health-professional';
              break;

            }

          //  req.session.data.queriesConditionOne[req.session.data.queriesConditionOne.length - 1].content = req.session.data['query-content']
            req.session.data.queriesConditionOne[req.session.data.queriesConditionOne.length - 1].action = req.session.data['who-is-question-for-cond-one']
            req.session.data.queriesConditionOne[req.session.data.queriesConditionOne.length - 1].href = href;
            res.redirect('/v11/case-review/condition-one')

            }
          })

        //Routes for query condtion2
        router.post('/v11/case-review/condition-two', (req, res, next) => {
            if (req.session.data['who-is-question-for-cond-two']) {
              console.log('is-this-calling', req.session.data)
              const textBox = req.session.data['query-content']
              const section = req.session.data.source

              const queriesConditionTwo = req.session.data.queriesConditionTwo || []
              queriesConditionTwo.push({ textBox, section })
              req.session.data.queriesConditionTwo = queriesConditionTwo

              let href;

              switch (req.session.data['who-is-question-for-cond-two']) {
                case("Unassigned"):
                href = '/v11/case-review/unassigned-questions';
                break;
                case("Claimant"):
                href = '/v11/case-review/questions-claimant';
                break;
                case("Internal medical support"):
                href = '/v11/case-review/questions-internal-medical-support';
                break;
                case("Internal non medical support"):
                href = '/v11/case-review/questions-internal-non-medical-support';
                break;
                case("External health professional"):
                href = '/v11/case-review/questions-external-medical-health-professional';
                break;

              }

            //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
              req.session.data.queriesConditionTwo[req.session.data.queriesConditionTwo.length - 1].action = req.session.data['who-is-question-for-cond-two']
              req.session.data.queriesConditionTwo[req.session.data.queriesConditionTwo.length - 1].href = href;
              res.redirect('/v11/case-review/condition-two')

              }
        })

        //Routes for query condtion3
        router.post('/v11/case-review/condition-three', (req, res, next) => {
            if (req.session.data['who-is-question-for-cond-three']) {
              console.log('is-this-calling', req.session.data)
              const textBox = req.session.data['query-content']
              const section = req.session.data.source

              const queriesConditionThree = req.session.data.queriesConditionThree || []
              queriesConditionThree.push({ textBox, section })
              req.session.data.queriesConditionThree = queriesConditionThree

              let href;

              switch (req.session.data['who-is-question-for-cond-three']) {
                case("Unassigned"):
                href = '/v11/case-review/unassigned-questions';
                break;
                case("Claimant"):
                href = '/v11/case-review/questions-claimant';
                break;
                case("Internal medical support"):
                href = '/v11/case-review/questions-internal-medical-support';
                break;
                case("Internal non medical support"):
                href = '/v11/case-review/questions-internal-non-medical-support';
                break;
                case("External health professional"):
                href = '/v11/case-review/questions-external-medical-health-professional';
                break;

              }

            //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
              req.session.data.queriesConditionThree[req.session.data.queriesConditionThree.length - 1].action = req.session.data['who-is-question-for-cond-three']
              req.session.data.queriesConditionThree[req.session.data.queriesConditionThree.length - 1].href = href;
              res.redirect('/v11/case-review/condition-three')

              }
        })

        //Routes for query condtion4
        router.post('/v11/case-review/condition-four', (req, res, next) => {
            if (req.session.data['who-is-question-for-cond-four']) {
              console.log('is-this-calling', req.session.data)
              const textBox = req.session.data['query-content']
              const section = req.session.data.source

              const queriesConditionFour = req.session.data.queriesConditionFour || []
              queriesConditionFour.push({ textBox, section })
              req.session.data.queriesConditionFour = queriesConditionFour

              let href;

              switch (req.session.data['who-is-question-for-cond-four']) {
                case("Unassigned"):
                href = '/v11/case-review/unassigned-questions';
                break;
                case("Claimant"):
                href = '/v11/case-review/questions-claimant';
                break;
                case("Internal medical support"):
                href = '/v11/case-review/questions-internal-medical-support';
                break;
                case("Internal non medical support"):
                href = '/v11/case-review/questions-internal-non-medical-support';
                break;
                case("External health professional"):
                href = '/v11/case-review/questions-external-medical-health-professional';
                break;

              }

            //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
              req.session.data.queriesConditionFour[req.session.data.queriesConditionFour.length - 1].action = req.session.data['who-is-question-for-cond-four']
              req.session.data.queriesConditionFour[req.session.data.queriesConditionFour.length - 1].href = href;
              res.redirect('/v11/case-review/condition-four')

              }
        })

        //Routes for query condtion5
        router.post('/v11/case-review/condition-five', (req, res, next) => {
            if (req.session.data['who-is-question-for-cond-five']) {
              console.log('is-this-calling', req.session.data)
              const textBox = req.session.data['query-content']
              const section = req.session.data.source

              const queriesConditionFive = req.session.data.queriesConditionFive || []
              queriesConditionFive.push({ textBox, section })
              req.session.data.queriesConditionFive = queriesConditionFive

              let href;

              switch (req.session.data['who-is-question-for-cond-five']) {
                case("Unassigned"):
                href = '/v11/case-review/unassigned-questions';
                break;
                case("Claimant"):
                href = '/v11/case-review/questions-claimant';
                break;
                case("Internal medical support"):
                href = '/v11/case-review/questions-internal-medical-support';
                break;
                case("Internal non medical support"):
                href = '/v11/case-review/questions-internal-non-medical-support';
                break;
                case("External health professional"):
                href = '/v11/case-review/questions-external-medical-health-professional';
                break;
              }

            //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
              req.session.data.queriesConditionFive[req.session.data.queriesConditionFive.length - 1].action = req.session.data['who-is-question-for-cond-five']
              req.session.data.queriesConditionFive[req.session.data.queriesConditionFive.length - 1].href = href;
              res.redirect('/v11/case-review/condition-five')

              }
        })

        //Routes for query condtion6
        router.post('/v11/case-review/condition-six', (req, res, next) => {
            if (req.session.data['who-is-question-for-cond-six']) {
              console.log('is-this-calling', req.session.data)
              const textBox = req.session.data['query-content']
              const section = req.session.data.source

              const queriesConditionSix = req.session.data.queriesConditionSix || []
              queriesConditionSix.push({ textBox, section })
              req.session.data.queriesConditionSix = queriesConditionSix

              let href;

              switch (req.session.data['who-is-question-for-cond-six']) {
                case("Unassigned"):
                href = '/v11/case-review/unassigned-questions';
                break;
                case("Claimant"):
                href = '/v11/case-review/questions-claimant';
                break;
                case("Internal medical support"):
                href = '/v11/case-review/questions-internal-medical-support';
                break;
                case("Internal non medical support"):
                href = '/v11/case-review/questions-internal-non-medical-support';
                break;
                case("External health professional"):
                href = '/v11/case-review/questions-external-medical-health-professional';
                break;
              }

            //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
              req.session.data.queriesConditionSix[req.session.data.queriesConditionSix.length - 1].action = req.session.data['who-is-question-for-cond-six']
              req.session.data.queriesConditionSix[req.session.data.queriesConditionSix.length - 1].href = href;
              res.redirect('/v11/case-review/condition-six')

              }
        })


        //Routes for query condtion7
        router.post('/v11/case-review/condition-seven', (req, res, next) => {
            if (req.session.data['who-is-question-for-cond-seven']) {
              console.log('is-this-calling', req.session.data)
              const textBox = req.session.data['query-content']
              const section = req.session.data.source

              const queriesConditionSeven = req.session.data.queriesConditionSeven || []
              queriesConditionSeven.push({ textBox, section })
              req.session.data.queriesConditionSeven = queriesConditionSeven

              let href;

              switch (req.session.data['who-is-question-for-cond-seven']) {
                case("Unassigned"):
                href = '/v11/case-review/unassigned-questions';
                break;
                case("Claimant"):
                href = '/v11/case-review/questions-claimant';
                break;
                case("Internal medical support"):
                href = '/v11/case-review/questions-internal-medical-support';
                break;
                case("Internal non medical support"):
                href = '/v11/case-review/questions-internal-non-medical-support';
                break;
                case("External health professional"):
                href = '/v11/case-review/questions-external-medical-health-professional';
                break;
              }

            //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
              req.session.data.queriesConditionSeven[req.session.data.queriesConditionSeven.length - 1].action = req.session.data['who-is-question-for-cond-seven']
              req.session.data.queriesConditionSeven[req.session.data.queriesConditionSeven.length - 1].href = href;
              res.redirect('/v11/case-review/condition-seven')

              }
        })


        //Routes for query condtion8
        router.post('/v11/case-review/condition-eight', (req, res, next) => {
            if (req.session.data['who-is-question-for-cond-eight']) {
              console.log('is-this-calling', req.session.data)
              const textBox = req.session.data['query-content']
              const section = req.session.data.source

              const queriesConditionEight = req.session.data.queriesConditionEight || []
              queriesConditionEight.push({ textBox, section })
              req.session.data.queriesConditionEight = queriesConditionEight

              let href;

              switch (req.session.data['who-is-question-for-cond-eight']) {
                case("Unassigned"):
                href = '/v11/case-review/unassigned-questions';
                break;
                case("Claimant"):
                href = '/v11/case-review/questions-claimant';
                break;
                case("Internal medical support"):
                href = '/v11/case-review/questions-internal-medical-support';
                break;
                case("Internal non medical support"):
                href = '/v11/case-review/questions-internal-non-medical-support';
                break;
                case("External health professional"):
                href = '/v11/case-review/questions-external-medical-health-professional';
                break;
              }

            //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
              req.session.data.queriesConditionEight[req.session.data.queriesConditionEight.length - 1].action = req.session.data['who-is-question-for-cond-eight']
              req.session.data.queriesConditionEight[req.session.data.queriesConditionEight.length - 1].href = href;
              res.redirect('/v11/case-review/condition-eight')

              }
        })



//Start routes for scoring -- Old  stuff???********************************************************************************
router.post('/v11/case-review/set-descriptor', (req, res, next) => {
  //  if (req.session.data['set-descriptor'] == "Can prepare and cook a simple meal unaided" ) {
    console.log('/v11/case-review/set-descriptor', req.session.data)
    const descriptor = req.session.data['set-descriptor']

        let points;

        switch (req.session.data['set-descriptor']) {
          case('Can prepare and cook a simple meal unaided'):
          points = '0';
          break;
          case('Needs to use an aid or appliance to be able to either prepare or cook a simple meal'):
          points = '2';
          break;
          case('Cannot cook a simple meal using a conventional cooker but is able to do so using a microwave'):
          points = '2';
          break;
          case('Needs prompting to be able to either prepare or cook a simple meal'):
          points = '2';
          break;
          case('Needs supervision or assistance to either prepare or cook a simple meal'):
          points = '4';
          break;
          case('Cannot prepare and cook food at all'):
          points = '8';
          break;
        }

     const scoresChoice = req.session.data.scoresChoice || []
     scoresChoice.push({ descriptor, points })
      req.session.data.scoresChoice = scoresChoice
      res.redirect('/v11/case-review/review-activity-descriptors')
    //}
})

router.post('/v11/case-review/review-activity-descriptors', (req, res, next) => {
  console.log('this is scoring')
  console.log(req.session.data)

  req.session.data.scoresChoice[req.session.data.scoresChoice.length - 1].points = points;

  console.log(1, req.session.data.scoresChoice)
  res.redirect('/v11/case-review/review-activity-descriptors')
})


//Create query taking nutrition activity
router.post('/v11/case-review/activities/taking-nutrition', (req, res, next) => {
  console.log('/v11/case-review/activities/taking-nutrition', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/v11/case-review/set-action/set-action-taking-nutrition')
})

router.post('/v11/case-review/set-action/set-action-taking-nutrition', (req, res, next) => {
  console.log('this is taking nutrition')
  console.log(req.session.data)
  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/v11/case-review/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/v11/case-review/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/v11/case-review/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/v11/case-review/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/v11/case-review/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/v11/case-review/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-30-35/activities/taking-nutrition')
})

//Create query managing Treatments activity
router.post('/v11/case-review/activities/managing-treatments', (req, res, next) => {
  console.log('/v11/case-review/activities/managing-treatments', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/v11/case-review/set-action/set-action-managing-treatments')
})

router.post('/v11/case-review/set-action/set-action-managing-treatments', (req, res, next) => {
  console.log('this is managing treatments')
  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/v11/case-review/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/v11/case-review/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/v11/case-review/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/v11/case-review/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/v11/case-review/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/v11/case-review/none-these-action';
    break;
  }

  console.log(req.session.data)
  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/v11/case-review/activities/managing-treatments')
})

//Create query washing and bathing activity
router.post('/v11/case-review/activities/washing-and-bathing', (req, res, next) => {
  console.log('/v11/case-review/activities/washing-and-bathing', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/v11/case-review/set-action/set-action-washing-and-bathing')
})

router.post('/v11/case-review/set-action/set-action-washing-and-bathing', (req, res, next) => {
  console.log('this is washing and bathing')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/v11/case-review/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/v11/case-review/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/v11/case-review/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/v11/case-review/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/v11/case-review/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/v11/case-review/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/v11/case-review/activities/washing-and-bathing')
})

//Create query managing toilet needs activity
router.post('/v11/case-review/activities/managing-toilet-needs', (req, res, next) => {
  console.log('/v11/case-review/activities/managing-toilet-needs', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/v11/case-review/set-action/set-action-managing-toilet-needs')
})

router.post('/v11/case-review/set-action/set-action-managing-toilet-needs', (req, res, next) => {
  console.log('this is managing toilet needs')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/v11/case-review/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/v11/case-review/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/v11/case-review/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/v11/case-review/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/v11/case-review/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/v11/case-review/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/v11/case-review/activities/managing-toilet-needs')
})

//Create query dressing and undressing activity
router.post('/v11/case-review/activities/dressing-and-undressing', (req, res, next) => {
  console.log('/v11/case-review/activities/dressing-and-undressing', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/v11/case-review/set-action/set-action-dressing-and-undressing')
})

router.post('/v11/case-review/set-action/set-action-dressing-and-undressing', (req, res, next) => {
  console.log('this is dressing and undressing')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/v11/case-review/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/v11/case-review/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/v11/case-review/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/v11/case-review/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/v11/case-review/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/v11/case-review/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/v11/case-review/activities/dressing-and-undressing')
})

//Create query communicating verbally activity
router.post('/v11/case-review/activities/communicating-verbally', (req, res, next) => {
  console.log('/v11/case-review/activities/communicating-verbally', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/v11/case-review/set-action/set-action-communicating-verbally')
})

router.post('/v11/case-review/set-action/set-action-communicating-verbally', (req, res, next) => {
  console.log('this is communicating verbally')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/v11/case-review/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/v11/case-review/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/v11/case-review/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/v11/case-review/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/v11/case-review/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/v11/case-review/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/v11/case-review/activities/communicating-verbally')
})

//Create query reading and understanding activity
router.post('/v11/case-review/activities/reading-and-understanding', (req, res, next) => {
  console.log('/v11/case-review/activities/reading-and-understanding', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/v11/case-review/set-action/set-action-reading-and-understanding')
})

router.post('/v11/case-review/set-action/set-action-reading-and-understanding', (req, res, next) => {
  console.log('this is reading and understanding')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/v11/case-review/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/v11/case-review/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/v11/case-review/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/v11/case-review/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/v11/case-review/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/v11/case-review/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/v11/case-review/activities/reading-and-understanding')
})

//Create query engaging face to face activity
router.post('/v11/case-review/activities/engaging-face-to-face', (req, res, next) => {
  console.log('/v11/case-review/activities/engaging-face-to-face', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/v11/case-review/set-action/set-action-engage-face-to-face')
})

router.post('/v11/case-review/set-action/set-action-engage-face-to-face', (req, res, next) => {
  console.log('this is engaging face to face')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/v11/case-review/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/v11/case-review/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/v11/case-review/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/v11/case-review/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/v11/case-review/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/v11/case-review/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/v11/case-review/activities/engaging-face-to-face')
})

//Create query managing money activity
router.post('/v11/case-review/activities/managing-money', (req, res, next) => {
  console.log('/v11/case-review/activities/managing-money', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/v11/case-review/set-action/set-action-managing-money')
})

router.post('/v11/case-review/set-action/set-action-managing-money', (req, res, next) => {
  console.log('this is managing-money')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/v11/case-review/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/v11/case-review/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/v11/case-review/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/v11/case-review/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/v11/case-review/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/v11/case-review/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/v11/case-review/activities/managing-money')
})

//Create query planning and following journeys activity
router.post('/v11/case-review/activities/planning-and-following-journeys', (req, res, next) => {
  console.log('/v11/case-review/activities/planning-and-following-journeys', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/v11/case-review/set-action/set-action-planning-and-following-journeys')
})

router.post('/v11/case-review/set-action/set-action-planning-and-following-journeys', (req, res, next) => {
  console.log('this is planning and following journeys')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/v11/case-review/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/v11/case-review/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/v11/case-review/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/v11/case-review/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/v11/case-review/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/v11/case-review/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/v11/case-review/activities/planning-and-following-journeys')
})

//Create query moving around activity
router.post('/v11/case-review/activities/moving-around', (req, res, next) => {
  console.log('/v11/case-review/activities/moving-around', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/v11/case-review/set-action/set-action-moving-around')
})

router.post('/v11/case-review/set-action/set-action-moving-around', (req, res, next) => {
  console.log('this is moving around')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/v11/case-review/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/v11/case-review/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/v11/case-review/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/v11/case-review/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/v11/case-review/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/v11/case-review/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/v11/case-review/activities/moving-around')
})

//**************************************************************************************************************************************
//Routes for queries linked to Evidence number 1

router.post('/v11/case-review/evidence-detail', (req, res, next) => {
    if (req.session.data['evidence-one-note'] == "question-about-this-condition" ) {
      console.log('/v11/case-review/evidence-detail', req.session.data)
      const name = req.session.data['evidence-query']
      const section = req.session.data.source

      const queriesEvidence = req.session.data.queriesEvidence || []
      queriesEvidence.push({ name, section })
      req.session.data.queriesEvidence = queriesEvidence
      res.redirect('/v11/case-review/set-action/set-action-evidence')

    } else if (req.session.data['evidence-one-note'] == "important-to-this-case" ) {
        //Routes for tagged documents linked to Evidence
            console.log('/v11/case-review/evidence-detail', req.session.data)
            const name = req.session.data['evidence-query']
            //const pageURL = req.session.data['page-URL'][1]['contact-claimant-page']
            //console.log(pageURL)
            const section = req.session.data.source

            const conditionsEvidenceOne = req.session.data.conditionsEvidenceOne || []
            conditionsEvidenceOne.push({ name, section })
            req.session.data.conditionsEvidenceOne = conditionsEvidenceOne
            res.redirect('/v11/case-review/tagging-evidence/evidence-one')

  } else {
    console.log('/v11/case-review/evidence-detail', req.session.data)
    const name = req.session.data['out-of-scope']
    const scopeEvidenceOne = req.session.data['query-content']
    const section = req.session.data.source

    const outScopeEvidenceOne = req.session.data.outScopeEvidenceOne || []
    outScopeEvidenceOne.push({ name, section, scopeEvidenceOne })
    req.session.data.outScopeEvidenceOne = outScopeEvidenceOne
    res.redirect('/v11/case-review/evidence-detail')

    }
    })

// follow up for tagging important info: evidence one
    router.post('/v11/case-review/tagging-evidence/evidence-one', (req, res, next) => {
      console.log('this is evidence one')
      console.log(req.session.data)
      req.session.data.conditionsEvidenceOne[req.session.data.conditionsEvidenceOne.length - 1].evidenceNoteOne = req.session.data['query-content']
      req.session.data.conditionsEvidenceOne[req.session.data.conditionsEvidenceOne.length - 1].action = req.session.data['tagConditionEvidence']
      //req.session.data.conditionsEvidence[req.session.data.conditionsEvidence.length - 1].page = req.session.data['page-URL'][1]['contact-claimant-page']
      console.log(1, req.session.data.conditionsEvidenceOne)
      res.redirect('/v11/case-review/evidence-detail')
    })

// follow up route for linking queries to evidence number 1
router.post('/v11/case-review/set-action/set-action-evidence', (req, res, next) => {
  console.log('this is evidence query')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/v11/case-review/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/v11/case-review/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/v11/case-review/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/v11/case-review/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/v11/case-review/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/v11/case-review/none-these-action';
    break;
  }

  req.session.data.queriesEvidence[req.session.data.queriesEvidence.length - 1].evidence = req.session.data['query-content']
  req.session.data.queriesEvidence[req.session.data.queriesEvidence.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesEvidence[req.session.data.queriesEvidence.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/v11/case-review/evidence-detail')
})

// follow up roiute for out of scope: evidence one
router.post('/v11/case-review/evidence-detail', (req, res, next) => {
  console.log('this is evidence one out of scope')
  console.log(req.session.data)

  req.session.data.outScopeEvidenceOne[req.session.data.outScopeEvidenceOne.length - 1].scopeEvidenceOne = req.session.data['query-content']
//  req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].action = req.session.data['set-an-action']
  //req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/v11/case-review/evidence-detail')
})

//Routes for queries linked to Evidence number 2

router.post('/v11/case-review/evidence-detail-two', (req, res, next) => {
    if (req.session.data['evidence-note-two'] == "question-about-this-condition" ) {
      console.log('/v11/case-review/evidence-detail', req.session.data)
      const name = req.session.data['evidence-query']
      const section = req.session.data.source

      const queriesEvidenceTwo = req.session.data.queriesEvidenceTwo || []
      queriesEvidenceTwo.push({ name, section })
      req.session.data.queriesEvidenceTwo = queriesEvidenceTwo
      res.redirect('/v11/case-review/set-action/set-action-evidence-two')

    } else if (req.session.data['evidence-note-two'] == "important-to-this-case" ) {
        //Routes for tagged documents linked to Evidence
            console.log('/v11/case-review/evidence-detail-two', req.session.data)
            const name = req.session.data['query-content']
            //const pageURL = req.session.data['page-URL'][1]['contact-claimant-page']
            //console.log(pageURL)
            const section = req.session.data.source

            const conditionsEvidence = req.session.data.conditionsEvidence || []
            conditionsEvidence.push({ name, section })
            req.session.data.conditionsEvidence = conditionsEvidence
            res.redirect('/v11/case-review/tagging-evidence/evidence-two')

  } else {
    console.log('/v11/case-review/evidence-detail-two', req.session.data)
    const name = req.session.data['out-of-scope']
    const scopeEvidenceTwo = req.session.data['query-content']
    const section = req.session.data.source

    const outScopeEvidenceTwo = req.session.data.outScopeEvidenceTwo || []
    outScopeEvidenceTwo.push({ name, section, scopeEvidenceTwo })
    req.session.data.outScopeEvidenceTwo = outScopeEvidenceTwo
    res.redirect('/v11/case-review/evidence-detail-two')

    }
    })

// follow up for tagging important info: evidence two
    router.post('/v11/case-review/tagging-evidence/evidence-two', (req, res, next) => {
      console.log('this is evidence')
      console.log(req.session.data)
      req.session.data.conditionsEvidence[req.session.data.conditionsEvidence.length - 1].evidenceNote = req.session.data['query-content']
      req.session.data.conditionsEvidence[req.session.data.conditionsEvidence.length - 1].action = req.session.data['tagConditionEvidence']
      //req.session.data.conditionsEvidence[req.session.data.conditionsEvidence.length - 1].page = req.session.data['page-URL'][1]['contact-claimant-page']
      console.log(1, req.session.data.conditionsEvidence)
      res.redirect('/v11/case-review/evidence-detail-two')
    })

// follow up route for linking queries to evidence number two
router.post('/v11/case-review/set-action/set-action-evidence-two', (req, res, next) => {
  console.log('this is evidence query')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/v11/case-review/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/v11/case-review/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/v11/case-review/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/v11/case-review/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/v11/case-review/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/v11/case-review/none-these-action';
    break;
  }

  req.session.data.queriesEvidenceTwo[req.session.data.queriesEvidenceTwo.length - 1].evidence = req.session.data['query-content']
  req.session.data.queriesEvidenceTwo[req.session.data.queriesEvidenceTwo.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesEvidenceTwo[req.session.data.queriesEvidenceTwo.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/v11/case-review/evidence-detail-two')
})

// follow up route for out of scope: evidence two
router.post('/v11/case-review/evidence-detail-two', (req, res, next) => {
  console.log('this is evidence two out of scope')
  console.log(req.session.data)

  req.session.data.outScopeEvidenceTwo[req.session.data.outScopeEvidenceTwo.length - 1].scopeEvidenceTwo = req.session.data['query-content']
//  req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].action = req.session.data['set-an-action']
  //req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/v11/case-review/evidence-detail-two')
})
//Routes for queries appearing on action page

router.post('/v11/case-review/contact-claimant-action', (req, res, next) => {
  console.log('/v11/case-review/contact-claimant-action', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/v11/case-review/contact-claimant-action')
})

router.post('/v11/case-review/contact-claimant-action', (req, res, next) => {
  console.log('this is contact claimant action')
  console.log(req.session.data)
  req.session.data.queries[req.session.data.queries.length - 1].contentQ = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  console.log(1, req.session.data)
  res.redirect('/v11/case-review/contact-claimant-action')
})
//******** -- End of v11**********************************************************************************************


//v10//*******************************************************************************************************************************************************v10*
///// case selector routes ////
// Start routes for assigning a caseload)
router.post('/v10/case-selector/ready-for-review', (req, res, next) => {
     // redirect to "case-manager-assign" page.
   res.redirect('/v10/case-selector/case-manager-assign')
 })

// route for assigning cases
router.post('/v10/case-selector/case-manager-assign', (req, res, next) => {
       // Checks radio options, if "Add a new caseload" is selected, route to "create-new-case-ready-review" page.
      if (req.session.data['assign-caseload'] == "new-caseload") {
        // redirect to "create-new-case-ready-review" page.
        res.redirect('/v10/case-selector/create-new-case-ready-review')
      } else {
        // redirect to "ready-for-review-success" page.
        res.redirect('/v10/case-selector/ready-for-review-success')
      }
})

// route for reassigning cases
router.post('/v10/case-selector/case-manager-reassign', (req, res, next) => {
       // Checks radio options, if "Add a new caseload" is selected, route to "create-new-case-ready-review" page.
      if (req.session.data['reassign-caseload'] == "new-caseload") {
         // redirect to "create-new-case-ready-review" page.
          res.redirect('/v10/case-selector/create-new-case-in-review')

      } else {
        // stores data value from URL so the prototype knows which case has been selected.
        // Case name stored as variable which displays dynamically on success page.
        const reassignedCaseName = req.session.data.source
        // Reads out data into command line. (good for debugging)
        console.log(1, req.session.data)
        res.redirect('/v10/case-selector/assigned-for-review-success')
      }
})
// route for creating caseload - ready for review
router.post('/v10/case-selector/create-new-case-ready-review', (req, res, next) => {
         // redirect to "create-caseload-success" page.
        res.redirect('/v10/case-selector/create-caseload-ready-review-success')
      }
)
// route for creating caseload - in review
router.post('/v10/case-selector/create-new-case-in-review', (req, res, next) => {
         // redirect to "create-caseload-success" page.
        res.redirect('/v10/case-selector/create-caseload-in-review-success')
      }
)



// Triage route //
router.post('/v10/case-selector/ready-to-make-next-step', function (req, res) {

// Make a variable and give it the value from 'how-many-balls'
var makearecommendation = req.session.data['next-step']

// Check whether the variable matches a condition
if (makearecommendation == "Yes, move case to ready for review"){
 // Send user to decision page
 res.redirect('ready-for-review')
} else {
 // Send user to referral page
 res.redirect('refer-confirm')
}

})

// Referral assessment route //

router.post('/v10/review/ready-to-make-next-step', function (req, res) {

// Make a variable and give it the value from 'how-many-balls'
var makearecommendation = req.session.data['next-step']

// Check whether the variable matches a condition
if (makearecommendation == "Send case for a decision"){
 // Send user to decision page
 res.redirect('decision')
} else {
 // Send user to referral page
 res.redirect('refer')
}

})
/////////////////////// end case selector routes /////////////
// Referral assessment route //

router.post('/v10/case-review/ready-to-make-next-step', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var makearecommendation = req.session.data['next-step']

  // Check whether the variable matches a condition
  if (makearecommendation == "Case is ready for a decision"){
    // Send user to decision page
    res.redirect('decision')
  } else {
    // Send user to referral page
    res.redirect('refer')
  }

})

//Start routes for the 'adding a question' journey (collated questions view)
// this does not work - seperate ones created below
router.post('/v10/case-review/question-link', (req, res, next) => {
    if (req.session.data['question-for']) {
      console.log('is-this-calling-questions', req.session.data)
      const questionBox = req.session.data['question']
      const answerBox = req.session.data['answer']
      const answeredQuestion = req.session.data['answered-question']
      const section = req.session.data.source

      const queriesQuestions = req.session.data.queriesQuestions || []
      queriesQuestions.push({ answerBox, questionBox, answeredQuestion, section })
      req.session.data.queriesQuestions = queriesQuestions

      let href;

      switch (req.session.data['question-for']) {
        case("Unassigned"):
        href = '/v10/case-review/unassigned-questions';
        break;
        case("Claimant"):
        href = '/v10/case-review/questions-claimant';
        break;
        case("Internal medical support"):
        href = '/v10/case-review/questions-internal-medical-support';
        break;
        case("Internal non medical support"):
        href = '/v10/case-review/questions-internal-non-medical-support';
        break;
        case("External health professional"):
        href = '/v10/case-review/questions-external-medical-health-professional';
        break;
      }
      console.log('question-for');
      req.session.data.queriesQuestions[req.session.data.queriesQuestions.length - 1].action = req.session.data['question-for']
      req.session.data.queriesQuestions[req.session.data.queriesQuestions.length - 1].href = href;
      res.redirect('/v10/case-review/summary')

      }
    })

//test to create a preparing food question

router.post('/v10/case-review/question-preparingfood', (req, res, next) => {
    if (req.session.data['question-for']) {
      console.log('is-this-calling-questions', req.session.data)
      const textBox = req.session.data['question']
      const answerBox = req.session.data['answer']
      const answeredQuestion = req.session.data['answered-question']
      const section = req.session.data.source
      const queriesQuestions = req.session.data.queriesQuestions || ['question-for']
      queriesQuestions.push({ answerBox, questionBox, answeredQuestion, section })
      req.session.data.queriesQuestions = queriesQuestions

      let href;

      switch (req.session.data['question-for']) {
        case("Unassigned"):
        href = '/v10/case-review/unassigned-questions';
        break;
        case("Claimant"):
        href = '/v10/case-review/questions-claimant';
        break;
        case("Internal medical support"):
        href = '/v10/case-review/questions-internal-medical-support';
        break;
        case("Internal non medical support"):
        href = '/v10/case-review/questions-internal-non-medical-support';
        break;
        case("External health professional"):
        href = '/v10/case-review/questions-external-medical-health-professional';
        break;
      }
      console.log('question-for');
      req.session.data.queriesQuestions[req.session.data.queriesQuestions.length - 1].action = req.session.data['question-for']
      req.session.data.queriesQuestions[req.session.data.queriesQuestions.length - 1].href = href;
      res.redirect('/v10/case-review/summary')

      }
    })

    //end test to create preparing food question


//Start routes for the 'adding a question' journey (collated questions view)
    //Adding a question to unassigned questions
    router.post('/v10/case-review/question-unassigned-add', (req, res, next) => {
        if (req.session.data['question-for-unassigned']) {
          console.log('is-this-calling-questions', req.session.data)
          const questionBox = req.session.data['question']
          const answerBox = req.session.data['answer']
          const answeredQuestion = req.session.data['answered-question']
          const section = req.session.data.source
          const queriesQuestionsUnassigned = req.session.data.queriesQuestionsUnassigned || ['question-for-unassigned']
          queriesQuestionsUnassigned.push({ answerBox, questionBox, answeredQuestion, section })
          req.session.data.queriesQuestionsUnassigned = queriesQuestionsUnassigned

          let href;

          switch (req.session.data['question-for-unassigned']) {
            case("Unassigned"):
            href = '/v10/case-review/unassigned-questions';
            break;
            case("Claimant"):
            href = '/v10/case-review/questions-claimant';
            break;
            case("Internal medical support"):
            href = '/v10/case-review/questions-internal-medical-support';
            break;
            case("Internal non medical support"):
            href = '/v10/case-review/questions-internal-non-medical-support';
            break;
            case("External health professional"):
            href = '/v10/case-review/questions-external-medical-health-professional';
            break;

          }

          req.session.data.queriesQuestionsUnassigned[req.session.data.queriesQuestionsUnassigned.length - 1].action = req.session.data['question-for-unassigned']
          req.session.data.queriesQuestionsUnassigned[req.session.data.queriesQuestionsUnassigned.length - 1].href = href;
          res.redirect('/v10/case-review/unassigned-questions')
          }
        })

//Adding a question to claimant
        router.post('/v10/case-review/question-add', (req, res, next) => {
            if (req.session.data['question-for-claimant']) {
              console.log('is-this-calling-questions', req.session.data)
              const questionBox = req.session.data['question']
              const answerBox = req.session.data['answer']
              const answeredQuestion = req.session.data['answered-question']
              const section = req.session.data.source
              const queriesQuestions = req.session.data.queriesQuestions || ['question-for-claimant']
              queriesQuestions.push({ answerBox, questionBox, answeredQuestion, section })
              req.session.data.queriesQuestions = queriesQuestions

              let href;

              switch (req.session.data['question-for-claimant']) {
                case("Unassigned"):
                href = '/v10/case-review/unassigned-questions';
                break;
                case("Claimant"):
                href = '/v10/case-review/questions-claimant';
                break;
                case("Internal medical support"):
                href = '/v10/case-review/questions-internal-medical-support';
                break;
                case("Internal non medical support"):
                href = '/v10/case-review/questions-internal-non-medical-support';
                break;
                case("External health professional"):
                href = '/v10/case-review/questions-external-medical-health-professional';
                break;
              }

            //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
              req.session.data.queriesQuestions[req.session.data.queriesQuestions.length - 1].action = req.session.data['question-for-claimant']
              //req.session.data.queriesQuestions[req.session.data.queriesQuestions.length - 1].answered = answered;
              req.session.data.queriesQuestions[req.session.data.queriesQuestions.length - 1].href = href;
              res.redirect('/v10/case-review/questions-claimant')
              }
            })





          // Add a question for internal medical support
            router.post('/v10/case-review/question-internal-medical-support-add', (req, res, next) => {
                if (req.session.data['question-for-internal-medical-support']) {
                  console.log('is-this-calling-questions', req.session.data)
                  const questionBox = req.session.data['question']
                  const answerBox = req.session.data['answer']
                  const answeredQuestion = req.session.data['answered-question']
                  const section = req.session.data.source

                  const queriesQuestionsMedSupport = req.session.data.queriesQuestionsMedSupport || []
                  queriesQuestionsMedSupport.push({ answerBox, questionBox, answeredQuestion, section })
                  req.session.data.queriesQuestionsMedSupport = queriesQuestionsMedSupport

                  let href;

                  switch (req.session.data['question-for-internal-medical-support']) {
                    case("Unassigned"):
                    href = '/v10/case-review/unassigned-questions';
                    break;
                    case("Claimant"):
                    href = '/v10/case-review/questions-claimant';
                    break;
                    case("Internal medical support"):
                    href = '/v10/case-review/questions-internal-medical-support';
                    break;
                    case("Internal non medical support"):
                    href = '/v10/case-review/questions-internal-non-medical-support';
                    break;
                    case("External health professional"):
                    href = '/v10/case-review/questions-external-medical-health-professional';
                    break;
                  }

                //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
                  req.session.data.queriesQuestionsMedSupport[req.session.data.queriesQuestionsMedSupport.length - 1].action = req.session.data['question-for-internal-medical-support']
                  req.session.data.queriesQuestionsMedSupport[req.session.data.queriesQuestionsMedSupport.length - 1].href = href;
                  res.redirect('/v10/case-review/questions-internal-medical-support')

                  }
                })

                      // Add a question for internal non medical support
                        router.post('/v10/case-review/question-internal-non-medical-add', (req, res, next) => {
                            if (req.session.data['question-for-non-medical-support']) {
                              console.log('is-this-calling-questions', req.session.data)
                              const questionBox = req.session.data['question']
                              const answerBox = req.session.data['answer']
                              const answeredQuestion = req.session.data['answered-question']
                              const section = req.session.data.source

                              const queriesQuestionsNonMedical = req.session.data.queriesQuestionsNonMedical || []
                              queriesQuestionsNonMedical.push({ answerBox, questionBox, answeredQuestion, section })
                              req.session.data.queriesQuestionsNonMedical = queriesQuestionsNonMedical

                              let href;

                              switch (req.session.data['question-for-non-medical-support']) {
                                case("Unassigned"):
                                href = '/v10/case-review/unassigned-questions';
                                break;
                                case("Claimant"):
                                href = '/v10/case-review/questions-claimant';
                                break;
                                case("Internal medical support"):
                                href = '/v10/case-review/questions-internal-medical-support';
                                break;
                                case("Internal non medical support"):
                                href = '/v10/case-review/questions-internal-non-medical-support';
                                break;
                                case("External health professional"):
                                href = '/v10/case-review/questions-external-medical-health-professional';
                                break;
                                href = '/v10/case-review/questions';
                              }

                            //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
                              req.session.data.queriesQuestionsNonMedical[req.session.data.queriesQuestionsNonMedical.length - 1].action = req.session.data['question-for-non-medical-support']
                              req.session.data.queriesQuestionsNonMedical[req.session.data.queriesQuestionsNonMedical.length - 1].href = href;
                              res.redirect('/v10/case-review/questions-internal-non-medical-support')

                              }
                            })


                            // Add a question for external health professional
                              router.post('/v10/case-review/question-external-medical-add', (req, res, next) => {
                                  if (req.session.data['question-for-external-health-professional']) {
                                    console.log('is-this-calling-questions', req.session.data)
                                    const questionBox = req.session.data['question']
                                    const answerBox = req.session.data['answer']
                                    const answeredQuestion = req.session.data['answered-question']
                                    const section = req.session.data.source

                                    const queriesQuestionsExternalMedical = req.session.data.queriesQuestionsExternalMedical || []
                                    queriesQuestionsExternalMedical.push({ answerBox, questionBox, answeredQuestion, section })
                                    req.session.data.queriesQuestionsExternalMedical = queriesQuestionsExternalMedical

                                    let href;

                                    switch (req.session.data['question-for-external-health-professional']) {
                                      case("Unassigned"):
                                      href = '/v10/case-review/unassigned-questions';
                                      break;
                                      case("Claimant"):
                                      href = '/v10/case-review/questions-claimant';
                                      break;
                                      case("Internal medical support"):
                                      href = '/v10/case-review/questions-internal-medical-support';
                                      break;
                                      case("Internal non medical support"):
                                      href = '/v10/case-review/questions-internal-non-medical-support';
                                      break;
                                      case("External health professional"):
                                      href = '/v10/case-review/questions-external-medical-health-professional';
                                      break;
                                    }

                                  //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
                                    req.session.data.queriesQuestionsExternalMedical[req.session.data.queriesQuestionsExternalMedical.length - 1].action = req.session.data['question-for-external-health-professional']
                                    req.session.data.queriesQuestionsExternalMedical[req.session.data.queriesQuestionsExternalMedical.length - 1].href = href;
                                    res.redirect('/v10/case-review/questions-external-medical-health-professional')

                                    }
                                  })


//Start routes for preparing food: questions
router.post('/v10/case-review/activities/preparing-food', (req, res, next) => {
    if (req.session.data['who-is-question-for-prepfood']) {
      console.log('is-this-calling', req.session.data)
      const textBox = req.session.data['query-content']
      const section = req.session.data.source

      const queriesPrepFood = req.session.data.queriesPrepFood || []
      queriesPrepFood.push({ textBox, section })
      req.session.data.queriesPrepFood = queriesPrepFood

      let href;

      switch (req.session.data['who-is-question-for-prepfood']) {
        case("Unassigned"):
        href = '/v10/case-review/unassigned-questions';
        break;
        case("Claimant"):
        href = '/v10/case-review/questions-claimant';
        break;
        case("Internal medical support"):
        href = '/v10/case-review/questions-internal-medical-support';
        break;
        case("Internal non medical support"):
        href = '/v10/case-review/questions-internal-non-medical-support';
        break;
        case("External health professional"):
        href = '/v10/case-review/questions-external-medical-health-professional';
        break;
      }

    //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
      req.session.data.queriesPrepFood[req.session.data.queriesPrepFood.length - 1].action = req.session.data['who-is-question-for-prepfood']
      req.session.data.queriesPrepFood[req.session.data.queriesPrepFood.length - 1].href = href;
      res.redirect('/v10/case-review/activities/preparing-food')
      }
    })


  //Start routes for eating and drinking: questions
    router.post('/v10/case-review/activities/taking-nutrition', (req, res, next) => {
        if (req.session.data['who-is-question-for-eating']) {
          console.log('is-this-calling', req.session.data)
          const textBox = req.session.data['query-content']
          const section = req.session.data.source

          const queriesEatDrink = req.session.data.queriesEatDrink || []
          queriesEatDrink.push({ textBox, section })
          req.session.data.queriesEatDrink = queriesEatDrink

          let href;

          switch (req.session.data['who-is-question-for-eating']) {
            case("Unassigned"):
            href = '/v10/case-review/unassigned-questions';
            break;
            case("Claimant"):
            href = '/v10/case-review/questions-claimant';
            break;
            case("Internal medical support"):
            href = '/v10/case-review/questions-internal-medical-support';
            break;
            case("Internal non medical support"):
            href = '/v10/case-review/questions-internal-non-medical-support';
            break;
            case("External health professional"):
            href = '/v10/case-review/questions-external-medical-health-professional';
            break;
          }

        //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
          req.session.data.queriesEatDrink[req.session.data.queriesEatDrink.length - 1].action = req.session.data['who-is-question-for-eating']
          req.session.data.queriesEatDrink[req.session.data.queriesEatDrink.length - 1].href = href;
          res.redirect('/v10/case-review/activities/taking-nutrition')
          }
        })

        //Start routes for managing treatments: questions
          router.post('/v10/case-review/activities/managing-treatments', (req, res, next) => {
              if (req.session.data['who-is-question-for-treatments']) {
                console.log('is-this-calling', req.session.data)
                const textBox = req.session.data['query-content']
                const section = req.session.data.source

                const queriesTreatments = req.session.data.queriesTreatments || []
                queriesTreatments.push({ textBox, section })
                req.session.data.queriesTreatments = queriesTreatments

                let href;

                switch (req.session.data['who-is-question-for-treatments']) {
                  case("Unassigned"):
                  href = '/v10/case-review/unassigned-questions';
                  break;
                  case("Claimant"):
                  href = '/v10/case-review/questions-claimant';
                  break;
                  case("Internal medical support"):
                  href = '/v10/case-review/questions-internal-medical-support';
                  break;
                  case("Internal non medical support"):
                  href = '/v10/case-review/questions-internal-non-medical-support';
                  break;
                  case("External health professional"):
                  href = '/v10/case-review/questions-external-medical-health-professional';
                  break;
                }

              //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
                req.session.data.queriesTreatments[req.session.data.queriesTreatments.length - 1].action = req.session.data['who-is-question-for-treatments']
                req.session.data.queriesTreatments[req.session.data.queriesTreatments.length - 1].href = href;
                res.redirect('/v10/case-review/activities/managing-treatments')

                }
              })


//Start routes for washing and bathing: questions
router.post('/v10/case-review/activities/washing-and-bathing', (req, res, next) => {
    if (req.session.data['who-is-question-for-washing']) {
      console.log('is-this-calling', req.session.data)
      const textBox = req.session.data['query-content']
      const section = req.session.data.source

      const queriesWashing = req.session.data.queriesWashing || []
      queriesWashing.push({ textBox, section })
      req.session.data.queriesWashing = queriesWashing

      let href;

      switch (req.session.data['who-is-question-for-washing']) {
        case("Unassigned"):
        href = '/v10/case-review/unassigned-questions';
        break;
        case("Claimant"):
        href = '/v10/case-review/questions-claimant';
        break;
        case("Internal medical support"):
        href = '/v10/case-review/questions-internal-medical-support';
        break;
        case("Internal non medical support"):
        href = '/v10/case-review/questions-internal-non-medical-support';
        break;
        case("External health professional"):
        href = '/v10/case-review/questions-external-medical-health-professional';
        break;
      }

    //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
      req.session.data.queriesWashing[req.session.data.queriesWashing.length - 1].action = req.session.data['who-is-question-for-washing']
      req.session.data.queriesWashing[req.session.data.queriesWashing.length - 1].href = href;
      res.redirect('/v10/case-review/activities/washing-and-bathing')

      }
    })


//Start routes for managing toilet needs: questions
  router.post('/v10/case-review/activities/managing-toilet-needs', (req, res, next) => {
      if (req.session.data['who-is-question-for-toilet']) {
        console.log('is-this-calling', req.session.data)
        const textBox = req.session.data['query-content']
        const section = req.session.data.source

        const queriesToilet = req.session.data.queriesToilet || []
        queriesToilet.push({ textBox, section })
        req.session.data.queriesToilet = queriesToilet

        let href;

        switch (req.session.data['who-is-question-for-toilet']) {
          case("Unassigned"):
          href = '/v10/case-review/unassigned-questions';
          break;
          case("Claimant"):
          href = '/v10/case-review/questions-claimant';
          break;
          case("Internal medical support"):
          href = '/v10/case-review/questions-internal-medical-support';
          break;
          case("Internal non medical support"):
          href = '/v10/case-review/questions-internal-non-medical-support';
          break;
          case("External health professional"):
          href = '/v10/case-review/questions-external-medical-health-professional';
          break;
        }

          //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
            req.session.data.queriesToilet[req.session.data.queriesToilet.length - 1].action = req.session.data['who-is-question-for-toilet']
            req.session.data.queriesToilet[req.session.data.queriesToilet.length - 1].href = href;
            res.redirect('/v10/case-review/activities/managing-toilet-needs')

            }
          })

    //Start routes for dressing and undressing: questions
      router.post('/v10/case-review/activities/dressing-and-undressing', (req, res, next) => {
          if (req.session.data['who-is-question-for-dressing']) {
            console.log('is-this-calling', req.session.data)
            const textBox = req.session.data['query-content']
            const section = req.session.data.source

            const queriesDressing = req.session.data.queriesDressing || []
            queriesDressing.push({ textBox, section })
            req.session.data.queriesDressing = queriesDressing

            let href;

            switch (req.session.data['who-is-question-for-dressing']) {
              case("Unassigned"):
              href = '/v10/case-review/unassigned-questions';
              break;
              case("Claimant"):
              href = '/v10/case-review/questions-claimant';
              break;
              case("Internal medical support"):
              href = '/v10/case-review/questions-internal-medical-support';
              break;
              case("Internal non medical support"):
              href = '/v10/case-review/questions-internal-non-medical-support';
              break;
              case("External health professional"):
              href = '/v10/case-review/questions-external-medical-health-professional';
              break;
            }

                //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
                  req.session.data.queriesDressing[req.session.data.queriesDressing.length - 1].action = req.session.data['who-is-question-for-dressing']
                  req.session.data.queriesDressing[req.session.data.queriesDressing.length - 1].href = href;
                  res.redirect('/v10/case-review/activities/dressing-and-undressing')

                  }
                })

          //Start routes for talking and understanding: questions
            router.post('/v10/case-review/activities/communicating-verbally', (req, res, next) => {
                if (req.session.data['who-is-question-for-talking']) {
                  console.log('is-this-calling', req.session.data)
                  const textBox = req.session.data['query-content']
                  const section = req.session.data.source

                  const queriesTalking = req.session.data.queriesTalking || []
                  queriesTalking.push({ textBox, section })
                  req.session.data.queriesTalking = queriesTalking

                  let href;

                  switch (req.session.data['who-is-question-for-talking']) {
                    case("Unassigned"):
                    href = '/v10/case-review/unassigned-questions';
                    break;
                    case("Claimant"):
                    href = '/v10/case-review/questions-claimant';
                    break;
                    case("Internal medical support"):
                    href = '/v10/case-review/questions-internal-medical-support';
                    break;
                    case("Internal non medical support"):
                    href = '/v10/case-review/questions-internal-non-medical-support';
                    break;
                    case("External health professional"):
                    href = '/v10/case-review/questions-external-medical-health-professional';
                    break;
                  }

                //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
                  req.session.data.queriesTalking[req.session.data.queriesTalking.length - 1].action = req.session.data['who-is-question-for-talking']
                  req.session.data.queriesTalking[req.session.data.queriesTalking.length - 1].href = href;
                  res.redirect('/v10/case-review/activities/communicating-verbally')

                  }
                })

          //Start routes for Reading and understanding: questions
            router.post('/v10/case-review/activities/reading-and-understanding', (req, res, next) => {
                if (req.session.data['who-is-question-for-reading']) {
                  console.log('is-this-calling', req.session.data)
                  const textBox = req.session.data['query-content']
                  const section = req.session.data.source

                  const queriesReading = req.session.data.queriesReading || []
                  queriesReading.push({ textBox, section })
                  req.session.data.queriesReading = queriesReading

                  let href;

                  switch (req.session.data['who-is-question-for-reading']) {
                    case("Unassigned"):
                    href = '/v10/case-review/unassigned-questions';
                    break;
                    case("Claimant"):
                    href = '/v10/case-review/questions-claimant';
                    break;
                    case("Internal medical support"):
                    href = '/v10/case-review/questions-internal-medical-support';
                    break;
                    case("Internal non medical support"):
                    href = '/v10/case-review/questions-internal-non-medical-support';
                    break;
                    case("External health professional"):
                    href = '/v10/case-review/questions-external-medical-health-professional';
                    break;
                  }

                //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
                  req.session.data.queriesReading[req.session.data.queriesReading.length - 1].action = req.session.data['who-is-question-for-reading']
                  req.session.data.queriesReading[req.session.data.queriesReading.length - 1].href = href;
                  res.redirect('/v10/case-review/activities/reading-and-understanding')

                  }
                })

          //Start routes for Mixing with others: questions
            router.post('/v10/case-review/activities/engaging-face-to-face', (req, res, next) => {
                if (req.session.data['who-is-question-for-mixing-people']) {
                  console.log('is-this-calling', req.session.data)
                  const textBox = req.session.data['query-content']
                  const section = req.session.data.source

                  const queriesMixing = req.session.data.queriesMixing || []
                  queriesMixing.push({ textBox, section })
                  req.session.data.queriesMixing = queriesMixing

                  let href;

                  switch (req.session.data['who-is-question-for-mixing-people']) {
                    case("Unassigned"):
                    href = '/v10/case-review/unassigned-questions';
                    break;
                    case("Claimant"):
                    href = '/v10/case-review/questions-claimant';
                    break;
                    case("Internal medical support"):
                    href = '/v10/case-review/questions-internal-medical-support';
                    break;
                    case("Internal non medical support"):
                    href = '/v10/case-review/questions-internal-non-medical-support';
                    break;
                    case("External health professional"):
                    href = '/v10/case-review/questions-external-medical-health-professional';
                    break;
                  }

                //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
                  req.session.data.queriesMixing[req.session.data.queriesMixing.length - 1].action = req.session.data['who-is-question-for-mixing-people']
                  req.session.data.queriesMixing[req.session.data.queriesMixing.length - 1].href = href;
                  res.redirect('/v10/case-review/activities/engaging-face-to-face')

                  }
                })

      //Start routes for managing money: questions
        router.post('/v10/case-review/activities/managing-money', (req, res, next) => {
            if (req.session.data['who-is-question-for-money']) {
              console.log('is-this-calling', req.session.data)
              const textBox = req.session.data['query-content']
              const section = req.session.data.source

              const queriesMoney = req.session.data.queriesMoney || []
              queriesMoney.push({ textBox, section })
              req.session.data.queriesMoney = queriesMoney

              let href;

              switch (req.session.data['who-is-question-for-money']) {
                case("Unassigned"):
                href = '/v10/case-review/unassigned-questions';
                break;
                case("Claimant"):
                href = '/v10/case-review/questions-claimant';
                break;
                case("Internal medical support"):
                href = '/v10/case-review/questions-internal-medical-support';
                break;
                case("Internal non medical support"):
                href = '/v10/case-review/questions-internal-non-medical-support';
                break;
                case("External health professional"):
                href = '/v10/case-review/questions-external-medical-health-professional';
                break;
              }

            //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
              req.session.data.queriesMoney[req.session.data.queriesMoney.length - 1].action = req.session.data['who-is-question-for-money']
              req.session.data.queriesMoney[req.session.data.queriesMoney.length - 1].href = href;
              res.redirect('/v10/case-review/activities/managing-money')

              }
            })
    //Start routes for planning, following journeys: questions
      router.post('/v10/case-review/activities/planning-and-following-journeys', (req, res, next) => {
          if (req.session.data['who-is-question-for-planning']) {
            console.log('is-this-calling', req.session.data)
            const textBox = req.session.data['query-content']
            const section = req.session.data.source

            const queriesPlanning = req.session.data.queriesPlanning || []
            queriesPlanning.push({ textBox, section })
            req.session.data.queriesPlanning = queriesPlanning

            let href;

            switch (req.session.data['who-is-question-for-planning']) {
              case("Unassigned"):
              href = '/v10/case-review/unassigned-questions';
              break;
              case("Claimant"):
              href = '/v10/case-review/questions-claimant';
              break;
              case("Internal medical support"):
              href = '/v10/case-review/questions-internal-medical-support';
              break;
              case("Internal non medical support"):
              href = '/v10/case-review/questions-internal-non-medical-support';
              break;
              case("External health professional"):
              href = '/v10/case-review/questions-external-medical-health-professional';
              break;
            }

          //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
            req.session.data.queriesPlanning[req.session.data.queriesPlanning.length - 1].action = req.session.data['who-is-question-for-planning']
            req.session.data.queriesPlanning[req.session.data.queriesPlanning.length - 1].href = href;
            res.redirect('/v10/case-review/activities/planning-and-following-journeys')

            }
          })


          //Start routes for moving around: questions
            router.post('/v10/case-review/activities/moving-around', (req, res, next) => {
                if (req.session.data['who-is-question-for-moving']) {
                  console.log('is-this-calling', req.session.data)
                  const textBox = req.session.data['query-content']
                  const section = req.session.data.source

                  const queriesMoving = req.session.data.queriesMoving || []
                  queriesMoving.push({ textBox, section })
                  req.session.data.queriesMoving = queriesMoving

                  let href;

                  switch (req.session.data['who-is-question-for-moving']) {
                    case("Unassigned"):
                    href = '/v10/case-review/unassigned-questions';
                    break;
                    case("Claimant"):
                    href = '/v10/case-review/questions-claimant';
                    break;
                    case("Internal medical support"):
                    href = '/v10/case-review/questions-internal-medical-support';
                    break;
                    case("Internal non medical support"):
                    href = '/v10/case-review/questions-internal-non-medical-support';
                    break;
                    case("External health professional"):
                    href = '/v10/case-review/questions-external-medical-health-professional';
                    break;
                  }

                //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
                  req.session.data.queriesMoving[req.session.data.queriesMoving.length - 1].action = req.session.data['who-is-question-for-moving']
                  req.session.data.queriesMoving[req.session.data.queriesMoving.length - 1].href = href;
                  res.redirect('/v10/case-review/activities/moving-around')

                  }
                })


                //Start routes for additional information: questions
                  router.post('/v10/case-review/additional-information', (req, res, next) => {
                      if (req.session.data['who-is-question-for-add-info']) {
                        console.log('is-this-calling', req.session.data)
                        const textBox = req.session.data['query-content']
                        const section = req.session.data.source

                        const queriesAdditional = req.session.data.queriesAdditional || []
                        queriesAdditional.push({ textBox, section })
                        req.session.data.queriesAdditional = queriesAdditional

                        let href;

                        switch (req.session.data['who-is-question-for-add-info']) {
                          case("Unassigned"):
                          href = '/v10/case-review/unassigned-questions';
                          break;
                          case("Claimant"):
                          href = '/v10/case-review/questions-claimant';
                          break;
                          case("Internal medical support"):
                          href = '/v10/case-review/questions-internal-medical-support';
                          break;
                          case("Internal non medical support"):
                          href = '/v10/case-review/questions-internal-non-medical-support';
                          break;
                          case("External health professional"):
                          href = '/v10/case-review/questions-external-medical-health-professional';
                          break;
                        }

                      //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
                        req.session.data.queriesAdditional[req.session.data.queriesAdditional.length - 1].action = req.session.data['who-is-question-for-add-info']
                        req.session.data.queriesAdditional[req.session.data.queriesAdditional.length - 1].href = href;
                        res.redirect('/v10/case-review/additional-information')

                        }
                      })


      //Routes for query condtion1
      router.post('/v10/case-review/condition-one', (req, res, next) => {
          if (req.session.data['who-is-question-for-cond-one']) {
            console.log('is-this-calling', req.session.data)
            const textBox = req.session.data['query-content']
            const section = req.session.data.source

            const queriesConditionOne = req.session.data.queriesConditionOne || []
            queriesConditionOne.push({ textBox, section })
            req.session.data.queriesConditionOne = queriesConditionOne

            let href;

            switch (req.session.data['who-is-question-for-cond-one']) {
              case("Unassigned"):
              href = '/v10/case-review/unassigned-questions';
              break;
              case("Claimant"):
              href = '/v10/case-review/questions-claimant';
              break;
              case("Internal medical support"):
              href = '/v10/case-review/questions-internal-medical-support';
              break;
              case("Internal non medical support"):
              href = '/v10/case-review/questions-internal-non-medical-support';
              break;
              case("External health professional"):
              href = '/v10/case-review/questions-external-medical-health-professional';
              break;
            }

          //  req.session.data.queriesConditionOne[req.session.data.queriesConditionOne.length - 1].content = req.session.data['query-content']
            req.session.data.queriesConditionOne[req.session.data.queriesConditionOne.length - 1].action = req.session.data['who-is-question-for-cond-one']
            req.session.data.queriesConditionOne[req.session.data.queriesConditionOne.length - 1].href = href;
            res.redirect('/v10/case-review/condition-one')

            }
          })

        //Routes for query condtion2
        router.post('/v10/case-review/condition-two', (req, res, next) => {
            if (req.session.data['who-is-question-for-cond-two']) {
              console.log('is-this-calling', req.session.data)
              const textBox = req.session.data['query-content']
              const section = req.session.data.source

              const queriesConditionTwo = req.session.data.queriesConditionTwo || []
              queriesConditionTwo.push({ textBox, section })
              req.session.data.queriesConditionTwo = queriesConditionTwo

              let href;

              switch (req.session.data['who-is-question-for-cond-two']) {
                case("Unassigned"):
                href = '/v10/case-review/unassigned-questions';
                break;
                case("Claimant"):
                href = '/v10/case-review/questions-claimant';
                break;
                case("Internal medical support"):
                href = '/v10/case-review/questions-internal-medical-support';
                break;
                case("Internal non medical support"):
                href = '/v10/case-review/questions-internal-non-medical-support';
                break;
                case("External health professional"):
                href = '/v10/case-review/questions-external-medical-health-professional';
                break;
              }

            //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
              req.session.data.queriesConditionTwo[req.session.data.queriesConditionTwo.length - 1].action = req.session.data['who-is-question-for-cond-two']
              req.session.data.queriesConditionTwo[req.session.data.queriesConditionTwo.length - 1].href = href;
              res.redirect('/v10/case-review/condition-two')

              }
        })

        //Routes for query condtion3
        router.post('/v10/case-review/condition-three', (req, res, next) => {
            if (req.session.data['who-is-question-for-cond-three']) {
              console.log('is-this-calling', req.session.data)
              const textBox = req.session.data['query-content']
              const section = req.session.data.source

              const queriesConditionThree = req.session.data.queriesConditionThree || []
              queriesConditionThree.push({ textBox, section })
              req.session.data.queriesConditionThree = queriesConditionThree

              let href;

              switch (req.session.data['who-is-question-for-cond-three']) {
                case("Unassigned"):
                href = '/v10/case-review/unassigned-questions';
                break;
                case("Claimant"):
                href = '/v10/case-review/questions-claimant';
                break;
                case("Internal medical support"):
                href = '/v10/case-review/questions-internal-medical-support';
                break;
                case("Internal non medical support"):
                href = '/v10/case-review/questions-internal-non-medical-support';
                break;
                case("External health professional"):
                href = '/v10/case-review/questions-external-medical-health-professional';
                break;
              }

            //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
              req.session.data.queriesConditionThree[req.session.data.queriesConditionThree.length - 1].action = req.session.data['who-is-question-for-cond-three']
              req.session.data.queriesConditionThree[req.session.data.queriesConditionThree.length - 1].href = href;
              res.redirect('/v10/case-review/condition-three')

              }
        })

        //Routes for query condtion4
        router.post('/v10/case-review/condition-four', (req, res, next) => {
            if (req.session.data['who-is-question-for-cond-four']) {
              console.log('is-this-calling', req.session.data)
              const textBox = req.session.data['query-content']
              const section = req.session.data.source

              const queriesConditionFour = req.session.data.queriesConditionFour || []
              queriesConditionFour.push({ textBox, section })
              req.session.data.queriesConditionFour = queriesConditionFour

              let href;

              switch (req.session.data['who-is-question-for-cond-four']) {
                case("Unassigned"):
                href = '/v10/case-review/unassigned-questions';
                break;
                case("Claimant"):
                href = '/v10/case-review/questions-claimant';
                break;
                case("Internal medical support"):
                href = '/v10/case-review/questions-internal-medical-support';
                break;
                case("Internal non medical support"):
                href = '/v10/case-review/questions-internal-non-medical-support';
                break;
                case("External health professional"):
                href = '/v10/case-review/questions-external-medical-health-professional';
                break;
              }

            //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
              req.session.data.queriesConditionFour[req.session.data.queriesConditionFour.length - 1].action = req.session.data['who-is-question-for-cond-four']
              req.session.data.queriesConditionFour[req.session.data.queriesConditionFour.length - 1].href = href;
              res.redirect('/v10/case-review/condition-four')

              }
        })

        //Routes for query condtion5
        router.post('/v10/case-review/condition-five', (req, res, next) => {
            if (req.session.data['who-is-question-for-cond-five']) {
              console.log('is-this-calling', req.session.data)
              const textBox = req.session.data['query-content']
              const section = req.session.data.source

              const queriesConditionFive = req.session.data.queriesConditionFive || []
              queriesConditionFive.push({ textBox, section })
              req.session.data.queriesConditionFive = queriesConditionFive

              let href;

              switch (req.session.data['who-is-question-for-cond-five']) {
                case("Unassigned"):
                href = '/v10/case-review/unassigned-questions';
                break;
                case("Claimant"):
                href = '/v10/case-review/questions-claimant';
                break;
                case("Internal medical support"):
                href = '/v10/case-review/questions-internal-medical-support';
                break;
                case("Internal non medical support"):
                href = '/v10/case-review/questions-internal-non-medical-support';
                break;
                case("External health professional"):
                href = '/v10/case-review/questions-external-medical-health-professional';
                break;
              }

            //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
              req.session.data.queriesConditionFive[req.session.data.queriesConditionFive.length - 1].action = req.session.data['who-is-question-for-cond-five']
              req.session.data.queriesConditionFive[req.session.data.queriesConditionFive.length - 1].href = href;
              res.redirect('/v10/case-review/condition-five')

              }
        })

        //Routes for query condtion6
        router.post('/v10/case-review/condition-six', (req, res, next) => {
            if (req.session.data['who-is-question-for-cond-six']) {
              console.log('is-this-calling', req.session.data)
              const textBox = req.session.data['query-content']
              const section = req.session.data.source

              const queriesConditionSix = req.session.data.queriesConditionSix || []
              queriesConditionSix.push({ textBox, section })
              req.session.data.queriesConditionSix = queriesConditionSix

              let href;

              switch (req.session.data['who-is-question-for-cond-six']) {
                case("Unassigned"):
                href = '/v10/case-review/unassigned-questions';
                break;
                case("Claimant"):
                href = '/v10/case-review/questions-claimant';
                break;
                case("Internal medical support"):
                href = '/v10/case-review/questions-internal-medical-support';
                break;
                case("Internal non medical support"):
                href = '/v10/case-review/questions-internal-non-medical-support';
                break;
                case("External health professional"):
                href = '/v10/case-review/questions-external-medical-health-professional';
                break;
              }

            //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
              req.session.data.queriesConditionSix[req.session.data.queriesConditionSix.length - 1].action = req.session.data['who-is-question-for-cond-six']
              req.session.data.queriesConditionSix[req.session.data.queriesConditionSix.length - 1].href = href;
              res.redirect('/v10/case-review/condition-six')

              }
        })


        //Routes for query condtion7
        router.post('/v10/case-review/condition-seven', (req, res, next) => {
            if (req.session.data['who-is-question-for-cond-seven']) {
              console.log('is-this-calling', req.session.data)
              const textBox = req.session.data['query-content']
              const section = req.session.data.source

              const queriesConditionSeven = req.session.data.queriesConditionSeven || []
              queriesConditionSeven.push({ textBox, section })
              req.session.data.queriesConditionSeven = queriesConditionSeven

              let href;

              switch (req.session.data['who-is-question-for-cond-seven']) {
                case("Unassigned"):
                href = '/v10/case-review/unassigned-questions';
                break;
                case("Claimant"):
                href = '/v10/case-review/questions-claimant';
                break;
                case("Internal medical support"):
                href = '/v10/case-review/questions-internal-medical-support';
                break;
                case("Internal non medical support"):
                href = '/v10/case-review/questions-internal-non-medical-support';
                break;
                case("External health professional"):
                href = '/v10/case-review/questions-external-medical-health-professional';
                break;
              }

            //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
              req.session.data.queriesConditionSeven[req.session.data.queriesConditionSeven.length - 1].action = req.session.data['who-is-question-for-cond-seven']
              req.session.data.queriesConditionSeven[req.session.data.queriesConditionSeven.length - 1].href = href;
              res.redirect('/v10/case-review/condition-seven')

              }
        })


        //Routes for query condtion8
        router.post('/v10/case-review/condition-eight', (req, res, next) => {
            if (req.session.data['who-is-question-for-cond-eight']) {
              console.log('is-this-calling', req.session.data)
              const textBox = req.session.data['query-content']
              const section = req.session.data.source

              const queriesConditionEight = req.session.data.queriesConditionEight || []
              queriesConditionEight.push({ textBox, section })
              req.session.data.queriesConditionEight = queriesConditionEight

              let href;

              switch (req.session.data['who-is-question-for-cond-eight']) {
                case("Unassigned"):
                href = '/v10/case-review/unassigned-questions';
                break;
                case("Claimant"):
                href = '/v10/case-review/questions-claimant';
                break;
                case("Internal medical support"):
                href = '/v10/case-review/questions-internal-medical-support';
                break;
                case("Internal non medical support"):
                href = '/v10/case-review/questions-internal-non-medical-support';
                break;
                case("External health professional"):
                href = '/v10/case-review/questions-external-medical-health-professional';
                break;
              }

            //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
              req.session.data.queriesConditionEight[req.session.data.queriesConditionEight.length - 1].action = req.session.data['who-is-question-for-cond-eight']
              req.session.data.queriesConditionEight[req.session.data.queriesConditionEight.length - 1].href = href;
              res.redirect('/v10/case-review/condition-eight')

              }
        })



//Start routes for scoring -- Old  stuff???********************************************************************************
router.post('/v10/case-review/set-descriptor', (req, res, next) => {
  //  if (req.session.data['set-descriptor'] == "Can prepare and cook a simple meal unaided" ) {
    console.log('/v10/case-review/set-descriptor', req.session.data)
    const descriptor = req.session.data['set-descriptor']

        let points;

        switch (req.session.data['set-descriptor']) {
          case('Can prepare and cook a simple meal unaided'):
          points = '0';
          break;
          case('Needs to use an aid or appliance to be able to either prepare or cook a simple meal'):
          points = '2';
          break;
          case('Cannot cook a simple meal using a conventional cooker but is able to do so using a microwave'):
          points = '2';
          break;
          case('Needs prompting to be able to either prepare or cook a simple meal'):
          points = '2';
          break;
          case('Needs supervision or assistance to either prepare or cook a simple meal'):
          points = '4';
          break;
          case('Cannot prepare and cook food at all'):
          points = '8';
          break;
        }

     const scoresChoice = req.session.data.scoresChoice || []
     scoresChoice.push({ descriptor, points })
      req.session.data.scoresChoice = scoresChoice
      res.redirect('/v10/case-review/review-activity-descriptors')
    //}
})

router.post('/v10/case-review/review-activity-descriptors', (req, res, next) => {
  console.log('this is scoring')
  console.log(req.session.data)

  req.session.data.scoresChoice[req.session.data.scoresChoice.length - 1].points = points;

  console.log(1, req.session.data.scoresChoice)
  res.redirect('/v10/case-review/review-activity-descriptors')
})


//Create query taking nutrition activity
router.post('/v10/case-review/activities/taking-nutrition', (req, res, next) => {
  console.log('/v10/case-review/activities/taking-nutrition', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/v10/case-review/set-action/set-action-taking-nutrition')
})

router.post('/v10/case-review/set-action/set-action-taking-nutrition', (req, res, next) => {
  console.log('this is taking nutrition')
  console.log(req.session.data)
  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/v10/case-review/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/v10/case-review/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/v10/case-review/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/v10/case-review/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/v10/case-review/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/v10/case-review/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-30-35/activities/taking-nutrition')
})

//Create query managing Treatments activity
router.post('/v10/case-review/activities/managing-treatments', (req, res, next) => {
  console.log('/v10/case-review/activities/managing-treatments', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/v10/case-review/set-action/set-action-managing-treatments')
})

router.post('/v10/case-review/set-action/set-action-managing-treatments', (req, res, next) => {
  console.log('this is managing treatments')
  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/v10/case-review/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/v10/case-review/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/v10/case-review/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/v10/case-review/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/v10/case-review/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/v10/case-review/none-these-action';
    break;
  }

  console.log(req.session.data)
  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/v10/case-review/activities/managing-treatments')
})

//Create query washing and bathing activity
router.post('/v10/case-review/activities/washing-and-bathing', (req, res, next) => {
  console.log('/v10/case-review/activities/washing-and-bathing', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/v10/case-review/set-action/set-action-washing-and-bathing')
})

router.post('/v10/case-review/set-action/set-action-washing-and-bathing', (req, res, next) => {
  console.log('this is washing and bathing')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/v10/case-review/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/v10/case-review/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/v10/case-review/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/v10/case-review/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/v10/case-review/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/v10/case-review/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/v10/case-review/activities/washing-and-bathing')
})

//Create query managing toilet needs activity
router.post('/v10/case-review/activities/managing-toilet-needs', (req, res, next) => {
  console.log('/v10/case-review/activities/managing-toilet-needs', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/v10/case-review/set-action/set-action-managing-toilet-needs')
})

router.post('/v10/case-review/set-action/set-action-managing-toilet-needs', (req, res, next) => {
  console.log('this is managing toilet needs')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/v10/case-review/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/v10/case-review/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/v10/case-review/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/v10/case-review/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/v10/case-review/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/v10/case-review/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/v10/case-review/activities/managing-toilet-needs')
})

//Create query dressing and undressing activity
router.post('/v10/case-review/activities/dressing-and-undressing', (req, res, next) => {
  console.log('/v10/case-review/activities/dressing-and-undressing', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/v10/case-review/set-action/set-action-dressing-and-undressing')
})

router.post('/v10/case-review/set-action/set-action-dressing-and-undressing', (req, res, next) => {
  console.log('this is dressing and undressing')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/v10/case-review/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/v10/case-review/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/v10/case-review/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/v10/case-review/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/v10/case-review/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/v10/case-review/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/v10/case-review/activities/dressing-and-undressing')
})

//Create query communicating verbally activity
router.post('/v10/case-review/activities/communicating-verbally', (req, res, next) => {
  console.log('/v10/case-review/activities/communicating-verbally', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/v10/case-review/set-action/set-action-communicating-verbally')
})

router.post('/v10/case-review/set-action/set-action-communicating-verbally', (req, res, next) => {
  console.log('this is communicating verbally')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/v10/case-review/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/v10/case-review/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/v10/case-review/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/v10/case-review/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/v10/case-review/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/v10/case-review/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/v10/case-review/activities/communicating-verbally')
})

//Create query reading and understanding activity
router.post('/v10/case-review/activities/reading-and-understanding', (req, res, next) => {
  console.log('/v10/case-review/activities/reading-and-understanding', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/v10/case-review/set-action/set-action-reading-and-understanding')
})

router.post('/v10/case-review/set-action/set-action-reading-and-understanding', (req, res, next) => {
  console.log('this is reading and understanding')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/v10/case-review/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/v10/case-review/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/v10/case-review/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/v10/case-review/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/v10/case-review/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/v10/case-review/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/v10/case-review/activities/reading-and-understanding')
})

//Create query engaging face to face activity
router.post('/v10/case-review/activities/engaging-face-to-face', (req, res, next) => {
  console.log('/v10/case-review/activities/engaging-face-to-face', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/v10/case-review/set-action/set-action-engage-face-to-face')
})

router.post('/v10/case-review/set-action/set-action-engage-face-to-face', (req, res, next) => {
  console.log('this is engaging face to face')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/v10/case-review/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/v10/case-review/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/v10/case-review/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/v10/case-review/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/v10/case-review/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/v10/case-review/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/v10/case-review/activities/engaging-face-to-face')
})

//Create query managing money activity
router.post('/v10/case-review/activities/managing-money', (req, res, next) => {
  console.log('/v10/case-review/activities/managing-money', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/v10/case-review/set-action/set-action-managing-money')
})

router.post('/v10/case-review/set-action/set-action-managing-money', (req, res, next) => {
  console.log('this is managing-money')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/v10/case-review/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/v10/case-review/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/v10/case-review/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/v10/case-review/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/v10/case-review/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/v10/case-review/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/v10/case-review/activities/managing-money')
})

//Create query planning and following journeys activity
router.post('/v10/case-review/activities/planning-and-following-journeys', (req, res, next) => {
  console.log('/v10/case-review/activities/planning-and-following-journeys', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/v10/case-review/set-action/set-action-planning-and-following-journeys')
})

router.post('/v10/case-review/set-action/set-action-planning-and-following-journeys', (req, res, next) => {
  console.log('this is planning and following journeys')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/v10/case-review/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/v10/case-review/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/v10/case-review/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/v10/case-review/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/v10/case-review/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/v10/case-review/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/v10/case-review/activities/planning-and-following-journeys')
})

//Create query moving around activity
router.post('/v10/case-review/activities/moving-around', (req, res, next) => {
  console.log('/v10/case-review/activities/moving-around', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/v10/case-review/set-action/set-action-moving-around')
})

router.post('/v10/case-review/set-action/set-action-moving-around', (req, res, next) => {
  console.log('this is moving around')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/v10/case-review/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/v10/case-review/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/v10/case-review/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/v10/case-review/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/v10/case-review/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/v10/case-review/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/v10/case-review/activities/moving-around')
})

//**************************************************************************************************************************************
//Routes for queries linked to Evidence number 1

router.post('/v10/case-review/evidence-detail', (req, res, next) => {
    if (req.session.data['evidence-one-note'] == "question-about-this-condition" ) {
      console.log('/v10/case-review/evidence-detail', req.session.data)
      const name = req.session.data['evidence-query']
      const section = req.session.data.source

      const queriesEvidence = req.session.data.queriesEvidence || []
      queriesEvidence.push({ name, section })
      req.session.data.queriesEvidence = queriesEvidence
      res.redirect('/v10/case-review/set-action/set-action-evidence')

    } else if (req.session.data['evidence-one-note'] == "important-to-this-case" ) {
        //Routes for tagged documents linked to Evidence
            console.log('/v10/case-review/evidence-detail', req.session.data)
            const name = req.session.data['evidence-query']
            //const pageURL = req.session.data['page-URL'][1]['contact-claimant-page']
            //console.log(pageURL)
            const section = req.session.data.source

            const conditionsEvidenceOne = req.session.data.conditionsEvidenceOne || []
            conditionsEvidenceOne.push({ name, section })
            req.session.data.conditionsEvidenceOne = conditionsEvidenceOne
            res.redirect('/v10/case-review/tagging-evidence/evidence-one')

  } else {
    console.log('/v10/case-review/evidence-detail', req.session.data)
    const name = req.session.data['out-of-scope']
    const scopeEvidenceOne = req.session.data['query-content']
    const section = req.session.data.source

    const outScopeEvidenceOne = req.session.data.outScopeEvidenceOne || []
    outScopeEvidenceOne.push({ name, section, scopeEvidenceOne })
    req.session.data.outScopeEvidenceOne = outScopeEvidenceOne
    res.redirect('/v10/case-review/evidence-detail')

    }
    })

// follow up for tagging important info: evidence one
    router.post('/v10/case-review/tagging-evidence/evidence-one', (req, res, next) => {
      console.log('this is evidence one')
      console.log(req.session.data)
      req.session.data.conditionsEvidenceOne[req.session.data.conditionsEvidenceOne.length - 1].evidenceNoteOne = req.session.data['query-content']
      req.session.data.conditionsEvidenceOne[req.session.data.conditionsEvidenceOne.length - 1].action = req.session.data['tagConditionEvidence']
      //req.session.data.conditionsEvidence[req.session.data.conditionsEvidence.length - 1].page = req.session.data['page-URL'][1]['contact-claimant-page']
      console.log(1, req.session.data.conditionsEvidenceOne)
      res.redirect('/v10/case-review/evidence-detail')
    })

// follow up route for linking queries to evidence number 1
router.post('/v10/case-review/set-action/set-action-evidence', (req, res, next) => {
  console.log('this is evidence query')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/v10/case-review/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/v10/case-review/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/v10/case-review/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/v10/case-review/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/v10/case-review/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/v10/case-review/none-these-action';
    break;
  }

  req.session.data.queriesEvidence[req.session.data.queriesEvidence.length - 1].evidence = req.session.data['query-content']
  req.session.data.queriesEvidence[req.session.data.queriesEvidence.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesEvidence[req.session.data.queriesEvidence.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/v10/case-review/evidence-detail')
})

// follow up roiute for out of scope: evidence one
router.post('/v10/case-review/evidence-detail', (req, res, next) => {
  console.log('this is evidence one out of scope')
  console.log(req.session.data)

  req.session.data.outScopeEvidenceOne[req.session.data.outScopeEvidenceOne.length - 1].scopeEvidenceOne = req.session.data['query-content']
//  req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].action = req.session.data['set-an-action']
  //req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/v10/case-review/evidence-detail')
})

//Routes for queries linked to Evidence number 2

router.post('/v10/case-review/evidence-detail-two', (req, res, next) => {
    if (req.session.data['evidence-note-two'] == "question-about-this-condition" ) {
      console.log('/v10/case-review/evidence-detail', req.session.data)
      const name = req.session.data['evidence-query']
      const section = req.session.data.source

      const queriesEvidenceTwo = req.session.data.queriesEvidenceTwo || []
      queriesEvidenceTwo.push({ name, section })
      req.session.data.queriesEvidenceTwo = queriesEvidenceTwo
      res.redirect('/v10/case-review/set-action/set-action-evidence-two')

    } else if (req.session.data['evidence-note-two'] == "important-to-this-case" ) {
        //Routes for tagged documents linked to Evidence
            console.log('/v10/case-review/evidence-detail-two', req.session.data)
            const name = req.session.data['query-content']
            //const pageURL = req.session.data['page-URL'][1]['contact-claimant-page']
            //console.log(pageURL)
            const section = req.session.data.source

            const conditionsEvidence = req.session.data.conditionsEvidence || []
            conditionsEvidence.push({ name, section })
            req.session.data.conditionsEvidence = conditionsEvidence
            res.redirect('/v10/case-review/tagging-evidence/evidence-two')

  } else {
    console.log('/v10/case-review/evidence-detail-two', req.session.data)
    const name = req.session.data['out-of-scope']
    const scopeEvidenceTwo = req.session.data['query-content']
    const section = req.session.data.source

    const outScopeEvidenceTwo = req.session.data.outScopeEvidenceTwo || []
    outScopeEvidenceTwo.push({ name, section, scopeEvidenceTwo })
    req.session.data.outScopeEvidenceTwo = outScopeEvidenceTwo
    res.redirect('/v10/case-review/evidence-detail-two')

    }
    })

// follow up for tagging important info: evidence two
    router.post('/v10/case-review/tagging-evidence/evidence-two', (req, res, next) => {
      console.log('this is evidence')
      console.log(req.session.data)
      req.session.data.conditionsEvidence[req.session.data.conditionsEvidence.length - 1].evidenceNote = req.session.data['query-content']
      req.session.data.conditionsEvidence[req.session.data.conditionsEvidence.length - 1].action = req.session.data['tagConditionEvidence']
      //req.session.data.conditionsEvidence[req.session.data.conditionsEvidence.length - 1].page = req.session.data['page-URL'][1]['contact-claimant-page']
      console.log(1, req.session.data.conditionsEvidence)
      res.redirect('/v10/case-review/evidence-detail-two')
    })

// follow up route for linking queries to evidence number two
router.post('/v10/case-review/set-action/set-action-evidence-two', (req, res, next) => {
  console.log('this is evidence query')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/v10/case-review/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/v10/case-review/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/v10/case-review/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/v10/case-review/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/v10/case-review/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/v10/case-review/none-these-action';
    break;
  }

  req.session.data.queriesEvidenceTwo[req.session.data.queriesEvidenceTwo.length - 1].evidence = req.session.data['query-content']
  req.session.data.queriesEvidenceTwo[req.session.data.queriesEvidenceTwo.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesEvidenceTwo[req.session.data.queriesEvidenceTwo.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/v10/case-review/evidence-detail-two')
})

// follow up route for out of scope: evidence two
router.post('/v10/case-review/evidence-detail-two', (req, res, next) => {
  console.log('this is evidence two out of scope')
  console.log(req.session.data)

  req.session.data.outScopeEvidenceTwo[req.session.data.outScopeEvidenceTwo.length - 1].scopeEvidenceTwo = req.session.data['query-content']
//  req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].action = req.session.data['set-an-action']
  //req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/v10/case-review/evidence-detail-two')
})
//Routes for queries appearing on action page

router.post('/v10/case-review/contact-claimant-action', (req, res, next) => {
  console.log('/v10/case-review/contact-claimant-action', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/v10/case-review/contact-claimant-action')
})

router.post('/v10/case-review/contact-claimant-action', (req, res, next) => {
  console.log('this is contact claimant action')
  console.log(req.session.data)
  req.session.data.queries[req.session.data.queries.length - 1].contentQ = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  console.log(1, req.session.data)
  res.redirect('/v10/case-review/contact-claimant-action')
})
//******** -- End of v10**********************************************************************************************



//Sprint 41//*************************************************************************************************************
// Referral assessment route //

router.post('/sprint-41/minimum-viable-product/ready-to-make-next-step', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var makearecommendation = req.session.data['next-step']

  // Check whether the variable matches a condition
  if (makearecommendation == "Send case for a decision"){
    // Send user to decision page
    res.redirect('decision')
  } else {
    // Send user to referral page
    res.redirect('refer')
  }

})

        //Start routes for the 'adding a question' journey (collated questions view)
        router.post('/sprint-41/minimum-viable-product/question-add', (req, res, next) => {
            if (req.session.data['question-for']) {
              console.log('is-this-calling-questions', req.session.data)
              const questionBox = req.session.data['question']
              const answerBox = req.session.data['answer']
              const answeredQuestion = req.session.data['answered-question']
            //  let answered = '<td class="govuk-table__cell"><strong class="govuk-tag app-task-list__tag" id="claimant">Answered</strong></td>'
              const section = req.session.data.source

              const queriesQuestions = req.session.data.queriesQuestions || []
              queriesQuestions.push({ answerBox, questionBox, answeredQuestion, section })
              req.session.data.queriesQuestions = queriesQuestions

              let href;

              switch (req.session.data['question-for']) {
                case("Unassigned"):
                href = '/sprint-41/minimum-viable-product/questions-claimant';
                break;
                case("Claimant"):
                href = '/sprint-41/minimum-viable-product/questions-health-professional';
                break;
                case("Internal medical support"):
                href = '/sprint-41/minimum-viable-product/unassigned-questions';
                break;
                case("Internal non medical support"):
                href = '/sprint-41/minimum-viable-product/unassigned-questions';
                break;
                case("External healthcare professional"):
                href = '/sprint-41/minimum-viable-product/unassigned-questions';
                break;
              }

            //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
              req.session.data.queriesQuestions[req.session.data.queriesQuestions.length - 1].action = req.session.data['question-for']
              //req.session.data.queriesQuestions[req.session.data.queriesQuestions.length - 1].answered = answered;
              req.session.data.queriesQuestions[req.session.data.queriesQuestions.length - 1].href = href;
              res.redirect('/sprint-41/minimum-viable-product/questions-claimant')
              }
            })

            //Adding a question to unassigned questions
            router.post('/sprint-41/minimum-viable-product/question-unassigned-add', (req, res, next) => {
                if (req.session.data['question-for-unassigned']) {
                  console.log('is-this-calling-questions', req.session.data)
                  const questionBox = req.session.data['question']
                  const answerBox = req.session.data['answer']
                  const answeredQuestion = req.session.data['answered-question']
                //  let answered = '<td class="govuk-table__cell"><strong class="govuk-tag app-task-list__tag" id="claimant">Answered</strong></td>'
                  const section = req.session.data.source

                  const queriesQuestionsUnassigned = req.session.data.queriesQuestionsUnassigned || []
                  queriesQuestionsUnassigned.push({ answerBox, questionBox, answeredQuestion, section })
                  req.session.data.queriesQuestionsUnassigned = queriesQuestionsUnassigned

                  let href;

                  switch (req.session.data['question-for-unassigned']) {
                    case("Unassigned"):
                    href = '/sprint-41/minimum-viable-product/questions-claimant';
                    break;
                    case("Claimant"):
                    href = '/sprint-41/minimum-viable-product/questions-health-professional';
                    break;
                    case("Internal medical support"):
                    href = '/sprint-41/minimum-viable-product/unassigned-questions';
                    break;
                    case("Internal non medical support"):
                    href = '/sprint-41/minimum-viable-product/unassigned-questions';
                    break;
                    case("External healthcare professional"):
                    href = '/sprint-41/minimum-viable-product/unassigned-questions';
                    break;
                  }

                //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
                  req.session.data.queriesQuestionsUnassigned[req.session.data.queriesQuestionsUnassigned.length - 1].action = req.session.data['question-for-unassigned']
                  //req.session.data.queriesQuestions[req.session.data.queriesQuestions.length - 1].answered = answered;
                  req.session.data.queriesQuestionsUnassigned[req.session.data.queriesQuestionsUnassigned.length - 1].href = href;
                  res.redirect('/sprint-41/minimum-viable-product/unassigned-questions')
                  }
                })

          // Add a question for internal medical support
            router.post('/sprint-41/minimum-viable-product/question-internal-medical-support-add', (req, res, next) => {
                if (req.session.data['question-for-internal-medical-support']) {
                  console.log('is-this-calling-questions', req.session.data)
                  const questionBox = req.session.data['question']
                  const answerBox = req.session.data['answer']
                  const answeredQuestion = req.session.data['answered-question']
                  const section = req.session.data.source

                  const queriesQuestionsMedSupport = req.session.data.queriesQuestionsMedSupport || []
                  queriesQuestionsMedSupport.push({ answerBox, questionBox, answeredQuestion, section })
                  req.session.data.queriesQuestionsMedSupport = queriesQuestionsMedSupport

                  let href;

                  switch (req.session.data['question-for-internal-medical-support']) {
                    case("Unassigned"):
                    href = '/sprint-41/minimum-viable-product/questions-claimant';
                    break;
                    case("Claimant"):
                    href = '/sprint-41/minimum-viable-product/questions-health-professional';
                    break;
                    case("Internal medical support"):
                    href = '/sprint-41/minimum-viable-product/unassigned-questions';
                    break;
                    case("Internal non medical support"):
                    href = '/sprint-41/minimum-viable-product/unassigned-questions';
                    break;
                    case("External healthcare professional"):
                    href = '/sprint-41/minimum-viable-product/unassigned-questions';
                    break;
                  }

                //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
                  req.session.data.queriesQuestionsMedSupport[req.session.data.queriesQuestionsMedSupport.length - 1].action = req.session.data['question-for-internal-medical-support']
                  req.session.data.queriesQuestionsMedSupport[req.session.data.queriesQuestionsMedSupport.length - 1].href = href;
                  res.redirect('/sprint-41/minimum-viable-product/questions-internal-medical-support')

                  }
                })

                // Add a question for external healthcare professional
                  router.post('/sprint-41/minimum-viable-product/question-external-medical-add', (req, res, next) => {
                      if (req.session.data['question-for-external-healthcare-professional']) {
                        console.log('is-this-calling-questions', req.session.data)
                        const questionBox = req.session.data['question']
                        const answerBox = req.session.data['answer']
                        const answeredQuestion = req.session.data['answered-question']
                        const section = req.session.data.source

                        const queriesQuestionsExternalMedical = req.session.data.queriesQuestionsExternalMedical || []
                        queriesQuestionsExternalMedical.push({ answerBox, questionBox, answeredQuestion, section })
                        req.session.data.queriesQuestionsExternalMedical = queriesQuestionsExternalMedical

                        let href;

                        switch (req.session.data['question-for-internal-medical-support']) {
                          case("Unassigned"):
                          href = '/sprint-41/minimum-viable-product/questions-claimant';
                          break;
                          case("Claimant"):
                          href = '/sprint-41/minimum-viable-product/questions-health-professional';
                          break;
                          case("Internal medical support"):
                          href = '/sprint-41/minimum-viable-product/unassigned-questions';
                          break;
                          case("Internal non medical support"):
                          href = '/sprint-41/minimum-viable-product/unassigned-questions';
                          break;
                          case("External healthcare professional"):
                          href = '/sprint-41/minimum-viable-product/unassigned-questions';
                          break;
                        }

                      //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
                        req.session.data.queriesQuestionsExternalMedical[req.session.data.queriesQuestionsExternalMedical.length - 1].action = req.session.data['question-for-external-healthcare-professional']
                        req.session.data.queriesQuestionsExternalMedical[req.session.data.queriesQuestionsExternalMedical.length - 1].href = href;
                        res.redirect('/sprint-41/minimum-viable-product/questions-external-medical-healthcare-professional')
                        }
                      })

                      // Add a question for internal non medical support
                        router.post('/sprint-41/minimum-viable-product/question-internal-non-medical-add', (req, res, next) => {
                            if (req.session.data['question-for-non-medical-support']) {
                              console.log('is-this-calling-questions', req.session.data)
                              const questionBox = req.session.data['question']
                              const answerBox = req.session.data['answer']
                              const answeredQuestion = req.session.data['answered-question']
                              const section = req.session.data.source

                              const queriesQuestionsNonMedical = req.session.data.queriesQuestionsNonMedical || []
                              queriesQuestionsNonMedical.push({ answerBox, questionBox, answeredQuestion, section })
                              req.session.data.queriesQuestionsNonMedical = queriesQuestionsNonMedical

                              let href;

                              switch (req.session.data['question-for-internal-medical-support']) {
                                case("Unassigned"):
                                href = '/sprint-41/minimum-viable-product/questions-claimant';
                                break;
                                case("Claimant"):
                                href = '/sprint-41/minimum-viable-product/questions-health-professional';
                                break;
                                case("Internal medical support"):
                                href = '/sprint-41/minimum-viable-product/unassigned-questions';
                                break;
                                case("Internal non medical support"):
                                href = '/sprint-41/minimum-viable-product/unassigned-questions';
                                break;
                                case("External healthcare professional"):
                                href = '/sprint-41/minimum-viable-product/unassigned-questions';
                                break;
                              }

                            //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
                              req.session.data.queriesQuestionsNonMedical[req.session.data.queriesQuestionsNonMedical.length - 1].action = req.session.data['question-for-non-medical-support']
                              req.session.data.queriesQuestionsNonMedical[req.session.data.queriesQuestionsNonMedical.length - 1].href = href;
                              res.redirect('/sprint-41/minimum-viable-product/questions-internal-non-medical-support')

                              }
                            })

            //Start routes for the 'adding a question' journey (collated questions view)
            router.post('/sprint-41/minimum-viable-product/question-link', (req, res, next) => {
                if (req.session.data['question-for']) {
                  console.log('is-this-calling-questions', req.session.data)
                  const questionBox = req.session.data['question']
                  const answerBox = req.session.data['answer']
                  const answeredQuestion = req.session.data['answered-question']
                  const section = req.session.data.source

                  const queriesQuestions = req.session.data.queriesQuestions || []
                  queriesQuestions.push({ answerBox, questionBox, answeredQuestion, section })
                  req.session.data.queriesQuestions = queriesQuestions

                  let href;

                  switch (req.session.data['question-for']) {
                    case("Unassigned"):
                    href = '/sprint-41/minimum-viable-product/questions-claimant';
                    break;
                    case("Claimant"):
                    href = '/sprint-41/minimum-viable-product/questions-health-professional';
                    break;
                    case("Internal medical support"):
                    href = '/sprint-41/minimum-viable-product/unassigned-questions';
                    break;
                    case("Internal non medical support"):
                    href = '/sprint-41/minimum-viable-product/unassigned-questions';
                    break;
                    case("External healthcare professional"):
                    href = '/sprint-41/minimum-viable-product/unassigned-questions';
                    break;
                  }

                //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
                  req.session.data.queriesQuestions[req.session.data.queriesQuestions.length - 1].action = req.session.data['question-for']
                  req.session.data.queriesQuestions[req.session.data.queriesQuestions.length - 1].href = href;
                  res.redirect('/sprint-41/minimum-viable-product/questions')

                  }
                })

                router.post('/sprint-41/minimum-viable-product/question-health-link', (req, res, next) => {
                    if (req.session.data['question-for']) {
                      console.log('is-this-calling-questions', req.session.data)
                      const questionBox = req.session.data['question']
                      const answerBox = req.session.data['answer']
                      const answeredQuestion = req.session.data['answered-question']
                      const section = req.session.data.source

                      const queriesQuestions = req.session.data.queriesQuestions || []
                      queriesQuestions.push({ answerBox, questionBox, answeredQuestion, section })
                      req.session.data.queriesQuestions = queriesQuestions

                      let href;

                      switch (req.session.data['question-for']) {
                        case("Claimant"):
                        href = '/sprint-41/minimum-viable-product/questions-claimant';
                        break;
                        case("Health Professional"):
                        href = '/sprint-41/minimum-viable-product/questions-health-professional';
                        break;
                        case("Unassigned"):
                        href = '/sprint-41/minimum-viable-product/unassigned-questions';
                        break;
                      }

                    //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
                      req.session.data.queriesQuestions[req.session.data.queriesQuestions.length - 1].action = req.session.data['question-for']
                      req.session.data.queriesQuestions[req.session.data.queriesQuestions.length - 1].href = href;
                      res.redirect('/sprint-41/minimum-viable-product/questions-health-professional')

                      }
                    })


//Start routes for preparing food: questions
router.post('/sprint-41/minimum-viable-product/activities/preparing-food', (req, res, next) => {
    if (req.session.data['who-is-question-for-prepfood']) {
      console.log('is-this-calling', req.session.data)
      const textBox = req.session.data['query-content']
      const section = req.session.data.source

      const queriesPrepFood = req.session.data.queriesPrepFood || []
      queriesPrepFood.push({ textBox, section })
      req.session.data.queriesPrepFood = queriesPrepFood

      let href;

      switch (req.session.data['who-is-question-for-prepfood']) {
        case("Unassigned"):
        href = '/sprint-41/minimum-viable-product/unassigned-questions';
        break;
        case("Claimant"):
        href = '/sprint-41/minimum-viable-product/questions-claimant';
        break;
        case("Internal medical support"):
        href = '/sprint-41/minimum-viable-product/questions-internal-medical-support';
        break;
        case("Internal non medical support"):
        href = '/sprint-41/minimum-viable-product/questions-internal-non-medical-support';
        break;
        case("External healthcare professional"):
        href = '/sprint-41/minimum-viable-product/questions-external-medical-healthcare-professional';
        break;
      }

    //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
      req.session.data.queriesPrepFood[req.session.data.queriesPrepFood.length - 1].action = req.session.data['who-is-question-for-prepfood']
      req.session.data.queriesPrepFood[req.session.data.queriesPrepFood.length - 1].href = href;
      res.redirect('/sprint-41/minimum-viable-product/activities/preparing-food')
      }
    })


  //Start routes for eating and drinking: questions
    router.post('/sprint-41/minimum-viable-product/activities/taking-nutrition', (req, res, next) => {
        if (req.session.data['who-is-question-for-eating']) {
          console.log('is-this-calling', req.session.data)
          const textBox = req.session.data['query-content']
          const section = req.session.data.source

          const queriesEatDrink = req.session.data.queriesEatDrink || []
          queriesEatDrink.push({ textBox, section })
          req.session.data.queriesEatDrink = queriesEatDrink

          let href;

          switch (req.session.data['who-is-question-for-eating']) {
            case("Unassigned"):
            href = '/sprint-41/minimum-viable-product/unassigned-questions';
            break;
            case("Claimant"):
            href = '/sprint-41/minimum-viable-product/questions-claimant';
            break;
            case("Internal medical support"):
            href = '/sprint-41/minimum-viable-product/questions-internal-medical-support';
            break;
            case("Internal non medical support"):
            href = '/sprint-41/minimum-viable-product/questions-internal-non-medical-support';
            break;
            case("External healthcare professional"):
            href = '/sprint-41/minimum-viable-product/questions-external-medical-healthcare-professional';
            break;
          }

        //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
          req.session.data.queriesEatDrink[req.session.data.queriesEatDrink.length - 1].action = req.session.data['who-is-question-for-eating']
          req.session.data.queriesEatDrink[req.session.data.queriesEatDrink.length - 1].href = href;
          res.redirect('/sprint-41/minimum-viable-product/activities/taking-nutrition')

          }
        })

        //Start routes for managing therapy: questions
          router.post('/sprint-41/minimum-viable-product/activities/managing-therapy', (req, res, next) => {
              if (req.session.data['who-is-question-for-treatments']) {
                console.log('is-this-calling', req.session.data)
                const textBox = req.session.data['query-content']
                const section = req.session.data.source

                const queriesTherapy = req.session.data.queriesTherapy || []
                queriesTherapy.push({ textBox, section })
                req.session.data.queriesTherapy = queriesTherapy

                let href;

                switch (req.session.data['who-is-question-for-treatments']) {
                  case("Unassigned"):
                  href = '/sprint-41/minimum-viable-product/unassigned-questions';
                  break;
                  case("Claimant"):
                  href = '/sprint-41/minimum-viable-product/questions-claimant';
                  break;
                  case("Internal medical support"):
                  href = '/sprint-41/minimum-viable-product/questions-internal-medical-support';
                  break;
                  case("Internal non medical support"):
                  href = '/sprint-41/minimum-viable-product/questions-internal-non-medical-support';
                  break;
                  case("External healthcare professional"):
                  href = '/sprint-41/minimum-viable-product/questions-external-medical-healthcare-professional';
                  break;
                }

              //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
                req.session.data.queriesTherapy[req.session.data.queriesTherapy.length - 1].action = req.session.data['who-is-question-for-treatments']
                req.session.data.queriesTherapy[req.session.data.queriesTherapy.length - 1].href = href;
                res.redirect('/sprint-41/minimum-viable-product/activities/managing-therapy')

                }
              })


//Start routes for washing and bathing: questions
router.post('/sprint-41/minimum-viable-product/activities/washing-and-bathing', (req, res, next) => {
    if (req.session.data['who-is-question-for-washing']) {
      console.log('is-this-calling', req.session.data)
      const textBox = req.session.data['query-content']
      const section = req.session.data.source

      const queriesWashing = req.session.data.queriesWashing || []
      queriesWashing.push({ textBox, section })
      req.session.data.queriesWashing = queriesWashing

      let href;

      switch (req.session.data['who-is-question-for-washing']) {
        case("Unassigned"):
        href = '/sprint-41/minimum-viable-product/unassigned-questions';
        break;
        case("Claimant"):
        href = '/sprint-41/minimum-viable-product/questions-claimant';
        break;
        case("Internal medical support"):
        href = '/sprint-41/minimum-viable-product/questions-internal-medical-support';
        break;
        case("Internal non medical support"):
        href = '/sprint-41/minimum-viable-product/questions-internal-non-medical-support';
        break;
        case("External healthcare professional"):
        href = '/sprint-41/minimum-viable-product/questions-external-medical-healthcare-professional';
        break;
      }

    //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
      req.session.data.queriesWashing[req.session.data.queriesWashing.length - 1].action = req.session.data['who-is-question-for-washing']
      req.session.data.queriesWashing[req.session.data.queriesWashing.length - 1].href = href;
      res.redirect('/sprint-41/minimum-viable-product/activities/washing-and-bathing')

      }
    })


//Start routes for managing toilet needs: questions
  router.post('/sprint-41/minimum-viable-product/activities/managing-toilet-needs', (req, res, next) => {
      if (req.session.data['who-is-question-for-toilet']) {
        console.log('is-this-calling', req.session.data)
        const textBox = req.session.data['query-content']
        const section = req.session.data.source

        const queriesToilet = req.session.data.queriesToilet || []
        queriesToilet.push({ textBox, section })
        req.session.data.queriesToilet = queriesToilet

        let href;

        switch (req.session.data['who-is-question-for-toilet']) {
          case("Unassigned"):
          href = '/sprint-41/minimum-viable-product/unassigned-questions';
          break;
          case("Claimant"):
          href = '/sprint-41/minimum-viable-product/questions-claimant';
          break;
          case("Internal medical support"):
          href = '/sprint-41/minimum-viable-product/questions-internal-medical-support';
          break;
          case("Internal non medical support"):
          href = '/sprint-41/minimum-viable-product/questions-internal-non-medical-support';
          break;
          case("External healthcare professional"):
          href = '/sprint-41/minimum-viable-product/questions-external-medical-healthcare-professional';
          break;
        }

          //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
            req.session.data.queriesToilet[req.session.data.queriesToilet.length - 1].action = req.session.data['who-is-question-for-toilet']
            req.session.data.queriesToilet[req.session.data.queriesToilet.length - 1].href = href;
            res.redirect('/sprint-41/minimum-viable-product/activities/managing-toilet-needs')

            }
          })

    //Start routes for dressing and undressing: questions
      router.post('/sprint-41/minimum-viable-product/activities/dressing-and-undressing', (req, res, next) => {
          if (req.session.data['who-is-question-for-dressing']) {
            console.log('is-this-calling', req.session.data)
            const textBox = req.session.data['query-content']
            const section = req.session.data.source

            const queriesDressing = req.session.data.queriesDressing || []
            queriesDressing.push({ textBox, section })
            req.session.data.queriesDressing = queriesDressing

            let href;

            switch (req.session.data['who-is-question-for-dressing']) {
              case("Unassigned"):
              href = '/sprint-41/minimum-viable-product/unassigned-questions';
              break;
              case("Claimant"):
              href = '/sprint-41/minimum-viable-product/questions-claimant';
              break;
              case("Internal medical support"):
              href = '/sprint-41/minimum-viable-product/questions-internal-medical-support';
              break;
              case("Internal non medical support"):
              href = '/sprint-41/minimum-viable-product/questions-internal-non-medical-support';
              break;
              case("External healthcare professional"):
              href = '/sprint-41/minimum-viable-product/questions-external-medical-healthcare-professional';
              break;
            }

                //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
                  req.session.data.queriesDressing[req.session.data.queriesDressing.length - 1].action = req.session.data['who-is-question-for-dressing']
                  req.session.data.queriesDressing[req.session.data.queriesDressing.length - 1].href = href;
                  res.redirect('/sprint-41/minimum-viable-product/activities/dressing-and-undressing')

                  }
                })

          //Start routes for talking and understanding: questions
            router.post('/sprint-41/minimum-viable-product/activities/communicating-verbally', (req, res, next) => {
                if (req.session.data['who-is-question-for-talking']) {
                  console.log('is-this-calling', req.session.data)
                  const textBox = req.session.data['query-content']
                  const section = req.session.data.source

                  const queriesTalking = req.session.data.queriesTalking || []
                  queriesTalking.push({ textBox, section })
                  req.session.data.queriesTalking = queriesTalking

                  let href;

                  switch (req.session.data['who-is-question-for-talking']) {
                    case("Unassigned"):
                    href = '/sprint-41/minimum-viable-product/unassigned-questions';
                    break;
                    case("Claimant"):
                    href = '/sprint-41/minimum-viable-product/questions-claimant';
                    break;
                    case("Internal medical support"):
                    href = '/sprint-41/minimum-viable-product/questions-internal-medical-support';
                    break;
                    case("Internal non medical support"):
                    href = '/sprint-41/minimum-viable-product/questions-internal-non-medical-support';
                    break;
                    case("External healthcare professional"):
                    href = '/sprint-41/minimum-viable-product/questions-external-medical-healthcare-professional';
                    break;
                  }

                //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
                  req.session.data.queriesTalking[req.session.data.queriesTalking.length - 1].action = req.session.data['who-is-question-for-talking']
                  req.session.data.queriesTalking[req.session.data.queriesTalking.length - 1].href = href;
                  res.redirect('/sprint-41/minimum-viable-product/activities/communicating-verbally')

                  }
                })

          //Start routes for Reading and understanding: questions
            router.post('/sprint-41/minimum-viable-product/activities/reading-and-understanding', (req, res, next) => {
                if (req.session.data['who-is-question-for-reading']) {
                  console.log('is-this-calling', req.session.data)
                  const textBox = req.session.data['query-content']
                  const section = req.session.data.source

                  const queriesReading = req.session.data.queriesReading || []
                  queriesReading.push({ textBox, section })
                  req.session.data.queriesReading = queriesReading

                  let href;

                  switch (req.session.data['who-is-question-for-reading']) {
                    case("Unassigned"):
                    href = '/sprint-41/minimum-viable-product/unassigned-questions';
                    break;
                    case("Claimant"):
                    href = '/sprint-41/minimum-viable-product/questions-claimant';
                    break;
                    case("Internal medical support"):
                    href = '/sprint-41/minimum-viable-product/questions-internal-medical-support';
                    break;
                    case("Internal non medical support"):
                    href = '/sprint-41/minimum-viable-product/questions-internal-non-medical-support';
                    break;
                    case("External healthcare professional"):
                    href = '/sprint-41/minimum-viable-product/questions-external-medical-healthcare-professional';
                    break;
                  }

                //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
                  req.session.data.queriesReading[req.session.data.queriesReading.length - 1].action = req.session.data['who-is-question-for-reading']
                  req.session.data.queriesReading[req.session.data.queriesReading.length - 1].href = href;
                  res.redirect('/sprint-41/minimum-viable-product/activities/reading-and-understanding')

                  }
                })

          //Start routes for Mixing with others: questions
            router.post('/sprint-41/minimum-viable-product/activities/engaging-face-to-face', (req, res, next) => {
                if (req.session.data['who-is-question-for-mixing-people']) {
                  console.log('is-this-calling', req.session.data)
                  const textBox = req.session.data['query-content']
                  const section = req.session.data.source

                  const queriesMixing = req.session.data.queriesMixing || []
                  queriesMixing.push({ textBox, section })
                  req.session.data.queriesMixing = queriesMixing

                  let href;

                  switch (req.session.data['who-is-question-for-mixing-people']) {
                    case("Unassigned"):
                    href = '/sprint-41/minimum-viable-product/unassigned-questions';
                    break;
                    case("Claimant"):
                    href = '/sprint-41/minimum-viable-product/questions-claimant';
                    break;
                    case("Internal medical support"):
                    href = '/sprint-41/minimum-viable-product/questions-internal-medical-support';
                    break;
                    case("Internal non medical support"):
                    href = '/sprint-41/minimum-viable-product/questions-internal-non-medical-support';
                    break;
                    case("External healthcare professional"):
                    href = '/sprint-41/minimum-viable-product/questions-external-medical-healthcare-professional';
                    break;
                  }

                //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
                  req.session.data.queriesMixing[req.session.data.queriesMixing.length - 1].action = req.session.data['who-is-question-for-mixing-people']
                  req.session.data.queriesMixing[req.session.data.queriesMixing.length - 1].href = href;
                  res.redirect('/sprint-41/minimum-viable-product/activities/engaging-face-to-face')

                  }
                })

      //Start routes for managing money: questions
        router.post('/sprint-41/minimum-viable-product/activities/budgeting', (req, res, next) => {
            if (req.session.data['who-is-question-for-money']) {
              console.log('is-this-calling', req.session.data)
              const textBox = req.session.data['query-content']
              const section = req.session.data.source

              const queriesMoney = req.session.data.queriesMoney || []
              queriesMoney.push({ textBox, section })
              req.session.data.queriesMoney = queriesMoney

              let href;

              switch (req.session.data['who-is-question-for-money']) {
                case("Unassigned"):
                href = '/sprint-41/minimum-viable-product/unassigned-questions';
                break;
                case("Claimant"):
                href = '/sprint-41/minimum-viable-product/questions-claimant';
                break;
                case("Internal medical support"):
                href = '/sprint-41/minimum-viable-product/questions-internal-medical-support';
                break;
                case("Internal non medical support"):
                href = '/sprint-41/minimum-viable-product/questions-internal-non-medical-support';
                break;
                case("External healthcare professional"):
                href = '/sprint-41/minimum-viable-product/questions-external-medical-healthcare-professional';
                break;
              }

            //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
              req.session.data.queriesMoney[req.session.data.queriesMoney.length - 1].action = req.session.data['who-is-question-for-money']
              req.session.data.queriesMoney[req.session.data.queriesMoney.length - 1].href = href;
              res.redirect('/sprint-41/minimum-viable-product/activities/budgeting')

              }
            })
    //Start routes for planning, following journeys: questions
      router.post('/sprint-41/minimum-viable-product/activities/planning-and-following-journeys', (req, res, next) => {
          if (req.session.data['who-is-question-for-planning']) {
            console.log('is-this-calling', req.session.data)
            const textBox = req.session.data['query-content']
            const section = req.session.data.source

            const queriesPlanning = req.session.data.queriesPlanning || []
            queriesPlanning.push({ textBox, section })
            req.session.data.queriesPlanning = queriesPlanning

            let href;

            switch (req.session.data['who-is-question-for-planning']) {
              case("Unassigned"):
              href = '/sprint-41/minimum-viable-product/unassigned-questions';
              break;
              case("Claimant"):
              href = '/sprint-41/minimum-viable-product/questions-claimant';
              break;
              case("Internal medical support"):
              href = '/sprint-41/minimum-viable-product/questions-internal-medical-support';
              break;
              case("Internal non medical support"):
              href = '/sprint-41/minimum-viable-product/questions-internal-non-medical-support';
              break;
              case("External healthcare professional"):
              href = '/sprint-41/minimum-viable-product/questions-external-medical-healthcare-professional';
              break;
            }

          //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
            req.session.data.queriesPlanning[req.session.data.queriesPlanning.length - 1].action = req.session.data['who-is-question-for-planning']
            req.session.data.queriesPlanning[req.session.data.queriesPlanning.length - 1].href = href;
            res.redirect('/sprint-41/minimum-viable-product/activities/planning-and-following-journeys')

            }
          })


          //Start routes for moving around: questions
            router.post('/sprint-41/minimum-viable-product/activities/moving-around', (req, res, next) => {
                if (req.session.data['who-is-question-for-moving']) {
                  console.log('is-this-calling', req.session.data)
                  const textBox = req.session.data['query-content']
                  const section = req.session.data.source

                  const queriesMoving = req.session.data.queriesMoving || []
                  queriesMoving.push({ textBox, section })
                  req.session.data.queriesMoving = queriesMoving

                  let href;

                  switch (req.session.data['who-is-question-for-moving']) {
                    case("Unassigned"):
                    href = '/sprint-41/minimum-viable-product/unassigned-questions';
                    break;
                    case("Claimant"):
                    href = '/sprint-41/minimum-viable-product/questions-claimant';
                    break;
                    case("Internal medical support"):
                    href = '/sprint-41/minimum-viable-product/questions-internal-medical-support';
                    break;
                    case("Internal non medical support"):
                    href = '/sprint-41/minimum-viable-product/questions-internal-non-medical-support';
                    break;
                    case("External healthcare professional"):
                    href = '/sprint-41/minimum-viable-product/questions-external-medical-healthcare-professional';
                    break;
                  }

                //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
                  req.session.data.queriesMoving[req.session.data.queriesMoving.length - 1].action = req.session.data['who-is-question-for-moving']
                  req.session.data.queriesMoving[req.session.data.queriesMoving.length - 1].href = href;
                  res.redirect('/sprint-41/minimum-viable-product/activities/moving-around')

                  }
                })


                //Start routes for additional information: questions
                  router.post('/sprint-41/minimum-viable-product/additional-information', (req, res, next) => {
                      if (req.session.data['who-is-question-for-add-info']) {
                        console.log('is-this-calling', req.session.data)
                        const textBox = req.session.data['query-content']
                        const section = req.session.data.source

                        const queriesAdditional = req.session.data.queriesAdditional || []
                        queriesAdditional.push({ textBox, section })
                        req.session.data.queriesAdditional = queriesAdditional

                        let href;

                        switch (req.session.data['who-is-question-for-add-info']) {
                          case("Unassigned"):
                          href = '/sprint-41/minimum-viable-product/unassigned-questions';
                          break;
                          case("Claimant"):
                          href = '/sprint-41/minimum-viable-product/questions-claimant';
                          break;
                          case("Internal medical support"):
                          href = '/sprint-41/minimum-viable-product/questions-internal-medical-support';
                          break;
                          case("Internal non medical support"):
                          href = '/sprint-41/minimum-viable-product/questions-internal-non-medical-support';
                          break;
                          case("External healthcare professional"):
                          href = '/sprint-41/minimum-viable-product/questions-external-medical-healthcare-professional';
                          break;
                        }

                      //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
                        req.session.data.queriesAdditional[req.session.data.queriesAdditional.length - 1].action = req.session.data['who-is-question-for-add-info']
                        req.session.data.queriesAdditional[req.session.data.queriesAdditional.length - 1].href = href;
                        res.redirect('/sprint-41/minimum-viable-product/additional-information')

                        }
                      })


      //Routes for query condtion1
      router.post('/sprint-41/minimum-viable-product/condition-one', (req, res, next) => {
          if (req.session.data['who-is-question-for-cond-one']) {
            console.log('is-this-calling', req.session.data)
            const textBox = req.session.data['query-content']
            const section = req.session.data.source

            const queriesConditionOne = req.session.data.queriesConditionOne || []
            queriesConditionOne.push({ textBox, section })
            req.session.data.queriesConditionOne = queriesConditionOne

            let href;

            switch (req.session.data['who-is-question-for-cond-one']) {
              case("Unassigned"):
              href = '/sprint-41/minimum-viable-product/unassigned-questions';
              break;
              case("Claimant"):
              href = '/sprint-41/minimum-viable-product/questions-claimant';
              break;
              case("Internal medical support"):
              href = '/sprint-41/minimum-viable-product/questions-internal-medical-support';
              break;
              case("Internal non medical support"):
              href = '/sprint-41/minimum-viable-product/questions-internal-non-medical-support';
              break;
              case("External healthcare professional"):
              href = '/sprint-41/minimum-viable-product/questions-external-medical-healthcare-professional';
              break;
            }

          //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
            req.session.data.queriesConditionOne[req.session.data.queriesConditionOne.length - 1].action = req.session.data['who-is-question-for-cond-one']
            req.session.data.queriesConditionOne[req.session.data.queriesConditionOne.length - 1].href = href;
            res.redirect('/sprint-41/minimum-viable-product/condition-one')

            }
          })

        //Routes for query condtion2
        router.post('/sprint-41/minimum-viable-product/condition-two', (req, res, next) => {
            if (req.session.data['who-is-question-for-cond-two']) {
              console.log('is-this-calling', req.session.data)
              const textBox = req.session.data['query-content']
              const section = req.session.data.source

              const queriesConditionTwo = req.session.data.queriesConditionTwo || []
              queriesConditionTwo.push({ textBox, section })
              req.session.data.queriesConditionTwo = queriesConditionTwo

              let href;

              switch (req.session.data['who-is-question-for-cond-two']) {
                case("Unassigned"):
                href = '/sprint-41/minimum-viable-product/unassigned-questions';
                break;
                case("Claimant"):
                href = '/sprint-41/minimum-viable-product/questions-claimant';
                break;
                case("Internal medical support"):
                href = '/sprint-41/minimum-viable-product/questions-internal-medical-support';
                break;
                case("Internal non medical support"):
                href = '/sprint-41/minimum-viable-product/questions-internal-non-medical-support';
                break;
                case("External healthcare professional"):
                href = '/sprint-41/minimum-viable-product/questions-external-medical-healthcare-professional';
                break;
              }

            //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
              req.session.data.queriesConditionTwo[req.session.data.queriesConditionTwo.length - 1].action = req.session.data['who-is-question-for-cond-two']
              req.session.data.queriesConditionTwo[req.session.data.queriesConditionTwo.length - 1].href = href;
              res.redirect('/sprint-41/minimum-viable-product/condition-two')

              }
        })

        //Routes for query condtion3
        router.post('/sprint-41/minimum-viable-product/condition-three', (req, res, next) => {
            if (req.session.data['who-is-question-for-cond-three']) {
              console.log('is-this-calling', req.session.data)
              const textBox = req.session.data['query-content']
              const section = req.session.data.source

              const queriesConditionThree = req.session.data.queriesConditionThree || []
              queriesConditionThree.push({ textBox, section })
              req.session.data.queriesConditionThree = queriesConditionThree

              let href;

              switch (req.session.data['who-is-question-for-cond-three']) {
                case("Unassigned"):
                href = '/sprint-41/minimum-viable-product/unassigned-questions';
                break;
                case("Claimant"):
                href = '/sprint-41/minimum-viable-product/questions-claimant';
                break;
                case("Internal medical support"):
                href = '/sprint-41/minimum-viable-product/questions-internal-medical-support';
                break;
                case("Internal non medical support"):
                href = '/sprint-41/minimum-viable-product/questions-internal-non-medical-support';
                break;
                case("External healthcare professional"):
                href = '/sprint-41/minimum-viable-product/questions-external-medical-healthcare-professional';
                break;
              }

            //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
              req.session.data.queriesConditionThree[req.session.data.queriesConditionThree.length - 1].action = req.session.data['who-is-question-for-cond-three']
              req.session.data.queriesConditionThree[req.session.data.queriesConditionThree.length - 1].href = href;
              res.redirect('/sprint-41/minimum-viable-product/condition-three')

              }
        })

        //Routes for query condtion4
        router.post('/sprint-41/minimum-viable-product/condition-four', (req, res, next) => {
            if (req.session.data['who-is-question-for-cond-four']) {
              console.log('is-this-calling', req.session.data)
              const textBox = req.session.data['query-content']
              const section = req.session.data.source

              const queriesConditionFour = req.session.data.queriesConditionFour || []
              queriesConditionFour.push({ textBox, section })
              req.session.data.queriesConditionFour = queriesConditionFour

              let href;

              switch (req.session.data['who-is-question-for-cond-four']) {
                case("Unassigned"):
                href = '/sprint-41/minimum-viable-product/unassigned-questions';
                break;
                case("Claimant"):
                href = '/sprint-41/minimum-viable-product/questions-claimant';
                break;
                case("Internal medical support"):
                href = '/sprint-41/minimum-viable-product/questions-internal-medical-support';
                break;
                case("Internal non medical support"):
                href = '/sprint-41/minimum-viable-product/questions-internal-non-medical-support';
                break;
                case("External healthcare professional"):
                href = '/sprint-41/minimum-viable-product/questions-external-medical-healthcare-professional';
                break;
              }

            //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
              req.session.data.queriesConditionFour[req.session.data.queriesConditionFour.length - 1].action = req.session.data['who-is-question-for-cond-four']
              req.session.data.queriesConditionFour[req.session.data.queriesConditionFour.length - 1].href = href;
              res.redirect('/sprint-41/minimum-viable-product/condition-four')

              }
        })

        //Routes for query condtion5
        router.post('/sprint-41/minimum-viable-product/condition-five', (req, res, next) => {
            if (req.session.data['who-is-question-for-cond-five']) {
              console.log('is-this-calling', req.session.data)
              const textBox = req.session.data['query-content']
              const section = req.session.data.source

              const queriesConditionFive = req.session.data.queriesConditionFive || []
              queriesConditionFive.push({ textBox, section })
              req.session.data.queriesConditionFive = queriesConditionFive

              let href;

              switch (req.session.data['who-is-question-for-cond-five']) {
                case("Unassigned"):
                href = '/sprint-41/minimum-viable-product/unassigned-questions';
                break;
                case("Claimant"):
                href = '/sprint-41/minimum-viable-product/questions-claimant';
                break;
                case("Internal medical support"):
                href = '/sprint-41/minimum-viable-product/questions-internal-medical-support';
                break;
                case("Internal non medical support"):
                href = '/sprint-41/minimum-viable-product/questions-internal-non-medical-support';
                break;
                case("External healthcare professional"):
                href = '/sprint-41/minimum-viable-product/questions-external-medical-healthcare-professional';
                break;
              }

            //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
              req.session.data.queriesConditionFive[req.session.data.queriesConditionFive.length - 1].action = req.session.data['who-is-question-for-cond-five']
              req.session.data.queriesConditionFive[req.session.data.queriesConditionFive.length - 1].href = href;
              res.redirect('/sprint-41/minimum-viable-product/condition-five')

              }
        })

        //Routes for query condtion6
        router.post('/sprint-41/minimum-viable-product/condition-six', (req, res, next) => {
            if (req.session.data['who-is-question-for-cond-six']) {
              console.log('is-this-calling', req.session.data)
              const textBox = req.session.data['query-content']
              const section = req.session.data.source

              const queriesConditionSix = req.session.data.queriesConditionSix || []
              queriesConditionSix.push({ textBox, section })
              req.session.data.queriesConditionSix = queriesConditionSix

              let href;

              switch (req.session.data['who-is-question-for-cond-six']) {
                case("Unassigned"):
                href = '/sprint-41/minimum-viable-product/unassigned-questions';
                break;
                case("Claimant"):
                href = '/sprint-41/minimum-viable-product/questions-claimant';
                break;
                case("Internal medical support"):
                href = '/sprint-41/minimum-viable-product/questions-internal-medical-support';
                break;
                case("Internal non medical support"):
                href = '/sprint-41/minimum-viable-product/questions-internal-non-medical-support';
                break;
                case("External healthcare professional"):
                href = '/sprint-41/minimum-viable-product/questions-external-medical-healthcare-professional';
                break;
              }

            //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
              req.session.data.queriesConditionSix[req.session.data.queriesConditionSix.length - 1].action = req.session.data['who-is-question-for-cond-six']
              req.session.data.queriesConditionSix[req.session.data.queriesConditionSix.length - 1].href = href;
              res.redirect('/sprint-41/minimum-viable-product/condition-six')

              }
        })


        //Routes for query condtion7
        router.post('/sprint-41/minimum-viable-product/condition-seven', (req, res, next) => {
            if (req.session.data['who-is-question-for-cond-seven']) {
              console.log('is-this-calling', req.session.data)
              const textBox = req.session.data['query-content']
              const section = req.session.data.source

              const queriesConditionSeven = req.session.data.queriesConditionSeven || []
              queriesConditionSeven.push({ textBox, section })
              req.session.data.queriesConditionSeven = queriesConditionSeven

              let href;

              switch (req.session.data['who-is-question-for-cond-seven']) {
                case("Unassigned"):
                href = '/sprint-41/minimum-viable-product/unassigned-questions';
                break;
                case("Claimant"):
                href = '/sprint-41/minimum-viable-product/questions-claimant';
                break;
                case("Internal medical support"):
                href = '/sprint-41/minimum-viable-product/questions-internal-medical-support';
                break;
                case("Internal non medical support"):
                href = '/sprint-41/minimum-viable-product/questions-internal-non-medical-support';
                break;
                case("External healthcare professional"):
                href = '/sprint-41/minimum-viable-product/questions-external-medical-healthcare-professional';
                break;
              }

            //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
              req.session.data.queriesConditionSeven[req.session.data.queriesConditionSeven.length - 1].action = req.session.data['who-is-question-for-cond-seven']
              req.session.data.queriesConditionSeven[req.session.data.queriesConditionSeven.length - 1].href = href;
              res.redirect('/sprint-41/minimum-viable-product/condition-seven')

              }
        })


        //Routes for query condtion8
        router.post('/sprint-41/minimum-viable-product/condition-eight', (req, res, next) => {
            if (req.session.data['who-is-question-for-cond-eight']) {
              console.log('is-this-calling', req.session.data)
              const textBox = req.session.data['query-content']
              const section = req.session.data.source

              const queriesConditionEight = req.session.data.queriesConditionEight || []
              queriesConditionEight.push({ textBox, section })
              req.session.data.queriesConditionEight = queriesConditionEight

              let href;

              switch (req.session.data['who-is-question-for-cond-eight']) {
                case("Unassigned"):
                href = '/sprint-41/minimum-viable-product/unassigned-questions';
                break;
                case("Claimant"):
                href = '/sprint-41/minimum-viable-product/questions-claimant';
                break;
                case("Internal medical support"):
                href = '/sprint-41/minimum-viable-product/questions-internal-medical-support';
                break;
                case("Internal non medical support"):
                href = '/sprint-41/minimum-viable-product/questions-internal-non-medical-support';
                break;
                case("External healthcare professional"):
                href = '/sprint-41/minimum-viable-product/questions-external-medical-healthcare-professional';
                break;
              }

            //  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
              req.session.data.queriesConditionEight[req.session.data.queriesConditionEight.length - 1].action = req.session.data['who-is-question-for-cond-eight']
              req.session.data.queriesConditionEight[req.session.data.queriesConditionEight.length - 1].href = href;
              res.redirect('/sprint-41/minimum-viable-product/condition-eight')
              }
        })



//Start routes for scoring -- Old  stuff???********************************************************************************
router.post('/sprint-41/minimum-viable-product/set-descriptor', (req, res, next) => {
  //  if (req.session.data['set-descriptor'] == "Can prepare and cook a simple meal unaided" ) {
    console.log('/sprint-41/minimum-viable-product/set-descriptor', req.session.data)
    const descriptor = req.session.data['set-descriptor']

        let points;

        switch (req.session.data['set-descriptor']) {
          case('Can prepare and cook a simple meal unaided'):
          points = '0';
          break;
          case('Needs to use an aid or appliance to be able to either prepare or cook a simple meal'):
          points = '2';
          break;
          case('Cannot cook a simple meal using a conventional cooker but is able to do so using a microwave'):
          points = '2';
          break;
          case('Needs prompting to be able to either prepare or cook a simple meal'):
          points = '2';
          break;
          case('Needs supervision or assistance to either prepare or cook a simple meal'):
          points = '4';
          break;
          case('Cannot prepare and cook food at all'):
          points = '8';
          break;
        }

     const scoresChoice = req.session.data.scoresChoice || []
     scoresChoice.push({ descriptor, points })
      req.session.data.scoresChoice = scoresChoice
      res.redirect('/sprint-41/minimum-viable-product/review-activity-descriptors')
    //}
})

router.post('/sprint-41/minimum-viable-product/review-activity-descriptors', (req, res, next) => {
  console.log('this is scoring')
  console.log(req.session.data)

  req.session.data.scoresChoice[req.session.data.scoresChoice.length - 1].points = points;

  console.log(1, req.session.data.scoresChoice)
  res.redirect('/sprint-41/minimum-viable-product/review-activity-descriptors')
})



//Create query taking nutrition activity
router.post('/sprint-41/minimum-viable-product/activities/taking-nutrition', (req, res, next) => {
  console.log('/sprint-41/minimum-viable-product/activities/taking-nutrition', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-41/minimum-viable-product/set-action/set-action-taking-nutrition')
})

router.post('/sprint-41/minimum-viable-product/set-action/set-action-taking-nutrition', (req, res, next) => {
  console.log('this is taking nutrition')
  console.log(req.session.data)
  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-41/minimum-viable-product/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-41/minimum-viable-product/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-41/minimum-viable-product/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-41/minimum-viable-product/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-41/minimum-viable-product/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-41/minimum-viable-product/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-30-35/activities/taking-nutrition')
})

//Create query managing therapy activity
router.post('/sprint-41/minimum-viable-product/activities/managing-therapy', (req, res, next) => {
  console.log('/sprint-41/minimum-viable-product/activities/managing-therapy', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-41/minimum-viable-product/set-action/set-action-managing-therapy')
})

router.post('/sprint-41/minimum-viable-product/set-action/set-action-managing-therapy', (req, res, next) => {
  console.log('this is managing therapy')
  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-41/minimum-viable-product/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-41/minimum-viable-product/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-41/minimum-viable-product/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-41/minimum-viable-product/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-41/minimum-viable-product/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-41/minimum-viable-product/none-these-action';
    break;
  }

  console.log(req.session.data)
  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-41/minimum-viable-product/activities/managing-therapy')
})

//Create query washing and bathing activity
router.post('/sprint-41/minimum-viable-product/activities/washing-and-bathing', (req, res, next) => {
  console.log('/sprint-41/minimum-viable-product/activities/washing-and-bathing', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-41/minimum-viable-product/set-action/set-action-washing-and-bathing')
})

router.post('/sprint-41/minimum-viable-product/set-action/set-action-washing-and-bathing', (req, res, next) => {
  console.log('this is washing and bathing')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-41/minimum-viable-product/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-41/minimum-viable-product/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-41/minimum-viable-product/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-41/minimum-viable-product/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-41/minimum-viable-product/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-41/minimum-viable-product/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-41/minimum-viable-product/activities/washing-and-bathing')
})

//Create query managing toilet needs activity
router.post('/sprint-41/minimum-viable-product/activities/managing-toilet-needs', (req, res, next) => {
  console.log('/sprint-41/minimum-viable-product/activities/managing-toilet-needs', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-41/minimum-viable-product/set-action/set-action-managing-toilet-needs')
})

router.post('/sprint-41/minimum-viable-product/set-action/set-action-managing-toilet-needs', (req, res, next) => {
  console.log('this is managing toilet needs')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-41/minimum-viable-product/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-41/minimum-viable-product/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-41/minimum-viable-product/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-41/minimum-viable-product/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-41/minimum-viable-product/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-41/minimum-viable-product/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-41/minimum-viable-product/activities/managing-toilet-needs')
})

//Create query dressing and undressing activity
router.post('/sprint-41/minimum-viable-product/activities/dressing-and-undressing', (req, res, next) => {
  console.log('/sprint-41/minimum-viable-product/activities/dressing-and-undressing', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-41/minimum-viable-product/set-action/set-action-dressing-and-undressing')
})

router.post('/sprint-41/minimum-viable-product/set-action/set-action-dressing-and-undressing', (req, res, next) => {
  console.log('this is dressing and undressing')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-41/minimum-viable-product/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-41/minimum-viable-product/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-41/minimum-viable-product/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-41/minimum-viable-product/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-41/minimum-viable-product/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-41/minimum-viable-product/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-41/minimum-viable-product/activities/dressing-and-undressing')
})

//Create query communicating verbally activity
router.post('/sprint-41/minimum-viable-product/activities/communicating-verbally', (req, res, next) => {
  console.log('/sprint-41/minimum-viable-product/activities/communicating-verbally', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-41/minimum-viable-product/set-action/set-action-communicating-verbally')
})

router.post('/sprint-41/minimum-viable-product/set-action/set-action-communicating-verbally', (req, res, next) => {
  console.log('this is communicating verbally')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-41/minimum-viable-product/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-41/minimum-viable-product/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-41/minimum-viable-product/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-41/minimum-viable-product/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-41/minimum-viable-product/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-41/minimum-viable-product/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-41/minimum-viable-product/activities/communicating-verbally')
})

//Create query reading and understanding activity
router.post('/sprint-41/minimum-viable-product/activities/reading-and-understanding', (req, res, next) => {
  console.log('/sprint-41/minimum-viable-product/activities/reading-and-understanding', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-41/minimum-viable-product/set-action/set-action-reading-and-understanding')
})

router.post('/sprint-41/minimum-viable-product/set-action/set-action-reading-and-understanding', (req, res, next) => {
  console.log('this is reading and understanding')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-41/minimum-viable-product/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-41/minimum-viable-product/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-41/minimum-viable-product/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-41/minimum-viable-product/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-41/minimum-viable-product/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-41/minimum-viable-product/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-41/minimum-viable-product/activities/reading-and-understanding')
})

//Create query engaging face to face activity
router.post('/sprint-41/minimum-viable-product/activities/engaging-face-to-face', (req, res, next) => {
  console.log('/sprint-41/minimum-viable-product/activities/engaging-face-to-face', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-41/minimum-viable-product/set-action/set-action-engage-face-to-face')
})

router.post('/sprint-41/minimum-viable-product/set-action/set-action-engage-face-to-face', (req, res, next) => {
  console.log('this is engaging face to face')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-41/minimum-viable-product/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-41/minimum-viable-product/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-41/minimum-viable-product/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-41/minimum-viable-product/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-41/minimum-viable-product/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-41/minimum-viable-product/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-41/minimum-viable-product/activities/engaging-face-to-face')
})

//Create query budgeting activity
router.post('/sprint-41/minimum-viable-product/activities/budgeting', (req, res, next) => {
  console.log('/sprint-41/minimum-viable-product/activities/budgeting', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-41/minimum-viable-product/set-action/set-action-budgeting')
})

router.post('/sprint-41/minimum-viable-product/set-action/set-action-budgeting', (req, res, next) => {
  console.log('this is budgeting')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-41/minimum-viable-product/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-41/minimum-viable-product/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-41/minimum-viable-product/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-41/minimum-viable-product/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-41/minimum-viable-product/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-41/minimum-viable-product/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-41/minimum-viable-product/activities/budgeting')
})

//Create query planning and following journeys activity
router.post('/sprint-41/minimum-viable-product/activities/planning-and-following-journeys', (req, res, next) => {
  console.log('/sprint-41/minimum-viable-product/activities/planning-and-following-journeys', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-41/minimum-viable-product/set-action/set-action-planning-and-following-journeys')
})

router.post('/sprint-41/minimum-viable-product/set-action/set-action-planning-and-following-journeys', (req, res, next) => {
  console.log('this is planning and following journeys')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-41/minimum-viable-product/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-41/minimum-viable-product/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-41/minimum-viable-product/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-41/minimum-viable-product/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-41/minimum-viable-product/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-41/minimum-viable-product/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-41/minimum-viable-product/activities/planning-and-following-journeys')
})

//Create query moving around activity
router.post('/sprint-41/minimum-viable-product/activities/moving-around', (req, res, next) => {
  console.log('/sprint-41/minimum-viable-product/activities/moving-around', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-41/minimum-viable-product/set-action/set-action-moving-around')
})

router.post('/sprint-41/minimum-viable-product/set-action/set-action-moving-around', (req, res, next) => {
  console.log('this is moving around')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-41/minimum-viable-product/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-41/minimum-viable-product/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-41/minimum-viable-product/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-41/minimum-viable-product/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-41/minimum-viable-product/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-41/minimum-viable-product/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-41/minimum-viable-product/activities/moving-around')
})

//**************************************************************************************************************************************
//Routes for queries linked to Evidence number 1

router.post('/sprint-41/minimum-viable-product/evidence-detail', (req, res, next) => {
    if (req.session.data['evidence-one-note'] == "question-about-this-condition" ) {
      console.log('/sprint-41/minimum-viable-product/evidence-detail', req.session.data)
      const name = req.session.data['evidence-query']
      const section = req.session.data.source

      const queriesEvidence = req.session.data.queriesEvidence || []
      queriesEvidence.push({ name, section })
      req.session.data.queriesEvidence = queriesEvidence
      res.redirect('/sprint-41/minimum-viable-product/set-action/set-action-evidence')

    } else if (req.session.data['evidence-one-note'] == "important-to-this-case" ) {
        //Routes for tagged documents linked to Evidence
            console.log('/sprint-41/minimum-viable-product/evidence-detail', req.session.data)
            const name = req.session.data['evidence-query']
            //const pageURL = req.session.data['page-URL'][1]['contact-claimant-page']
            //console.log(pageURL)
            const section = req.session.data.source

            const conditionsEvidenceOne = req.session.data.conditionsEvidenceOne || []
            conditionsEvidenceOne.push({ name, section })
            req.session.data.conditionsEvidenceOne = conditionsEvidenceOne
            res.redirect('/sprint-41/minimum-viable-product/tagging-evidence/evidence-one')

  } else {
    console.log('/sprint-41/minimum-viable-product/evidence-detail', req.session.data)
    const name = req.session.data['out-of-scope']
    const scopeEvidenceOne = req.session.data['query-content']
    const section = req.session.data.source

    const outScopeEvidenceOne = req.session.data.outScopeEvidenceOne || []
    outScopeEvidenceOne.push({ name, section, scopeEvidenceOne })
    req.session.data.outScopeEvidenceOne = outScopeEvidenceOne
    res.redirect('/sprint-41/minimum-viable-product/evidence-detail')

    }
    })

// follow up for tagging important info: evidence one
    router.post('/sprint-41/minimum-viable-product/tagging-evidence/evidence-one', (req, res, next) => {
      console.log('this is evidence one')
      console.log(req.session.data)
      req.session.data.conditionsEvidenceOne[req.session.data.conditionsEvidenceOne.length - 1].evidenceNoteOne = req.session.data['query-content']
      req.session.data.conditionsEvidenceOne[req.session.data.conditionsEvidenceOne.length - 1].action = req.session.data['tagConditionEvidence']
      //req.session.data.conditionsEvidence[req.session.data.conditionsEvidence.length - 1].page = req.session.data['page-URL'][1]['contact-claimant-page']
      console.log(1, req.session.data.conditionsEvidenceOne)
      res.redirect('/sprint-41/minimum-viable-product/evidence-detail')
    })

// follow up route for linking queries to evidence number 1
router.post('/sprint-41/minimum-viable-product/set-action/set-action-evidence', (req, res, next) => {
  console.log('this is evidence query')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-41/minimum-viable-product/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-41/minimum-viable-product/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-41/minimum-viable-product/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-41/minimum-viable-product/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-41/minimum-viable-product/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-41/minimum-viable-product/none-these-action';
    break;
  }

  req.session.data.queriesEvidence[req.session.data.queriesEvidence.length - 1].evidence = req.session.data['query-content']
  req.session.data.queriesEvidence[req.session.data.queriesEvidence.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesEvidence[req.session.data.queriesEvidence.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-41/minimum-viable-product/evidence-detail')
})

// follow up roiute for out of scope: evidence one
router.post('/sprint-41/minimum-viable-product/evidence-detail', (req, res, next) => {
  console.log('this is evidence one out of scope')
  console.log(req.session.data)

  req.session.data.outScopeEvidenceOne[req.session.data.outScopeEvidenceOne.length - 1].scopeEvidenceOne = req.session.data['query-content']
//  req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].action = req.session.data['set-an-action']
  //req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-41/minimum-viable-product/evidence-detail')
})

//Routes for queries linked to Evidence number 2

router.post('/sprint-41/minimum-viable-product/evidence-detail-two', (req, res, next) => {
    if (req.session.data['evidence-note-two'] == "question-about-this-condition" ) {
      console.log('/sprint-41/minimum-viable-product/evidence-detail', req.session.data)
      const name = req.session.data['evidence-query']
      const section = req.session.data.source

      const queriesEvidenceTwo = req.session.data.queriesEvidenceTwo || []
      queriesEvidenceTwo.push({ name, section })
      req.session.data.queriesEvidenceTwo = queriesEvidenceTwo
      res.redirect('/sprint-41/minimum-viable-product/set-action/set-action-evidence-two')

    } else if (req.session.data['evidence-note-two'] == "important-to-this-case" ) {
        //Routes for tagged documents linked to Evidence
            console.log('/sprint-41/minimum-viable-product/evidence-detail-two', req.session.data)
            const name = req.session.data['query-content']
            //const pageURL = req.session.data['page-URL'][1]['contact-claimant-page']
            //console.log(pageURL)
            const section = req.session.data.source

            const conditionsEvidence = req.session.data.conditionsEvidence || []
            conditionsEvidence.push({ name, section })
            req.session.data.conditionsEvidence = conditionsEvidence
            res.redirect('/sprint-41/minimum-viable-product/tagging-evidence/evidence-two')

  } else {
    console.log('/sprint-41/minimum-viable-product/evidence-detail-two', req.session.data)
    const name = req.session.data['out-of-scope']
    const scopeEvidenceTwo = req.session.data['query-content']
    const section = req.session.data.source

    const outScopeEvidenceTwo = req.session.data.outScopeEvidenceTwo || []
    outScopeEvidenceTwo.push({ name, section, scopeEvidenceTwo })
    req.session.data.outScopeEvidenceTwo = outScopeEvidenceTwo
    res.redirect('/sprint-41/minimum-viable-product/evidence-detail-two')

    }
    })

// follow up for tagging important info: evidence two
    router.post('/sprint-41/minimum-viable-product/tagging-evidence/evidence-two', (req, res, next) => {
      console.log('this is evidence')
      console.log(req.session.data)
      req.session.data.conditionsEvidence[req.session.data.conditionsEvidence.length - 1].evidenceNote = req.session.data['query-content']
      req.session.data.conditionsEvidence[req.session.data.conditionsEvidence.length - 1].action = req.session.data['tagConditionEvidence']
      //req.session.data.conditionsEvidence[req.session.data.conditionsEvidence.length - 1].page = req.session.data['page-URL'][1]['contact-claimant-page']
      console.log(1, req.session.data.conditionsEvidence)
      res.redirect('/sprint-41/minimum-viable-product/evidence-detail-two')
    })

// follow up route for linking queries to evidence number two
router.post('/sprint-41/minimum-viable-product/set-action/set-action-evidence-two', (req, res, next) => {
  console.log('this is evidence query')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-41/minimum-viable-product/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-41/minimum-viable-product/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-41/minimum-viable-product/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-41/minimum-viable-product/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-41/minimum-viable-product/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-41/minimum-viable-product/none-these-action';
    break;
  }

  req.session.data.queriesEvidenceTwo[req.session.data.queriesEvidenceTwo.length - 1].evidence = req.session.data['query-content']
  req.session.data.queriesEvidenceTwo[req.session.data.queriesEvidenceTwo.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesEvidenceTwo[req.session.data.queriesEvidenceTwo.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-41/minimum-viable-product/evidence-detail-two')
})

// follow up route for out of scope: evidence two
router.post('/sprint-41/minimum-viable-product/evidence-detail-two', (req, res, next) => {
  console.log('this is evidence two out of scope')
  console.log(req.session.data)

  req.session.data.outScopeEvidenceTwo[req.session.data.outScopeEvidenceTwo.length - 1].scopeEvidenceTwo = req.session.data['query-content']
//  req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].action = req.session.data['set-an-action']
  //req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-41/minimum-viable-product/evidence-detail-two')
})
//Routes for queries appearing on action page

router.post('/sprint-41/minimum-viable-product/contact-claimant-action', (req, res, next) => {
  console.log('/sprint-41/minimum-viable-product/contact-claimant-action', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-41/minimum-viable-product/contact-claimant-action')
})

router.post('/sprint-41/minimum-viable-product/contact-claimant-action', (req, res, next) => {
  console.log('this is contact claimant action')
  console.log(req.session.data)
  req.session.data.queries[req.session.data.queries.length - 1].contentQ = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  console.log(1, req.session.data)
  res.redirect('/sprint-41/minimum-viable-product/contact-claimant-action')
})
//******** -- End of old stuff???**********************************************************************************************






//sprint 30-35//***********************************************************************************************************

//Routes for tagging, questions and  out of scope for preparing food activity

// Start routes for giving an answer to a question -- tabbed
router.post('/sprint-30-35/question-tabbed', (req, res, next) => {
      console.log('/sprint-30-35/question-tabbed', req.session.data)

      const answerNote = req.session.data['answered']
      const section = req.session.data.source

      const answerQuestion = req.session.data.answerQuestion || []
      answerQuestion.push({ section, answerNote })
      req.session.data.outScopePrepFood = answerQuestion
      res.redirect('/sprint-30-35/questions-claimant2')
      //martin hack
    })

    // follow up code for giving an answer to a question
    router.post('/sprint-30-35/questions-claimant', (req, res, next) => {
      console.log('this is tabbed answer question')
      console.log(req.session.data)

      req.session.data.answerQuestion[req.session.data.answerQuestion.length - 1].answerPrepFood = req.session.data['answered']
      req.session.data.answerQuestion[req.session.data.answerQuestion.length - 1].answerPrepFood = req.session.data['answers']
    //  req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].action = req.session.data['set-an-action']
      //req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].href = href;
      console.log(1, req.session.data)
      res.redirect('/sprint-30-35/questions-claimant')

    })

    // Start routes for giving an answer to a question -- link to claimant2 to answer top question
    router.post('/newnav/question-link', (req, res, next) => {
          console.log('/newnav/question-link', req.session.data)

          const answerNote = req.session.data['answers']
          const section = req.session.data.source

          const answerQuestion = req.session.data.answerQuestion || []
          answerQuestion.push({ section, answerNote })
          req.session.data.outScopePrepFood = answerQuestion
          res.redirect('/sprint-30-35/questions-claimant2')
          //martin hack
        })

        // Start routes for giving an answer to a question -- question tabbed doctor page
        router.post('/sprint-30-35/question-tabbed-doctor', (req, res, next) => {
              console.log('/sprint-30-35/question-tabbed-doctor', req.session.data)

              const answerDoctorNote = req.session.data['answers']
              const answerDoctorTherapyNote = req.session.data['answered']
              const section = req.session.data.source

              const answerDoctorQuestion = req.session.data.answerDoctorQuestion || []
              answerDoctorQuestion.push({ section, answerDoctorNote, answerDoctorTherapyNote })
              req.session.data.outScopePrepFood = answerDoctorQuestion
              res.redirect('/sprint-30-35/questions-doctor2')
              //martin hack
            })

            // follow up code for giving an answer to a question on doctors questions
            router.post('/sprint-30-35/questions-doctor', (req, res, next) => {
              console.log('this is tabbed doctor answer')
              console.log(req.session.data)

              req.session.data.answerDoctorQuestion[req.session.data.answerDoctorQuestion.length - 1].answerDoctorPrepFood = req.session.data['answered']
              req.session.data.answerDoctorQuestion[req.session.data.answerDoctorQuestion.length - 1].answerDoctorPrepFood = req.session.data['answers']
            //  req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].action = req.session.data['set-an-action']
              //req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].href = href;
              console.log(1, req.session.data)
              res.redirect('/sprint-30-35/questions-doctor')

            })




//Start routes for preparing food: questions
router.post('/sprint-30-35/activities/preparing-food', (req, res, next) => {
    if (req.session.data['preparing-food-note'] == "question-about-this-condition" ) {
      console.log('/sprint-30-35/evidence-detail', req.session.data)
      const name = req.session.data['question-about-this-condition']
      const section = req.session.data.source

      const queriesPrepFood = req.session.data.queriesPrepFood || []
      queriesPrepFood.push({ name, section })
      req.session.data.queriesPrepFood = queriesPrepFood
      res.redirect('/sprint-30-35/set-action/set-action-preparing-food')

      //Routes for tagged documents linked to: preparing food
  } else if (req.session.data['preparing-food-note'] == "important-to-this-case" ){

        console.log('/sprint-30-35/activities/preparing-food', req.session.data)
        const tagOption = req.session.data['important-to-this-case']
        const section = req.session.data.source

        const taggingPrepFood = req.session.data.taggingPrepFood || []
        taggingPrepFood.push({ tagOption, section })
        req.session.data.taggingPrepFood = taggingPrepFood
        res.redirect('/sprint-30-35/tagging')

    } else {
      console.log('/sprint-30-35/activities/preparing-food', req.session.data)
      const name = req.session.data['out-of-scope']
      const scopeNote = req.session.data['query-content']
      const section = req.session.data.source

      const outScopePrepFood = req.session.data.outScopePrepFood || []
      outScopePrepFood.push({ name, section, scopeNote })
      req.session.data.outScopePrepFood = outScopePrepFood
      res.redirect('/sprint-30-35/activities/preparing-food')
    }
    })

    // follow up tagging code for: preparing food
    router.post('/sprint-30-35/tagging', (req, res, next) => {
      console.log('this is prepfood tagging')
      console.log(req.session.data)
      req.session.data.taggingPrepFood[req.session.data.taggingPrepFood.length - 1].tagContent = req.session.data['query-content']
      req.session.data.taggingPrepFood[req.session.data.taggingPrepFood.length - 1].action = req.session.data['tagConditionActivities']
    //  req.session.data.taggingPrepFood[req.session.data.taggingPrepFood.length - 1].page = req.session.data['page-URL'][1]['contact-claimant-page']
      console.log(1, req.session.data.taggingPrepFood)
      res.redirect('/sprint-30-35/activities/preparing-food')
    })

    // follow up code for out of scope for: preparing food
    router.post('/sprint-30-35/activities/preparing-food', (req, res, next) => {
      console.log('this is prepfood out of scope')
      console.log(req.session.data)

      req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].scopePrepFood = req.session.data['query-content']
    //  req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].action = req.session.data['set-an-action']
      //req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].href = href;
      console.log(1, req.session.data)
      res.redirect('/sprint-30-35/activities/preparing-food')
    })

// follow up route for linking questions to: preparing food
router.post('/sprint-30-35/set-action/set-action-preparing-food', (req, res, next) => {
  console.log('this is prep food questions')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-30-35/questions-claimant';
    break;
    case("The claimant's doctor"):
    href = '/sprint-30-35/questions-doctor';
    break;
    case("The claimant's urologist"):
    href = '/sprint-30-35/questions-urologist';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-30-35/questions-consultant';
    break;
    case('VAL'):
    href = '/sprint-30-35/questions-val';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-30-35/none-these-action';
    break;
  }

  req.session.data.queriesPrepFood[req.session.data.queriesPrepFood.length - 1].content = req.session.data['query-content']
  req.session.data.queriesPrepFood[req.session.data.queriesPrepFood.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesPrepFood[req.session.data.queriesPrepFood.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-30-35/activities/preparing-food')
})

//Start routes for taking nutrition: questions
router.post('/sprint-30-35/activities/taking-nutrition', (req, res, next) => {
    if (req.session.data['taking-nutrition-note'] == "question-about-this-condition" ) {
      console.log('/sprint-30-35/evidence-detail', req.session.data)
      const name = req.session.data['question-about-this-condition']
      const section = req.session.data.source

      const queriesTakeNutrition = req.session.data.queriesTakeNutrition || []
      queriesTakeNutrition.push({ name, section })
      req.session.data.queriesTakeNutrition = queriesTakeNutrition
      res.redirect('/sprint-30-35/set-action/set-action-taking-nutrition')

      //Routes for tagged documents linked to: taking nutrition
  } else if (req.session.data['taking-nutrition-note'] == "important-to-this-case" ){

        console.log('/sprint-30-35/activities/taking-nutrition', req.session.data)
        const tagOption = req.session.data['important-to-this-case']
        const section = req.session.data.source

        const taggingTakeNutrition = req.session.data.taggingTakeNutrition || []
        taggingTakeNutrition.push({ tagOption, section })
        req.session.data.taggingTakeNutrition = taggingTakeNutrition
        res.redirect('/sprint-30-35/tagging-activities/taking-nutrition')

    } else {
      console.log('/sprint-30-35/activities/taking-nutrition', req.session.data)
      const name = req.session.data['out-of-scope']
      const scopeNote = req.session.data['query-content']
      const section = req.session.data.source

      const outScopeTakeNutrition = req.session.data.outScopeTakeNutrition || []
      outScopeTakeNutrition.push({ name, section, scopeNote })
      req.session.data.outScopeTakeNutrition = outScopeTakeNutrition
      res.redirect('/sprint-30-35/activities/taking-nutrition')
    }
    })

    // follow up tagging code for: taking nutrition
    router.post('/sprint-30-35/tagging-activities/taking-nutrition', (req, res, next) => {
      console.log('this is taking nutrition tagging')
      console.log(req.session.data)
      req.session.data.taggingTakeNutrition[req.session.data.taggingTakeNutrition.length - 1].tagContent = req.session.data['query-content']
      req.session.data.taggingTakeNutrition[req.session.data.taggingTakeNutrition.length - 1].action = req.session.data['tagConditionActivities']
    //  req.session.data.taggingPrepFood[req.session.data.taggingPrepFood.length - 1].page = req.session.data['page-URL'][1]['contact-claimant-page']
      console.log(1, req.session.data.taggingTakeNutrition)
      res.redirect('/sprint-30-35/activities/taking-nutrition')
    })

    // follow up code for out of scope for: taking nutrition
    router.post('/sprint-30-35/activities/taking-nutrition', (req, res, next) => {
      console.log('this is taking nutrition out of scope')
      console.log(req.session.data)

      req.session.data.outScopeTakeNutrition[req.session.data.outScopeTakeNutrition.length - 1].scopeNote = req.session.data['query-content']
    //  req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].action = req.session.data['set-an-action']
      //req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].href = href;
      console.log(1, req.session.data)
      res.redirect('/sprint-30-35/activities/taking-nutrition')
    })

// follow up route for linking questions to: taking nutrition
router.post('/sprint-30-35/set-action/set-action-taking-nutrition', (req, res, next) => {
  console.log('this is taking nutrition questions')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-30-35/questions-claimant';
    break;
    case("The claimant's doctor"):
    href = '/sprint-30-35/questions-doctor';
    break;
    case("The claimant's urologist"):
    href = '/sprint-30-35/questions-urologist';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-30-35/questions-consultant';
    break;
    case('VAL'):
    href = '/sprint-30-35/questions-val';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-30-35/none-these-action';
    break;
  }

  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-30-35/activities/taking-nutrition')
})

//Start routes for managing therapy: questions
router.post('/sprint-30-35/activities/managing-therapy', (req, res, next) => {
    if (req.session.data['managing-therapy-note'] == "question-about-this-condition" ) {
      console.log('/sprint-30-35/evidence-detail', req.session.data)
      const name = req.session.data['question-about-this-condition']
      const section = req.session.data.source

      const queriesManageTherapy = req.session.data.queriesManageTherapy || []
      queriesManageTherapy.push({ name, section })
      req.session.data.queriesManageTherapy = queriesManageTherapy
      res.redirect('/sprint-30-35/set-action/set-action-managing-therapy')

      //Routes for tagged documents linked to: managing therapy
  } else if (req.session.data['managing-therapy-note'] == "important-to-this-case" ){

        console.log('/sprint-30-35/activities/managing-therapy', req.session.data)
        const tagOption = req.session.data['important-to-this-case']
        const section = req.session.data.source

        const taggingManageTherapy = req.session.data.taggingManageTherapy || []
        taggingManageTherapy.push({ tagOption, section })
        req.session.data.taggingManageTherapy = taggingManageTherapy
        res.redirect('/sprint-30-35/tagging-activities/managing-therapy')

    } else {
      console.log('/sprint-30-35/activities/managing-therapy', req.session.data)
      const name = req.session.data['out-of-scope']
      const scopeNote = req.session.data['query-content']
      const section = req.session.data.source

      const outScopeManageTherapy = req.session.data.outScopeManageTherapy || []
      outScopeManageTherapy.push({ name, section, scopeNote })
      req.session.data.outScopeManageTherapy = outScopeManageTherapy
      res.redirect('/sprint-30-35/activities/managing-therapy')
    }
    })

    // follow up tagging code for: managing therapy
    router.post('/sprint-30-35/tagging-activities/managing-therapy', (req, res, next) => {
      console.log('this is managing therapy tagging')
      console.log(req.session.data)
      req.session.data.taggingManageTherapy[req.session.data.taggingManageTherapy.length - 1].tagContent = req.session.data['query-content']
      req.session.data.taggingManageTherapy[req.session.data.taggingManageTherapy.length - 1].action = req.session.data['tagConditionActivities']
    //  req.session.data.taggingPrepFood[req.session.data.taggingPrepFood.length - 1].page = req.session.data['page-URL'][1]['contact-claimant-page']
      console.log(1, req.session.data.taggingManageTherapy)
      res.redirect('/sprint-30-35/activities/managing-therapy')
    })

    // follow up code for out of scope for: managing therapy
    router.post('/sprint-30-35/activities/managing-therapy', (req, res, next) => {
      console.log('this is managing therapy out of scope')
      console.log(req.session.data)

      req.session.data.outScopeManageTherapy[req.session.data.outScopeManageTherapy.length - 1].scopeNote = req.session.data['query-content']
    //  req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].action = req.session.data['set-an-action']
      //req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].href = href;
      console.log(1, req.session.data)
      res.redirect('/sprint-30-35/activities/managing-therapy')
    })

// follow up route for linking questions to: managing therapy
router.post('/sprint-30-35/set-action/set-action-managing-therapy', (req, res, next) => {
  console.log('this is managing therapy questions')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-30-35/questions-claimant';
    break;
    case("The claimant's doctor"):
    href = '/sprint-30-35/questions-doctor';
    break;
    case("The claimant's urologist"):
    href = '/sprint-30-35/questions-urologist';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-30-35/questions-consultant';
    break;
    case('VAL'):
    href = '/sprint-30-35/questions-val';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-30-35/none-these-action';
    break;
  }

  req.session.data.queriesManageTherapy[req.session.data.queriesManageTherapy.length - 1].content = req.session.data['query-content']
  req.session.data.queriesManageTherapy[req.session.data.queriesManageTherapy.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesManageTherapy[req.session.data.queriesManageTherapy.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-30-35/activities/managing-therapy')
})


//Start routes for washing and bathing: questions
router.post('/sprint-30-35/activities/washing-and-bathing', (req, res, next) => {
    if (req.session.data['washing-and-bathing-note'] == "question-about-this-condition" ) {
      console.log('/sprint-30-35/evidence-detail', req.session.data)
      const name = req.session.data['question-about-this-condition']
      const section = req.session.data.source

      const queriesWashingBathing = req.session.data.queriesWashingBathing || []
      queriesWashingBathing.push({ name, section })
      req.session.data.queriesWashingBathing = queriesWashingBathing
      res.redirect('/sprint-30-35/set-action/set-action-washing-and-bathing')

      //Routes for tagged documents linked to: washing and bathing
  } else if (req.session.data['washing-and-bathing-note'] == "important-to-this-case" ){

        console.log('/sprint-30-35/activities/washing-and-bathing', req.session.data)
        const tagOption = req.session.data['important-to-this-case']
        const section = req.session.data.source

        const taggingWashingBathing = req.session.data.taggingWashingBathing || []
        taggingWashingBathing.push({ tagOption, section })
        req.session.data.taggingWashingBathing = taggingWashingBathing
        res.redirect('/sprint-30-35/tagging-activities/washing-and-bathing')

    } else {
      console.log('/sprint-30-35/activities/washing-and-bathing', req.session.data)
      const name = req.session.data['out-of-scope']
      const scopeNote = req.session.data['query-content']
      const section = req.session.data.source

      const outScopeWashingBathing = req.session.data.outScopeWashingBathing || []
      outScopeWashingBathing.push({ name, section, scopeNote })
      req.session.data.outScopeWashingBathing = outScopeWashingBathing
      res.redirect('/sprint-30-35/activities/washing-and-bathing')
    }
    })

    // follow up tagging code for: washing and bathing
    router.post('/sprint-30-35/tagging-activities/washing-and-bathing', (req, res, next) => {
      console.log('this is managing therapy tagging')
      console.log(req.session.data)
      req.session.data.taggingWashingBathing[req.session.data.taggingWashingBathing.length - 1].tagContent = req.session.data['query-content']
      req.session.data.taggingWashingBathing[req.session.data.taggingWashingBathing.length - 1].action = req.session.data['tagConditionActivities']
    //  req.session.data.taggingPrepFood[req.session.data.taggingPrepFood.length - 1].page = req.session.data['page-URL'][1]['contact-claimant-page']
      console.log(1, req.session.data.taggingWashingBathing)
      res.redirect('/sprint-30-35/activities/washing-and-bathing')
    })

    // follow up code for out of scope for: washing and bathing
    router.post('/sprint-30-35/activities/washing-and-bathing', (req, res, next) => {
      console.log('this is washing and bathing out of scope')
      console.log(req.session.data)

      req.session.data.outScopeWashingBathing[req.session.data.outScopeWashingBathing.length - 1].scopeNote = req.session.data['query-content']
    //  req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].action = req.session.data['set-an-action']
      //req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].href = href;
      console.log(1, req.session.data)
      res.redirect('/sprint-30-35/activities/washing-and-bathing')
    })

// follow up route for linking questions to: washing and bathing
router.post('/sprint-30-35/set-action/set-action-washing-and-bathing', (req, res, next) => {
  console.log('this is washing and bathing questions')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-30-35/questions-claimant';
    break;
    case("The claimant's doctor"):
    href = '/sprint-30-35/questions-doctor';
    break;
    case("The claimant's urologist"):
    href = '/sprint-30-35/questions-urologist';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-30-35/questions-consultant';
    break;
    case('VAL'):
    href = '/sprint-30-35/questions-val';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-30-35/none-these-action';
    break;
  }

  req.session.data.queriesWashingBathing[req.session.data.queriesWashingBathing.length - 1].content = req.session.data['query-content']
  req.session.data.queriesWashingBathing[req.session.data.queriesWashingBathing.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesWashingBathing[req.session.data.queriesWashingBathing.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-30-35/activities/washing-and-bathing')
})


//Start routes for managing toilet needs: questions
router.post('/sprint-30-35/activities/managing-toilet-needs', (req, res, next) => {
    if (req.session.data['managing-toilet-needs-note'] == "question-about-this-condition" ) {
      console.log('/sprint-30-35/evidence-detail', req.session.data)
      const name = req.session.data['question-about-this-condition']
      const section = req.session.data.source

      const queriesToiletneeds = req.session.data.queriesToiletneeds || []
      queriesToiletneeds.push({ name, section })
      req.session.data.queriesToiletneeds = queriesToiletneeds
      res.redirect('/sprint-30-35/set-action/set-action-managing-toilet-needs')

      //Routes for tagged documents linked to: managing toilet needs
  } else if (req.session.data['managing-toilet-needs-note'] == "important-to-this-case" ){

        console.log('/sprint-30-35/activities/managing-toilet-needs', req.session.data)
        const tagOption = req.session.data['important-to-this-case']
        const section = req.session.data.source

        const taggingToiletneeds = req.session.data.taggingToiletneeds || []
        taggingToiletneeds.push({ tagOption, section })
        req.session.data.taggingToiletneeds = taggingToiletneeds
        res.redirect('/sprint-30-35/tagging-activities/managing-toilet-needs')

    } else {
      console.log('/sprint-30-35/activities/managing-toilet-needs', req.session.data)
      const name = req.session.data['out-of-scope']
      const scopeNote = req.session.data['query-content']
      const section = req.session.data.source

      const outScopeToiletneeds = req.session.data.outScopeToiletneeds || []
      outScopeToiletneeds.push({ name, section, scopeNote })
      req.session.data.outScopeToiletneeds = outScopeToiletneeds
      res.redirect('/sprint-30-35/activities/managing-toilet-needs')
    }
    })

    // follow up tagging code for: managing toilet needs
    router.post('/sprint-30-35/tagging-activities/managing-toilet-needs', (req, res, next) => {
      console.log('this is managing toilet needs tagging')
      console.log(req.session.data)
      req.session.data.taggingToiletneeds[req.session.data.taggingToiletneeds.length - 1].tagContent = req.session.data['query-content']
      req.session.data.taggingToiletneeds[req.session.data.taggingToiletneeds.length - 1].action = req.session.data['tagConditionActivities']
    //  req.session.data.taggingPrepFood[req.session.data.taggingPrepFood.length - 1].page = req.session.data['page-URL'][1]['contact-claimant-page']
      console.log(1, req.session.data.taggingToiletneeds)
      res.redirect('/sprint-30-35/activities/managing-toilet-needs')
    })

    // follow up code for out of scope for: managing toilet needs
    router.post('/sprint-30-35/activities/managing-toilet-needs', (req, res, next) => {
      console.log('this is managing toilet needs out of scope')
      console.log(req.session.data)

      req.session.data.outScopeToiletneeds[req.session.data.outScopeToiletneeds.length - 1].scopeNote = req.session.data['query-content']
    //  req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].action = req.session.data['set-an-action']
      //req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].href = href;
      console.log(1, req.session.data)
      res.redirect('/sprint-30-35/activities/managing-toilet-needs')
    })

// follow up route for linking questions to: managing toilet needs
router.post('/sprint-30-35/set-action/set-action-managing-toilet-needs', (req, res, next) => {
  console.log('this is managing toilet needs questions')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-30-35/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-30-35/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-30-35/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-30-35/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-30-35/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-30-35/none-these-action';
    break;
  }

  req.session.data.queriesToiletneeds[req.session.data.queriesToiletneeds.length - 1].content = req.session.data['query-content']
  req.session.data.queriesToiletneeds[req.session.data.queriesToiletneeds.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesToiletneeds[req.session.data.queriesToiletneeds.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-30-35/activities/managing-toilet-needs')
})

//Start routes for dressing and undressing: questions
router.post('/sprint-30-35/activities/dressing-and-undressing', (req, res, next) => {
    if (req.session.data['dressing-and-undressing-note'] == "question-about-this-condition" ) {
      console.log('/sprint-30-35/evidence-detail', req.session.data)
      const name = req.session.data['question-about-this-condition']
      const section = req.session.data.source

      const queriesDressing = req.session.data.queriesDressing || []
      queriesDressing.push({ name, section })
      req.session.data.queriesDressing = queriesDressing
      res.redirect('/sprint-30-35/set-action/set-action-dressing-and-undressing')

      //Routes for tagged documents linked to: dressing and undressing
  } else if (req.session.data['dressing-and-undressing-note'] == "important-to-this-case" ){

        console.log('/sprint-30-35/activities/dressing-and-undressing', req.session.data)
        const tagOption = req.session.data['important-to-this-case']
        const section = req.session.data.source

        const taggingDressing = req.session.data.taggingDressing || []
        taggingDressing.push({ tagOption, section })
        req.session.data.taggingDressing = taggingDressing
        res.redirect('/sprint-30-35/tagging-activities/dressing-and-undressing')

    } else {
      console.log('/sprint-30-35/activities/dressing-and-undressing', req.session.data)
      const name = req.session.data['out-of-scope']
      const scopeNote = req.session.data['query-content']
      const section = req.session.data.source

      const outScopeDressing = req.session.data.outScopeDressing || []
      outScopeDressing.push({ name, section, scopeNote })
      req.session.data.outScopeDressing = outScopeDressing
      res.redirect('/sprint-30-35/activities/dressing-and-undressing')
    }
    })

    // follow up tagging code for: dressing and undressing
    router.post('/sprint-30-35/tagging-activities/dressing-and-undressing', (req, res, next) => {
      console.log('this is dressing and undressing tagging')
      console.log(req.session.data)
      req.session.data.taggingDressing[req.session.data.taggingDressing.length - 1].tagContent = req.session.data['query-content']
      req.session.data.taggingDressing[req.session.data.taggingDressing.length - 1].action = req.session.data['tagConditionActivities']
    //  req.session.data.taggingPrepFood[req.session.data.taggingPrepFood.length - 1].page = req.session.data['page-URL'][1]['contact-claimant-page']
      console.log(1, req.session.data.taggingDressing)
      res.redirect('/sprint-30-35/activities/dressing-and-undressing')
    })

    // follow up code for out of scope for: dressing and undressing
    router.post('/sprint-30-35/activities/dressing-and-undressing', (req, res, next) => {
      console.log('this is dressing and undressing out of scope')
      console.log(req.session.data)

      req.session.data.outScopeDressing[req.session.data.outScopeDressing.length - 1].scopeNote = req.session.data['query-content']
    //  req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].action = req.session.data['set-an-action']
      //req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].href = href;
      console.log(1, req.session.data)
      res.redirect('/sprint-30-35/activities/dressing-and-undressing')
    })

// follow up route for linking questions to: dressing and undressing
router.post('/sprint-30-35/set-action/set-action-dressing-and-undressing', (req, res, next) => {
  console.log('this is dressing and undressing questions')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-30-35/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-30-35/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-30-35/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-30-35/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-30-35/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-30-35/none-these-action';
    break;
  }

  req.session.data.queriesDressing[req.session.data.queriesDressing.length - 1].content = req.session.data['query-content']
  req.session.data.queriesDressing[req.session.data.queriesDressing.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesDressing[req.session.data.queriesDressing.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-30-35/activities/dressing-and-undressing')
})

//Start routes for scoring
router.post('/sprint-30-35/set-descriptor', (req, res, next) => {
  //  if (req.session.data['set-descriptor'] == "Can prepare and cook a simple meal unaided" ) {
    console.log('/sprint-30-35/set-descriptor', req.session.data)
    const descriptor = req.session.data['set-descriptor']

        let points;

        switch (req.session.data['set-descriptor']) {
          case('Can prepare and cook a simple meal unaided'):
          points = '0';
          break;
          case('Needs to use an aid or appliance to be able to either prepare or cook a simple meal'):
          points = '2';
          break;
          case('Cannot cook a simple meal using a conventional cooker but is able to do so using a microwave'):
          points = '2';
          break;
          case('Needs prompting to be able to either prepare or cook a simple meal'):
          points = '2';
          break;
          case('Needs supervision or assistance to either prepare or cook a simple meal'):
          points = '4';
          break;
          case('Cannot prepare and cook food at all'):
          points = '8';
          break;
        }

     const scoresChoice = req.session.data.scoresChoice || []
     scoresChoice.push({ descriptor, points })
      req.session.data.scoresChoice = scoresChoice
      res.redirect('/sprint-30-35/review-activity-descriptors')
    //}
})

router.post('/sprint-30-35/review-activity-descriptors', (req, res, next) => {
  console.log('this is scoring')
  console.log(req.session.data)

  req.session.data.scoresChoice[req.session.data.scoresChoice.length - 1].points = points;

  console.log(1, req.session.data.scoresChoice)
  res.redirect('/sprint-30-35/review-activity-descriptors')
})


//Create query taking nutrition activity
router.post('/sprint-30-35/activities/taking-nutrition', (req, res, next) => {
  console.log('/sprint-30-35/activities/taking-nutrition', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-30-35/set-action/set-action-taking-nutrition')
})

router.post('/sprint-30-35/set-action/set-action-taking-nutrition', (req, res, next) => {
  console.log('this is taking nutrition')
  console.log(req.session.data)
  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-30-35/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-30-35/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-30-35/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-30-35/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-30-35/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-30-35/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-30-35/activities/taking-nutrition')
})

//Create query managing therapy activity
router.post('/sprint-30-35/activities/managing-therapy', (req, res, next) => {
  console.log('/sprint-30-35/activities/managing-therapy', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-30-35/set-action/set-action-managing-therapy')
})

router.post('/sprint-30-35/set-action/set-action-managing-therapy', (req, res, next) => {
  console.log('this is managing therapy')
  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-30-35/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-30-35/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-30-35/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-30-35/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-30-35/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-30-35/none-these-action';
    break;
  }

  console.log(req.session.data)
  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-30-35/activities/managing-therapy')
})

//Create query washing and bathing activity
router.post('/sprint-30-35/activities/washing-and-bathing', (req, res, next) => {
  console.log('/sprint-30-35/activities/washing-and-bathing', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-30-35/set-action/set-action-washing-and-bathing')
})

router.post('/sprint-30-35/set-action/set-action-washing-and-bathing', (req, res, next) => {
  console.log('this is washing and bathing')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-30-35/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-30-35/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-30-35/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-30-35/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-30-35/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-30-35/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-30-35/activities/washing-and-bathing')
})

//Create query managing toilet needs activity
router.post('/sprint-30-35/activities/managing-toilet-needs', (req, res, next) => {
  console.log('/sprint-30-35/activities/managing-toilet-needs', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-30-35/set-action/set-action-managing-toilet-needs')
})

router.post('/sprint-30-35/set-action/set-action-managing-toilet-needs', (req, res, next) => {
  console.log('this is managing toilet needs')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-30-35/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-30-35/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-30-35/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-30-35/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-30-35/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-30-35/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-30-35/activities/managing-toilet-needs')
})

//Create query dressing and undressing activity
router.post('/sprint-30-35/activities/dressing-and-undressing', (req, res, next) => {
  console.log('/sprint-30-35/activities/dressing-and-undressing', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-30-35/set-action/set-action-dressing-and-undressing')
})

router.post('/sprint-30-35/set-action/set-action-dressing-and-undressing', (req, res, next) => {
  console.log('this is dressing and undressing')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-30-35/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-30-35/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-30-35/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-30-35/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-30-35/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-30-35/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-30-35/activities/dressing-and-undressing')
})

//Create query communicating verbally activity
router.post('/sprint-30-35/activities/communicating-verbally', (req, res, next) => {
  console.log('/sprint-30-35/activities/communicating-verbally', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-30-35/set-action/set-action-communicating-verbally')
})

router.post('/sprint-30-35/set-action/set-action-communicating-verbally', (req, res, next) => {
  console.log('this is communicating verbally')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-30-35/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-30-35/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-30-35/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-30-35/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-30-35/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-30-35/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-30-35/activities/communicating-verbally')
})

//Create query reading and understanding activity
router.post('/sprint-30-35/activities/reading-and-understanding', (req, res, next) => {
  console.log('/sprint-30-35/activities/reading-and-understanding', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-30-35/set-action/set-action-reading-and-understanding')
})

router.post('/sprint-30-35/set-action/set-action-reading-and-understanding', (req, res, next) => {
  console.log('this is reading and understanding')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-30-35/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-30-35/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-30-35/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-30-35/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-30-35/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-30-35/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-30-35/activities/reading-and-understanding')
})

//Create query engaging face to face activity
router.post('/sprint-30-35/activities/engaging-face-to-face', (req, res, next) => {
  console.log('/sprint-30-35/activities/engaging-face-to-face', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-30-35/set-action/set-action-engage-face-to-face')
})

router.post('/sprint-30-35/set-action/set-action-engage-face-to-face', (req, res, next) => {
  console.log('this is engaging face to face')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-30-35/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-30-35/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-30-35/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-30-35/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-30-35/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-30-35/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-30-35/activities/engaging-face-to-face')
})

//Create query budgeting activity
router.post('/sprint-30-35/activities/budgeting', (req, res, next) => {
  console.log('/sprint-30-35/activities/budgeting', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-30-35/set-action/set-action-budgeting')
})

router.post('/sprint-30-35/set-action/set-action-budgeting', (req, res, next) => {
  console.log('this is budgeting')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-30-35/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-30-35/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-30-35/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-30-35/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-30-35/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-30-35/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-30-35/activities/budgeting')
})

//Create query planning and following journeys activity
router.post('/sprint-30-35/activities/planning-and-following-journeys', (req, res, next) => {
  console.log('/sprint-30-35/activities/planning-and-following-journeys', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-30-35/set-action/set-action-planning-and-following-journeys')
})

router.post('/sprint-30-35/set-action/set-action-planning-and-following-journeys', (req, res, next) => {
  console.log('this is planning and following journeys')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-30-35/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-30-35/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-30-35/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-30-35/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-30-35/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-30-35/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-30-35/activities/planning-and-following-journeys')
})

//Create query moving around activity
router.post('/sprint-30-35/activities/moving-around', (req, res, next) => {
  console.log('/sprint-30-35/activities/moving-around', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-30-35/set-action/set-action-moving-around')
})

router.post('/sprint-30-35/set-action/set-action-moving-around', (req, res, next) => {
  console.log('this is moving around')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-30-35/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-30-35/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-30-35/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-30-35/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-30-35/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-30-35/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-30-35/activities/moving-around')
})

//**************************************************************************************************************************************
//Routes for queries linked to Evidence number 1

router.post('/sprint-30-35/evidence-detail', (req, res, next) => {
    if (req.session.data['evidence-one-note'] == "question-about-this-condition" ) {
      console.log('/sprint-30-35/evidence-detail', req.session.data)
      const name = req.session.data['evidence-query']
      const section = req.session.data.source

      const queriesEvidence = req.session.data.queriesEvidence || []
      queriesEvidence.push({ name, section })
      req.session.data.queriesEvidence = queriesEvidence
      res.redirect('/sprint-30-35/set-action/set-action-evidence')

    } else if (req.session.data['evidence-one-note'] == "important-to-this-case" ) {
        //Routes for tagged documents linked to Evidence
            console.log('/sprint-30-35/evidence-detail', req.session.data)
            const name = req.session.data['evidence-query']
            //const pageURL = req.session.data['page-URL'][1]['contact-claimant-page']
            //console.log(pageURL)
            const section = req.session.data.source

            const conditionsEvidenceOne = req.session.data.conditionsEvidenceOne || []
            conditionsEvidenceOne.push({ name, section })
            req.session.data.conditionsEvidenceOne = conditionsEvidenceOne
            res.redirect('/sprint-30-35/tagging-evidence/evidence-one')

  } else {
    console.log('/sprint-30-35/evidence-detail', req.session.data)
    const name = req.session.data['out-of-scope']
    const scopeEvidenceOne = req.session.data['query-content']
    const section = req.session.data.source

    const outScopeEvidenceOne = req.session.data.outScopeEvidenceOne || []
    outScopeEvidenceOne.push({ name, section, scopeEvidenceOne })
    req.session.data.outScopeEvidenceOne = outScopeEvidenceOne
    res.redirect('/sprint-30-35/evidence-detail')

    }
    })

// follow up for tagging important info: evidence one
    router.post('/sprint-30-35/tagging-evidence/evidence-one', (req, res, next) => {
      console.log('this is evidence one')
      console.log(req.session.data)
      req.session.data.conditionsEvidenceOne[req.session.data.conditionsEvidenceOne.length - 1].evidenceNoteOne = req.session.data['query-content']
      req.session.data.conditionsEvidenceOne[req.session.data.conditionsEvidenceOne.length - 1].action = req.session.data['tagConditionEvidence']
      //req.session.data.conditionsEvidence[req.session.data.conditionsEvidence.length - 1].page = req.session.data['page-URL'][1]['contact-claimant-page']
      console.log(1, req.session.data.conditionsEvidenceOne)
      res.redirect('/sprint-30-35/evidence-detail')
    })

// follow up route for linking queries to evidence number 1
router.post('/sprint-30-35/set-action/set-action-evidence', (req, res, next) => {
  console.log('this is evidence query')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-30-35/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-30-35/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-30-35/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-30-35/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-30-35/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-30-35/none-these-action';
    break;
  }

  req.session.data.queriesEvidence[req.session.data.queriesEvidence.length - 1].evidence = req.session.data['query-content']
  req.session.data.queriesEvidence[req.session.data.queriesEvidence.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesEvidence[req.session.data.queriesEvidence.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-30-35/evidence-detail')
})

// follow up roiute for out of scope: evidence one
router.post('/sprint-30-35/evidence-detail', (req, res, next) => {
  console.log('this is evidence one out of scope')
  console.log(req.session.data)

  req.session.data.outScopeEvidenceOne[req.session.data.outScopeEvidenceOne.length - 1].scopeEvidenceOne = req.session.data['query-content']
//  req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].action = req.session.data['set-an-action']
  //req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-30-35/evidence-detail')
})

//Routes for queries linked to Evidence number 2

router.post('/sprint-30-35/evidence-detail-two', (req, res, next) => {
    if (req.session.data['evidence-note-two'] == "question-about-this-condition" ) {
      console.log('/sprint-30-35/evidence-detail', req.session.data)
      const name = req.session.data['evidence-query']
      const section = req.session.data.source

      const queriesEvidenceTwo = req.session.data.queriesEvidenceTwo || []
      queriesEvidenceTwo.push({ name, section })
      req.session.data.queriesEvidenceTwo = queriesEvidenceTwo
      res.redirect('/sprint-30-35/set-action/set-action-evidence-two')

    } else if (req.session.data['evidence-note-two'] == "important-to-this-case" ) {
        //Routes for tagged documents linked to Evidence
            console.log('/sprint-30-35/evidence-detail-two', req.session.data)
            const name = req.session.data['query-content']
            //const pageURL = req.session.data['page-URL'][1]['contact-claimant-page']
            //console.log(pageURL)
            const section = req.session.data.source

            const conditionsEvidence = req.session.data.conditionsEvidence || []
            conditionsEvidence.push({ name, section })
            req.session.data.conditionsEvidence = conditionsEvidence
            res.redirect('/sprint-30-35/tagging-evidence/evidence-two')

  } else {
    console.log('/sprint-30-35/evidence-detail-two', req.session.data)
    const name = req.session.data['out-of-scope']
    const scopeEvidenceTwo = req.session.data['query-content']
    const section = req.session.data.source

    const outScopeEvidenceTwo = req.session.data.outScopeEvidenceTwo || []
    outScopeEvidenceTwo.push({ name, section, scopeEvidenceTwo })
    req.session.data.outScopeEvidenceTwo = outScopeEvidenceTwo
    res.redirect('/sprint-30-35/evidence-detail-two')

    }
    })

// follow up for tagging important info: evidence two
    router.post('/sprint-30-35/tagging-evidence/evidence-two', (req, res, next) => {
      console.log('this is evidence')
      console.log(req.session.data)
      req.session.data.conditionsEvidence[req.session.data.conditionsEvidence.length - 1].evidenceNote = req.session.data['query-content']
      req.session.data.conditionsEvidence[req.session.data.conditionsEvidence.length - 1].action = req.session.data['tagConditionEvidence']
      //req.session.data.conditionsEvidence[req.session.data.conditionsEvidence.length - 1].page = req.session.data['page-URL'][1]['contact-claimant-page']
      console.log(1, req.session.data.conditionsEvidence)
      res.redirect('/sprint-30-35/evidence-detail-two')
    })

// follow up route for linking queries to evidence number two
router.post('/sprint-30-35/set-action/set-action-evidence-two', (req, res, next) => {
  console.log('this is evidence query')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-30-35/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-30-35/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-30-35/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-30-35/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-30-35/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-30-35/none-these-action';
    break;
  }

  req.session.data.queriesEvidenceTwo[req.session.data.queriesEvidenceTwo.length - 1].evidence = req.session.data['query-content']
  req.session.data.queriesEvidenceTwo[req.session.data.queriesEvidenceTwo.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesEvidenceTwo[req.session.data.queriesEvidenceTwo.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-30-35/evidence-detail-two')
})

// follow up route for out of scope: evidence two
router.post('/sprint-30-35/evidence-detail-two', (req, res, next) => {
  console.log('this is evidence two out of scope')
  console.log(req.session.data)

  req.session.data.outScopeEvidenceTwo[req.session.data.outScopeEvidenceTwo.length - 1].scopeEvidenceTwo = req.session.data['query-content']
//  req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].action = req.session.data['set-an-action']
  //req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-30-35/evidence-detail-two')
})
//Routes for queries appearing on action page

router.post('/sprint-30-35/contact-claimant-action', (req, res, next) => {
  console.log('/sprint-30-35/contact-claimant-action', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-30-35/contact-claimant-action')
})

router.post('/sprint-30-35/contact-claimant-action', (req, res, next) => {
  console.log('this is contact claimant action')
  console.log(req.session.data)
  req.session.data.queries[req.session.data.queries.length - 1].contentQ = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  console.log(1, req.session.data)
  res.redirect('/sprint-30-35/contact-claimant-action')
})

//Routes for query condtion1

router.post('/sprint-30-35/condition-one', (req, res, next) => {
  console.log('/sprint-30-35/condition-one', req.session.data)
  const name = req.session.data['condition-query']
  const section = req.session.data.source
  const queriesCondition = req.session.data.queriesCondition || []
  queriesCondition.push({ name, section })
  req.session.data.queriesCondition = queriesCondition
  res.redirect('/sprint-30-35/set-action/set-action-condition-one')
})

router.post('/sprint-30-35/set-action/set-action-condition-one', (req, res, next) => {
  console.log('this is condition one')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-30-35/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-30-35/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-30-35/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-30-35/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-30-35/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-30-35/none-these-action';
    break;
  }

  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].content = req.session.data['condition-query']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-30-35/condition-one')
})

//Routes for query condtion2

router.post('/sprint-30-35/condition-two', (req, res, next) => {
  console.log('/sprint-30-35/condition-two', req.session.data)
  const name = req.session.data['condition-query']
  const section = req.session.data.source
  const queriesCondition = req.session.data.queriesCondition || []
  queriesCondition.push({ name, section })
  req.session.data.queriesCondition = queriesCondition
  res.redirect('/sprint-30-35/set-action/set-action-condition-two')
})

router.post('/sprint-30-35/set-action/set-action-condition-two', (req, res, next) => {
  console.log('this is condition two')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-30-35/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-30-35/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-30-35/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-30-35/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-30-35/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-30-35/none-these-action';
    break;
  }

  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].content = req.session.data['condition-query']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-30-35/condition-two')
})

//Routes for query condtion3

router.post('/sprint-30-35/condition-three', (req, res, next) => {
  console.log('/sprint-30-35/condition-three', req.session.data)
  const name = req.session.data['condition-query']
  const section = req.session.data.source
  const queriesCondition = req.session.data.queriesCondition || []
  queriesCondition.push({ name, section })
  req.session.data.queriesCondition = queriesCondition
  res.redirect('/sprint-30-35/set-action/set-action-condition-three')
})

router.post('/sprint-30-35/set-action/set-action-condition-three', (req, res, next) => {
  console.log('this is condition three')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-30-35/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-30-35/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-30-35/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-30-35/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-30-35/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-30-35/none-these-action';
    break;
  }

  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].content = req.session.data['condition-query']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-30-35/condition-three')
})

//Routes for query condtion4

router.post('/sprint-30-35/condition-four', (req, res, next) => {
  console.log('/sprint-30-35/condition-four', req.session.data)
  const name = req.session.data['condition-query']
  const section = req.session.data.source
  const queriesCondition = req.session.data.queriesCondition || []
  queriesCondition.push({ name, section })
  req.session.data.queriesCondition = queriesCondition
  res.redirect('/sprint-30-35/set-action/set-action-condition-four')
})

router.post('/sprint-30-35/set-action/set-action-condition-four', (req, res, next) => {
  console.log('this is condition four')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-30-35/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-30-35/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-30-35/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-30-35/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-30-35/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-30-35/none-these-action';
    break;
  }

  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].content = req.session.data['condition-query']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-30-35/task-list')
})

//Routes for query condtion5

router.post('/sprint-30-35/condition-five', (req, res, next) => {
  console.log('/sprint-30-35/condition-five', req.session.data)
  const name = req.session.data['condition-query']
  const section = req.session.data.source
  const queriesCondition = req.session.data.queriesCondition || []
  queriesCondition.push({ name, section })
  req.session.data.queriesCondition = queriesCondition
  res.redirect('/sprint-30-35/set-action/set-action-condition-five')
})

router.post('/sprint-30-35/set-action/set-action-condition-five', (req, res, next) => {
  console.log('this is condition five')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-30-35/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-30-35/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-30-35/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-30-35/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-30-35/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-30-35/none-these-action';
    break;
  }

  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].content = req.session.data['condition-query']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-30-35/condition-five')
})

//Routes for query condtion6

router.post('/sprint-30-35/condition-six', (req, res, next) => {
  console.log('/sprint-30-35/condition-six', req.session.data)
  const name = req.session.data['condition-query']
  const section = req.session.data.source
  const queriesCondition = req.session.data.queriesCondition || []
  queriesCondition.push({ name, section })
  req.session.data.queriesCondition = queriesCondition
  res.redirect('/sprint-30-35/set-action/set-action-condition-six')
})

router.post('/sprint-30-35/set-action/set-action-condition-six', (req, res, next) => {
  console.log('this is condition six')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-30-35/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-30-35/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-30-35/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-30-35/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-30-35/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-30-35/none-these-action';
    break;
  }

  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].content = req.session.data['condition-query']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-30-35/condition-six')
})

//Routes for query condtion7

router.post('/sprint-30-35/condition-seven', (req, res, next) => {
  console.log('/sprint-30-35/condition-seven', req.session.data)
  const name = req.session.data['condition-query']
  const section = req.session.data.source
  const queriesCondition = req.session.data.queriesCondition || []
  queriesCondition.push({ name, section })
  req.session.data.queriesCondition = queriesCondition
  res.redirect('/sprint-30-35/set-action/set-action-condition-seven')
})

router.post('/sprint-30-35/set-action/set-action-condition-seven', (req, res, next) => {
  console.log('this is condition seven')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-30-35/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-30-35/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-30-35/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-30-35/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-30-35/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-30-35/none-these-action';
    break;
  }

  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].content = req.session.data['condition-query']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-30-35/condition-seven')
})

//Routes for query condtion8

router.post('/sprint-30-35/condition-eight', (req, res, next) => {
  console.log('/sprint-30-35/condition-eight', req.session.data)
  const name = req.session.data['condition-query']
  const section = req.session.data.source
  const queriesCondition = req.session.data.queriesCondition || []
  queriesCondition.push({ name, section })
  req.session.data.queriesCondition = queriesCondition
  res.redirect('/sprint-30-35/set-action/set-action-condition-eight')
})

router.post('/sprint-30-35/set-action/set-action-condition-eight', (req, res, next) => {
  console.log('this is condition eight')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-30-35/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-30-35/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-30-35/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-30-35/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-30-35/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-30-35/none-these-action';
    break;
  }

  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].content = req.session.data['condition-query']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-30-35/condition-eight')
})



// sprint 29 //***********************************************************************************************************

//Routes for tagging, questions and  out of scope for preparing food activity

//Start routes for preparing food: questions
router.post('/sprint-29/activities/preparing-food', (req, res, next) => {
    if (req.session.data['preparing-food-note'] == "question-about-this-condition" ) {
      console.log('/sprint-29/evidence-detail', req.session.data)
      const name = req.session.data['question-about-this-condition']
      const section = req.session.data.source

      const queriesPrepFood = req.session.data.queriesPrepFood || []
      queriesPrepFood.push({ name, section })
      req.session.data.queriesPrepFood = queriesPrepFood
      res.redirect('/sprint-29/set-action/set-action-preparing-food')

      //Routes for tagged documents linked to: preparing food
  } else if (req.session.data['preparing-food-note'] == "important-to-this-case" ){

        console.log('/sprint-29/activities/preparing-food', req.session.data)
        const tagOption = req.session.data['important-to-this-case']
        const section = req.session.data.source

        const taggingPrepFood = req.session.data.taggingPrepFood || []
        taggingPrepFood.push({ tagOption, section })
        req.session.data.taggingPrepFood = taggingPrepFood
        res.redirect('/sprint-29/tagging')

    } else {
      console.log('/sprint-29/activities/preparing-food', req.session.data)
      const name = req.session.data['out-of-scope']
      const scopeNote = req.session.data['query-content']
      const section = req.session.data.source

      const outScopePrepFood = req.session.data.outScopePrepFood || []
      outScopePrepFood.push({ name, section, scopeNote })
      req.session.data.outScopePrepFood = outScopePrepFood
      res.redirect('/sprint-29/activities/preparing-food')
    }
    })

    // follow up tagging code for: preparing food
    router.post('/sprint-29/tagging', (req, res, next) => {
      console.log('this is prepfood tagging')
      console.log(req.session.data)
      req.session.data.taggingPrepFood[req.session.data.taggingPrepFood.length - 1].tagContent = req.session.data['query-content']
      req.session.data.taggingPrepFood[req.session.data.taggingPrepFood.length - 1].action = req.session.data['tagConditionActivities']
    //  req.session.data.taggingPrepFood[req.session.data.taggingPrepFood.length - 1].page = req.session.data['page-URL'][1]['contact-claimant-page']
      console.log(1, req.session.data.taggingPrepFood)
      res.redirect('/sprint-29/activities/preparing-food')
    })

    // follow up code for out of scope for: preparing food
    router.post('/sprint-29/activities/preparing-food', (req, res, next) => {
      console.log('this is prepfood out of scope')
      console.log(req.session.data)

      req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].scopePrepFood = req.session.data['query-content']
    //  req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].action = req.session.data['set-an-action']
      //req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].href = href;
      console.log(1, req.session.data)
      res.redirect('/sprint-29/activities/preparing-food')
    })

// follow up route for linking questions to: preparing food
router.post('/sprint-29/set-action/set-action-preparing-food', (req, res, next) => {
  console.log('this is prep food questions')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-29/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-29/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-29/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-29/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-29/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-29/none-these-action';
    break;
  }

  req.session.data.queriesPrepFood[req.session.data.queriesPrepFood.length - 1].content = req.session.data['query-content']
  req.session.data.queriesPrepFood[req.session.data.queriesPrepFood.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesPrepFood[req.session.data.queriesPrepFood.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-29/activities/preparing-food')
})

//Start routes for taking nutrition: questions
router.post('/sprint-29/activities/taking-nutrition', (req, res, next) => {
    if (req.session.data['taking-nutrition-note'] == "question-about-this-condition" ) {
      console.log('/sprint-29/evidence-detail', req.session.data)
      const name = req.session.data['question-about-this-condition']
      const section = req.session.data.source

      const queriesTakeNutrition = req.session.data.queriesTakeNutrition || []
      queriesTakeNutrition.push({ name, section })
      req.session.data.queriesTakeNutrition = queriesTakeNutrition
      res.redirect('/sprint-29/set-action/set-action-taking-nutrition')

      //Routes for tagged documents linked to: taking nutrition
  } else if (req.session.data['taking-nutrition-note'] == "important-to-this-case" ){

        console.log('/sprint-29/activities/taking-nutrition', req.session.data)
        const tagOption = req.session.data['important-to-this-case']
        const section = req.session.data.source

        const taggingTakeNutrition = req.session.data.taggingTakeNutrition || []
        taggingTakeNutrition.push({ tagOption, section })
        req.session.data.taggingTakeNutrition = taggingTakeNutrition
        res.redirect('/sprint-29/tagging-activities/taking-nutrition')

    } else {
      console.log('/sprint-29/activities/taking-nutrition', req.session.data)
      const name = req.session.data['out-of-scope']
      const scopeNote = req.session.data['query-content']
      const section = req.session.data.source

      const outScopeTakeNutrition = req.session.data.outScopeTakeNutrition || []
      outScopeTakeNutrition.push({ name, section, scopeNote })
      req.session.data.outScopeTakeNutrition = outScopeTakeNutrition
      res.redirect('/sprint-29/activities/taking-nutrition')
    }
    })

    // follow up tagging code for: taking nutrition
    router.post('/sprint-29/tagging-activities/taking-nutrition', (req, res, next) => {
      console.log('this is taking nutrition tagging')
      console.log(req.session.data)
      req.session.data.taggingTakeNutrition[req.session.data.taggingTakeNutrition.length - 1].tagContent = req.session.data['query-content']
      req.session.data.taggingTakeNutrition[req.session.data.taggingTakeNutrition.length - 1].action = req.session.data['tagConditionActivities']
    //  req.session.data.taggingPrepFood[req.session.data.taggingPrepFood.length - 1].page = req.session.data['page-URL'][1]['contact-claimant-page']
      console.log(1, req.session.data.taggingTakeNutrition)
      res.redirect('/sprint-29/activities/taking-nutrition')
    })

    // follow up code for out of scope for: taking nutrition
    router.post('/sprint-29/activities/taking-nutrition', (req, res, next) => {
      console.log('this is taking nutrition out of scope')
      console.log(req.session.data)

      req.session.data.outScopeTakeNutrition[req.session.data.outScopeTakeNutrition.length - 1].scopeNote = req.session.data['query-content']
    //  req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].action = req.session.data['set-an-action']
      //req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].href = href;
      console.log(1, req.session.data)
      res.redirect('/sprint-29/activities/taking-nutrition')
    })

// follow up route for linking questions to: taking nutrition
router.post('/sprint-29/set-action/set-action-taking-nutrition', (req, res, next) => {
  console.log('this is taking nutrition questions')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-29/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-29/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-29/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-29/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-29/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-29/none-these-action';
    break;
  }

  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].content = req.session.data['query-content']
  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesTakeNutrition[req.session.data.queriesTakeNutrition.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-29/activities/taking-nutrition')
})

//Start routes for managing therapy: questions
router.post('/sprint-29/activities/managing-therapy', (req, res, next) => {
    if (req.session.data['managing-therapy-note'] == "question-about-this-condition" ) {
      console.log('/sprint-29/evidence-detail', req.session.data)
      const name = req.session.data['question-about-this-condition']
      const section = req.session.data.source

      const queriesManageTherapy = req.session.data.queriesManageTherapy || []
      queriesManageTherapy.push({ name, section })
      req.session.data.queriesManageTherapy = queriesManageTherapy
      res.redirect('/sprint-29/set-action/set-action-managing-therapy')

      //Routes for tagged documents linked to: managing therapy
  } else if (req.session.data['managing-therapy-note'] == "important-to-this-case" ){

        console.log('/sprint-29/activities/managing-therapy', req.session.data)
        const tagOption = req.session.data['important-to-this-case']
        const section = req.session.data.source

        const taggingManageTherapy = req.session.data.taggingManageTherapy || []
        taggingManageTherapy.push({ tagOption, section })
        req.session.data.taggingManageTherapy = taggingManageTherapy
        res.redirect('/sprint-29/tagging-activities/managing-therapy')

    } else {
      console.log('/sprint-29/activities/managing-therapy', req.session.data)
      const name = req.session.data['out-of-scope']
      const scopeNote = req.session.data['query-content']
      const section = req.session.data.source

      const outScopeManageTherapy = req.session.data.outScopeManageTherapy || []
      outScopeManageTherapy.push({ name, section, scopeNote })
      req.session.data.outScopeManageTherapy = outScopeManageTherapy
      res.redirect('/sprint-29/activities/managing-therapy')
    }
    })

    // follow up tagging code for: managing therapy
    router.post('/sprint-29/tagging-activities/managing-therapy', (req, res, next) => {
      console.log('this is managing therapy tagging')
      console.log(req.session.data)
      req.session.data.taggingManageTherapy[req.session.data.taggingManageTherapy.length - 1].tagContent = req.session.data['query-content']
      req.session.data.taggingManageTherapy[req.session.data.taggingManageTherapy.length - 1].action = req.session.data['tagConditionActivities']
    //  req.session.data.taggingPrepFood[req.session.data.taggingPrepFood.length - 1].page = req.session.data['page-URL'][1]['contact-claimant-page']
      console.log(1, req.session.data.taggingManageTherapy)
      res.redirect('/sprint-29/activities/managing-therapy')
    })

    // follow up code for out of scope for: managing therapy
    router.post('/sprint-29/activities/managing-therapy', (req, res, next) => {
      console.log('this is managing therapy out of scope')
      console.log(req.session.data)

      req.session.data.outScopeManageTherapy[req.session.data.outScopeManageTherapy.length - 1].scopeNote = req.session.data['query-content']
    //  req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].action = req.session.data['set-an-action']
      //req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].href = href;
      console.log(1, req.session.data)
      res.redirect('/sprint-29/activities/managing-therapy')
    })

// follow up route for linking questions to: managing therapy
router.post('/sprint-29/set-action/set-action-managing-therapy', (req, res, next) => {
  console.log('this is managing therapy questions')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-29/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-29/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-29/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-29/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-29/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-29/none-these-action';
    break;
  }

  req.session.data.queriesManageTherapy[req.session.data.queriesManageTherapy.length - 1].content = req.session.data['query-content']
  req.session.data.queriesManageTherapy[req.session.data.queriesManageTherapy.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesManageTherapy[req.session.data.queriesManageTherapy.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-29/activities/managing-therapy')
})


//Start routes for washing and bathing: questions
router.post('/sprint-29/activities/washing-and-bathing', (req, res, next) => {
    if (req.session.data['washing-and-bathing-note'] == "question-about-this-condition" ) {
      console.log('/sprint-29/evidence-detail', req.session.data)
      const name = req.session.data['question-about-this-condition']
      const section = req.session.data.source

      const queriesWashingBathing = req.session.data.queriesWashingBathing || []
      queriesWashingBathing.push({ name, section })
      req.session.data.queriesWashingBathing = queriesWashingBathing
      res.redirect('/sprint-29/set-action/set-action-washing-and-bathing')

      //Routes for tagged documents linked to: washing and bathing
  } else if (req.session.data['washing-and-bathing-note'] == "important-to-this-case" ){

        console.log('/sprint-29/activities/washing-and-bathing', req.session.data)
        const tagOption = req.session.data['important-to-this-case']
        const section = req.session.data.source

        const taggingWashingBathing = req.session.data.taggingWashingBathing || []
        taggingWashingBathing.push({ tagOption, section })
        req.session.data.taggingWashingBathing = taggingWashingBathing
        res.redirect('/sprint-29/tagging-activities/washing-and-bathing')

    } else {
      console.log('/sprint-29/activities/washing-and-bathing', req.session.data)
      const name = req.session.data['out-of-scope']
      const scopeNote = req.session.data['query-content']
      const section = req.session.data.source

      const outScopeWashingBathing = req.session.data.outScopeWashingBathing || []
      outScopeWashingBathing.push({ name, section, scopeNote })
      req.session.data.outScopeWashingBathing = outScopeWashingBathing
      res.redirect('/sprint-29/activities/washing-and-bathing')
    }
    })

    // follow up tagging code for: washing and bathing
    router.post('/sprint-29/tagging-activities/washing-and-bathing', (req, res, next) => {
      console.log('this is managing therapy tagging')
      console.log(req.session.data)
      req.session.data.taggingWashingBathing[req.session.data.taggingWashingBathing.length - 1].tagContent = req.session.data['query-content']
      req.session.data.taggingWashingBathing[req.session.data.taggingWashingBathing.length - 1].action = req.session.data['tagConditionActivities']
    //  req.session.data.taggingPrepFood[req.session.data.taggingPrepFood.length - 1].page = req.session.data['page-URL'][1]['contact-claimant-page']
      console.log(1, req.session.data.taggingWashingBathing)
      res.redirect('/sprint-29/activities/washing-and-bathing')
    })

    // follow up code for out of scope for: washing and bathing
    router.post('/sprint-29/activities/washing-and-bathing', (req, res, next) => {
      console.log('this is washing and bathing out of scope')
      console.log(req.session.data)

      req.session.data.outScopeWashingBathing[req.session.data.outScopeWashingBathing.length - 1].scopeNote = req.session.data['query-content']
    //  req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].action = req.session.data['set-an-action']
      //req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].href = href;
      console.log(1, req.session.data)
      res.redirect('/sprint-29/activities/washing-and-bathing')
    })

// follow up route for linking questions to: washing and bathing
router.post('/sprint-29/set-action/set-action-washing-and-bathing', (req, res, next) => {
  console.log('this is washing and bathing questions')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-29/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-29/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-29/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-29/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-29/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-29/none-these-action';
    break;
  }

  req.session.data.queriesWashingBathing[req.session.data.queriesWashingBathing.length - 1].content = req.session.data['query-content']
  req.session.data.queriesWashingBathing[req.session.data.queriesWashingBathing.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesWashingBathing[req.session.data.queriesWashingBathing.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-29/activities/washing-and-bathing')
})


//Start routes for managing toilet needs: questions
router.post('/sprint-29/activities/managing-toilet-needs', (req, res, next) => {
    if (req.session.data['managing-toilet-needs-note'] == "question-about-this-condition" ) {
      console.log('/sprint-29/evidence-detail', req.session.data)
      const name = req.session.data['question-about-this-condition']
      const section = req.session.data.source

      const queriesToiletneeds = req.session.data.queriesToiletneeds || []
      queriesToiletneeds.push({ name, section })
      req.session.data.queriesToiletneeds = queriesToiletneeds
      res.redirect('/sprint-29/set-action/set-action-managing-toilet-needs')

      //Routes for tagged documents linked to: managing toilet needs
  } else if (req.session.data['managing-toilet-needs-note'] == "important-to-this-case" ){

        console.log('/sprint-29/activities/managing-toilet-needs', req.session.data)
        const tagOption = req.session.data['important-to-this-case']
        const section = req.session.data.source

        const taggingToiletneeds = req.session.data.taggingToiletneeds || []
        taggingToiletneeds.push({ tagOption, section })
        req.session.data.taggingToiletneeds = taggingToiletneeds
        res.redirect('/sprint-29/tagging-activities/managing-toilet-needs')

    } else {
      console.log('/sprint-29/activities/managing-toilet-needs', req.session.data)
      const name = req.session.data['out-of-scope']
      const scopeNote = req.session.data['query-content']
      const section = req.session.data.source

      const outScopeToiletneeds = req.session.data.outScopeToiletneeds || []
      outScopeToiletneeds.push({ name, section, scopeNote })
      req.session.data.outScopeToiletneeds = outScopeToiletneeds
      res.redirect('/sprint-29/activities/managing-toilet-needs')
    }
    })

    // follow up tagging code for: managing toilet needs
    router.post('/sprint-29/tagging-activities/managing-toilet-needs', (req, res, next) => {
      console.log('this is managing toilet needs tagging')
      console.log(req.session.data)
      req.session.data.taggingToiletneeds[req.session.data.taggingToiletneeds.length - 1].tagContent = req.session.data['query-content']
      req.session.data.taggingToiletneeds[req.session.data.taggingToiletneeds.length - 1].action = req.session.data['tagConditionActivities']
    //  req.session.data.taggingPrepFood[req.session.data.taggingPrepFood.length - 1].page = req.session.data['page-URL'][1]['contact-claimant-page']
      console.log(1, req.session.data.taggingToiletneeds)
      res.redirect('/sprint-29/activities/managing-toilet-needs')
    })

    // follow up code for out of scope for: managing toilet needs
    router.post('/sprint-29/activities/managing-toilet-needs', (req, res, next) => {
      console.log('this is managing toilet needs out of scope')
      console.log(req.session.data)

      req.session.data.outScopeToiletneeds[req.session.data.outScopeToiletneeds.length - 1].scopeNote = req.session.data['query-content']
    //  req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].action = req.session.data['set-an-action']
      //req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].href = href;
      console.log(1, req.session.data)
      res.redirect('/sprint-29/activities/managing-toilet-needs')
    })

// follow up route for linking questions to: managing toilet needs
router.post('/sprint-29/set-action/set-action-managing-toilet-needs', (req, res, next) => {
  console.log('this is managing toilet needs questions')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-29/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-29/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-29/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-29/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-29/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-29/none-these-action';
    break;
  }

  req.session.data.queriesToiletneeds[req.session.data.queriesToiletneeds.length - 1].content = req.session.data['query-content']
  req.session.data.queriesToiletneeds[req.session.data.queriesToiletneeds.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesToiletneeds[req.session.data.queriesToiletneeds.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-29/activities/managing-toilet-needs')
})

//Start routes for dressing and undressing: questions
router.post('/sprint-29/activities/dressing-and-undressing', (req, res, next) => {
    if (req.session.data['dressing-and-undressing-note'] == "question-about-this-condition" ) {
      console.log('/sprint-29/evidence-detail', req.session.data)
      const name = req.session.data['question-about-this-condition']
      const section = req.session.data.source

      const queriesDressing = req.session.data.queriesDressing || []
      queriesDressing.push({ name, section })
      req.session.data.queriesDressing = queriesDressing
      res.redirect('/sprint-29/set-action/set-action-dressing-and-undressing')

      //Routes for tagged documents linked to: dressing and undressing
  } else if (req.session.data['dressing-and-undressing-note'] == "important-to-this-case" ){

        console.log('/sprint-29/activities/dressing-and-undressing', req.session.data)
        const tagOption = req.session.data['important-to-this-case']
        const section = req.session.data.source

        const taggingDressing = req.session.data.taggingDressing || []
        taggingDressing.push({ tagOption, section })
        req.session.data.taggingDressing = taggingDressing
        res.redirect('/sprint-29/tagging-activities/dressing-and-undressing')

    } else {
      console.log('/sprint-29/activities/dressing-and-undressing', req.session.data)
      const name = req.session.data['out-of-scope']
      const scopeNote = req.session.data['query-content']
      const section = req.session.data.source

      const outScopeDressing = req.session.data.outScopeDressing || []
      outScopeDressing.push({ name, section, scopeNote })
      req.session.data.outScopeDressing = outScopeDressing
      res.redirect('/sprint-29/activities/dressing-and-undressing')
    }
    })

    // follow up tagging code for: dressing and undressing
    router.post('/sprint-29/tagging-activities/dressing-and-undressing', (req, res, next) => {
      console.log('this is dressing and undressing tagging')
      console.log(req.session.data)
      req.session.data.taggingDressing[req.session.data.taggingDressing.length - 1].tagContent = req.session.data['query-content']
      req.session.data.taggingDressing[req.session.data.taggingDressing.length - 1].action = req.session.data['tagConditionActivities']
    //  req.session.data.taggingPrepFood[req.session.data.taggingPrepFood.length - 1].page = req.session.data['page-URL'][1]['contact-claimant-page']
      console.log(1, req.session.data.taggingDressing)
      res.redirect('/sprint-29/activities/dressing-and-undressing')
    })

    // follow up code for out of scope for: dressing and undressing
    router.post('/sprint-29/activities/dressing-and-undressing', (req, res, next) => {
      console.log('this is dressing and undressing out of scope')
      console.log(req.session.data)

      req.session.data.outScopeDressing[req.session.data.outScopeDressing.length - 1].scopeNote = req.session.data['query-content']
    //  req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].action = req.session.data['set-an-action']
      //req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].href = href;
      console.log(1, req.session.data)
      res.redirect('/sprint-29/activities/dressing-and-undressing')
    })

// follow up route for linking questions to: dressing and undressing
router.post('/sprint-29/set-action/set-action-dressing-and-undressing', (req, res, next) => {
  console.log('this is dressing and undressing questions')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-29/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-29/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-29/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-29/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-29/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-29/none-these-action';
    break;
  }

  req.session.data.queriesDressing[req.session.data.queriesDressing.length - 1].content = req.session.data['query-content']
  req.session.data.queriesDressing[req.session.data.queriesDressing.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesDressing[req.session.data.queriesDressing.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-29/activities/dressing-and-undressing')
})

//Start routes for scoring
router.post('/sprint-29/set-descriptor', (req, res, next) => {
  //  if (req.session.data['set-descriptor'] == "Can prepare and cook a simple meal unaided" ) {
    console.log('/sprint-29/set-descriptor', req.session.data)
    const descriptor = req.session.data['set-descriptor']

        let points;

        switch (req.session.data['set-descriptor']) {
          case('Can prepare and cook a simple meal unaided'):
          points = '0';
          break;
          case('Needs to use an aid or appliance to be able to either prepare or cook a simple meal'):
          points = '2';
          break;
          case('Cannot cook a simple meal using a conventional cooker but is able to do so using a microwave'):
          points = '2';
          break;
          case('Needs prompting to be able to either prepare or cook a simple meal'):
          points = '2';
          break;
          case('Needs supervision or assistance to either prepare or cook a simple meal'):
          points = '4';
          break;
          case('Cannot prepare and cook food at all'):
          points = '8';
          break;
        }

     const scoresChoice = req.session.data.scoresChoice || []
     scoresChoice.push({ descriptor, points })
      req.session.data.scoresChoice = scoresChoice
      res.redirect('/sprint-29/review-activity-descriptors')
    //}
})

router.post('/sprint-29/review-activity-descriptors', (req, res, next) => {
  console.log('this is scoring')
  console.log(req.session.data)

  req.session.data.scoresChoice[req.session.data.scoresChoice.length - 1].points = points;

  console.log(1, req.session.data.scoresChoice)
  res.redirect('/sprint-29/review-activity-descriptors')
})



//Create query taking nutrition activity
router.post('/sprint-29/activities/taking-nutrition', (req, res, next) => {
  console.log('/sprint-29/activities/taking-nutrition', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-29/set-action/set-action-taking-nutrition')
})

router.post('/sprint-29/set-action/set-action-taking-nutrition', (req, res, next) => {
  console.log('this is taking nutrition')
  console.log(req.session.data)
  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-29/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-29/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-29/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-29/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-29/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-29/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-29/activities/taking-nutrition')
})

//Create query managing therapy activity
router.post('/sprint-29/activities/managing-therapy', (req, res, next) => {
  console.log('/sprint-29/activities/managing-therapy', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-29/set-action/set-action-managing-therapy')
})

router.post('/sprint-29/set-action/set-action-managing-therapy', (req, res, next) => {
  console.log('this is managing therapy')
  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-29/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-29/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-29/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-29/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-29/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-29/none-these-action';
    break;
  }

  console.log(req.session.data)
  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-29/activities/managing-therapy')
})

//Create query washing and bathing activity
router.post('/sprint-29/activities/washing-and-bathing', (req, res, next) => {
  console.log('/sprint-29/activities/washing-and-bathing', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-29/set-action/set-action-washing-and-bathing')
})

router.post('/sprint-29/set-action/set-action-washing-and-bathing', (req, res, next) => {
  console.log('this is washing and bathing')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-29/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-29/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-29/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-29/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-29/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-29/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-29/activities/washing-and-bathing')
})

//Create query managing toilet needs activity
router.post('/sprint-29/activities/managing-toilet-needs', (req, res, next) => {
  console.log('/sprint-29/activities/managing-toilet-needs', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-29/set-action/set-action-managing-toilet-needs')
})

router.post('/sprint-29/set-action/set-action-managing-toilet-needs', (req, res, next) => {
  console.log('this is managing toilet needs')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-29/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-29/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-29/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-29/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-29/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-29/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-29/activities/managing-toilet-needs')
})

//Create query dressing and undressing activity
router.post('/sprint-29/activities/dressing-and-undressing', (req, res, next) => {
  console.log('/sprint-29/activities/dressing-and-undressing', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-29/set-action/set-action-dressing-and-undressing')
})

router.post('/sprint-29/set-action/set-action-dressing-and-undressing', (req, res, next) => {
  console.log('this is dressing and undressing')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-29/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-29/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-29/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-29/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-29/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-29/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-29/activities/dressing-and-undressing')
})

//Create query communicating verbally activity
router.post('/sprint-29/activities/communicating-verbally', (req, res, next) => {
  console.log('/sprint-29/activities/communicating-verbally', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-29/set-action/set-action-communicating-verbally')
})

router.post('/sprint-29/set-action/set-action-communicating-verbally', (req, res, next) => {
  console.log('this is communicating verbally')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-29/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-29/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-29/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-29/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-29/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-29/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-29/activities/communicating-verbally')
})

//Create query reading and understanding activity
router.post('/sprint-29/activities/reading-and-understanding', (req, res, next) => {
  console.log('/sprint-29/activities/reading-and-understanding', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-29/set-action/set-action-reading-and-understanding')
})

router.post('/sprint-29/set-action/set-action-reading-and-understanding', (req, res, next) => {
  console.log('this is reading and understanding')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-29/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-29/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-29/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-29/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-29/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-29/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-29/activities/reading-and-understanding')
})

//Create query engaging face to face activity
router.post('/sprint-29/activities/engaging-face-to-face', (req, res, next) => {
  console.log('/sprint-29/activities/engaging-face-to-face', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-29/set-action/set-action-engage-face-to-face')
})

router.post('/sprint-29/set-action/set-action-engage-face-to-face', (req, res, next) => {
  console.log('this is engaging face to face')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-29/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-29/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-29/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-29/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-29/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-29/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-29/activities/engaging-face-to-face')
})

//Create query budgeting activity
router.post('/sprint-29/activities/budgeting', (req, res, next) => {
  console.log('/sprint-29/activities/budgeting', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-29/set-action/set-action-budgeting')
})

router.post('/sprint-29/set-action/set-action-budgeting', (req, res, next) => {
  console.log('this is budgeting')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-29/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-29/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-29/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-29/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-29/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-29/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-29/activities/budgeting')
})

//Create query planning and following journeys activity
router.post('/sprint-29/activities/planning-and-following-journeys', (req, res, next) => {
  console.log('/sprint-29/activities/planning-and-following-journeys', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-29/set-action/set-action-planning-and-following-journeys')
})

router.post('/sprint-29/set-action/set-action-planning-and-following-journeys', (req, res, next) => {
  console.log('this is planning and following journeys')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-29/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-29/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-29/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-29/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-29/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-29/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-29/activities/planning-and-following-journeys')
})

//Create query moving around activity
router.post('/sprint-29/activities/moving-around', (req, res, next) => {
  console.log('/sprint-29/activities/moving-around', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-29/set-action/set-action-moving-around')
})

router.post('/sprint-29/set-action/set-action-moving-around', (req, res, next) => {
  console.log('this is moving around')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-29/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-29/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-29/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-29/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-29/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-29/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-29/activities/moving-around')
})

//**************************************************************************************************************************************
//Routes for queries linked to Evidence number 1

router.post('/sprint-29/evidence-detail', (req, res, next) => {
    if (req.session.data['evidence-one-note'] == "question-about-this-condition" ) {
      console.log('/sprint-29/evidence-detail', req.session.data)
      const name = req.session.data['evidence-query']
      const section = req.session.data.source

      const queriesEvidence = req.session.data.queriesEvidence || []
      queriesEvidence.push({ name, section })
      req.session.data.queriesEvidence = queriesEvidence
      res.redirect('/sprint-29/set-action/set-action-evidence')

    } else if (req.session.data['evidence-one-note'] == "important-to-this-case" ) {
        //Routes for tagged documents linked to Evidence
            console.log('/sprint-29/evidence-detail', req.session.data)
            const name = req.session.data['evidence-query']
            //const pageURL = req.session.data['page-URL'][1]['contact-claimant-page']
            //console.log(pageURL)
            const section = req.session.data.source

            const conditionsEvidenceOne = req.session.data.conditionsEvidenceOne || []
            conditionsEvidenceOne.push({ name, section })
            req.session.data.conditionsEvidenceOne = conditionsEvidenceOne
            res.redirect('/sprint-29/tagging-evidence/evidence-one')

  } else {
    console.log('/sprint-29/evidence-detail', req.session.data)
    const name = req.session.data['out-of-scope']
    const scopeEvidenceOne = req.session.data['query-content']
    const section = req.session.data.source

    const outScopeEvidenceOne = req.session.data.outScopeEvidenceOne || []
    outScopeEvidenceOne.push({ name, section, scopeEvidenceOne })
    req.session.data.outScopeEvidenceOne = outScopeEvidenceOne
    res.redirect('/sprint-29/evidence-detail')

    }
    })

// follow up for tagging important info: evidence one
    router.post('/sprint-29/tagging-evidence/evidence-one', (req, res, next) => {
      console.log('this is evidence one')
      console.log(req.session.data)
      req.session.data.conditionsEvidenceOne[req.session.data.conditionsEvidenceOne.length - 1].evidenceNoteOne = req.session.data['query-content']
      req.session.data.conditionsEvidenceOne[req.session.data.conditionsEvidenceOne.length - 1].action = req.session.data['tagConditionEvidence']
      //req.session.data.conditionsEvidence[req.session.data.conditionsEvidence.length - 1].page = req.session.data['page-URL'][1]['contact-claimant-page']
      console.log(1, req.session.data.conditionsEvidenceOne)
      res.redirect('/sprint-29/evidence-detail')
    })

// follow up route for linking queries to evidence number 1
router.post('/sprint-29/set-action/set-action-evidence', (req, res, next) => {
  console.log('this is evidence query')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-29/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-29/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-29/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-29/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-29/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-29/none-these-action';
    break;
  }

  req.session.data.queriesEvidence[req.session.data.queriesEvidence.length - 1].evidence = req.session.data['query-content']
  req.session.data.queriesEvidence[req.session.data.queriesEvidence.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesEvidence[req.session.data.queriesEvidence.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-29/evidence-detail')
})

// follow up roiute for out of scope: evidence one
router.post('/sprint-29/evidence-detail', (req, res, next) => {
  console.log('this is evidence one out of scope')
  console.log(req.session.data)

  req.session.data.outScopeEvidenceOne[req.session.data.outScopeEvidenceOne.length - 1].scopeEvidenceOne = req.session.data['query-content']
//  req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].action = req.session.data['set-an-action']
  //req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-29/evidence-detail')
})

//Routes for queries linked to Evidence number 2

router.post('/sprint-29/evidence-detail-two', (req, res, next) => {
    if (req.session.data['evidence-note-two'] == "question-about-this-condition" ) {
      console.log('/sprint-29/evidence-detail', req.session.data)
      const name = req.session.data['evidence-query']
      const section = req.session.data.source

      const queriesEvidenceTwo = req.session.data.queriesEvidenceTwo || []
      queriesEvidenceTwo.push({ name, section })
      req.session.data.queriesEvidenceTwo = queriesEvidenceTwo
      res.redirect('/sprint-29/set-action/set-action-evidence-two')

    } else if (req.session.data['evidence-note-two'] == "important-to-this-case" ) {
        //Routes for tagged documents linked to Evidence
            console.log('/sprint-29/evidence-detail-two', req.session.data)
            const name = req.session.data['query-content']
            //const pageURL = req.session.data['page-URL'][1]['contact-claimant-page']
            //console.log(pageURL)
            const section = req.session.data.source

            const conditionsEvidence = req.session.data.conditionsEvidence || []
            conditionsEvidence.push({ name, section })
            req.session.data.conditionsEvidence = conditionsEvidence
            res.redirect('/sprint-29/tagging-evidence/evidence-two')

  } else {
    console.log('/sprint-29/evidence-detail-two', req.session.data)
    const name = req.session.data['out-of-scope']
    const scopeEvidenceTwo = req.session.data['query-content']
    const section = req.session.data.source

    const outScopeEvidenceTwo = req.session.data.outScopeEvidenceTwo || []
    outScopeEvidenceTwo.push({ name, section, scopeEvidenceTwo })
    req.session.data.outScopeEvidenceTwo = outScopeEvidenceTwo
    res.redirect('/sprint-29/evidence-detail-two')

    }
    })

// follow up for tagging important info: evidence two
    router.post('/sprint-29/tagging-evidence/evidence-two', (req, res, next) => {
      console.log('this is evidence')
      console.log(req.session.data)
      req.session.data.conditionsEvidence[req.session.data.conditionsEvidence.length - 1].evidenceNote = req.session.data['query-content']
      req.session.data.conditionsEvidence[req.session.data.conditionsEvidence.length - 1].action = req.session.data['tagConditionEvidence']
      //req.session.data.conditionsEvidence[req.session.data.conditionsEvidence.length - 1].page = req.session.data['page-URL'][1]['contact-claimant-page']
      console.log(1, req.session.data.conditionsEvidence)
      res.redirect('/sprint-29/evidence-detail-two')
    })

// follow up route for linking queries to evidence number two
router.post('/sprint-29/set-action/set-action-evidence-two', (req, res, next) => {
  console.log('this is evidence query')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-29/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-29/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-29/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-29/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-29/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-29/none-these-action';
    break;
  }

  req.session.data.queriesEvidenceTwo[req.session.data.queriesEvidenceTwo.length - 1].evidence = req.session.data['query-content']
  req.session.data.queriesEvidenceTwo[req.session.data.queriesEvidenceTwo.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesEvidenceTwo[req.session.data.queriesEvidenceTwo.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-29/evidence-detail-two')
})

// follow up route for out of scope: evidence two
router.post('/sprint-29/evidence-detail-two', (req, res, next) => {
  console.log('this is evidence two out of scope')
  console.log(req.session.data)

  req.session.data.outScopeEvidenceTwo[req.session.data.outScopeEvidenceTwo.length - 1].scopeEvidenceTwo = req.session.data['query-content']
//  req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].action = req.session.data['set-an-action']
  //req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-29/evidence-detail-two')
})
//Routes for queries appearing on action page

router.post('/sprint-29/contact-claimant-action', (req, res, next) => {
  console.log('/sprint-29/contact-claimant-action', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-29/contact-claimant-action')
})

router.post('/sprint-29/contact-claimant-action', (req, res, next) => {
  console.log('this is contact claimant action')
  console.log(req.session.data)
  req.session.data.queries[req.session.data.queries.length - 1].contentQ = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  console.log(1, req.session.data)
  res.redirect('/sprint-29/contact-claimant-action')
})

//Routes for query condtion1

router.post('/sprint-29/condition-one', (req, res, next) => {
  console.log('/sprint-29/condition-one', req.session.data)
  const name = req.session.data['condition-query']
  const section = req.session.data.source
  const queriesCondition = req.session.data.queriesCondition || []
  queriesCondition.push({ name, section })
  req.session.data.queriesCondition = queriesCondition
  res.redirect('/sprint-29/set-action/set-action-condition-one')
})

router.post('/sprint-29/set-action/set-action-condition-one', (req, res, next) => {
  console.log('this is condition one')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-29/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-29/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-29/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-29/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-29/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-29/none-these-action';
    break;
  }

  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].content = req.session.data['condition-query']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-29/condition-one')
})

//Routes for query condtion2

router.post('/sprint-29/condition-two', (req, res, next) => {
  console.log('/sprint-29/condition-two', req.session.data)
  const name = req.session.data['condition-query']
  const section = req.session.data.source
  const queriesCondition = req.session.data.queriesCondition || []
  queriesCondition.push({ name, section })
  req.session.data.queriesCondition = queriesCondition
  res.redirect('/sprint-29/set-action/set-action-condition-two')
})

router.post('/sprint-29/set-action/set-action-condition-two', (req, res, next) => {
  console.log('this is condition two')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-29/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-29/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-29/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-29/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-29/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-29/none-these-action';
    break;
  }

  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].content = req.session.data['condition-query']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-29/condition-two')
})

//Routes for query condtion3

router.post('/sprint-29/condition-three', (req, res, next) => {
  console.log('/sprint-29/condition-three', req.session.data)
  const name = req.session.data['condition-query']
  const section = req.session.data.source
  const queriesCondition = req.session.data.queriesCondition || []
  queriesCondition.push({ name, section })
  req.session.data.queriesCondition = queriesCondition
  res.redirect('/sprint-29/set-action/set-action-condition-three')
})

router.post('/sprint-29/set-action/set-action-condition-three', (req, res, next) => {
  console.log('this is condition three')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-29/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-29/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-29/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-29/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-29/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-29/none-these-action';
    break;
  }

  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].content = req.session.data['condition-query']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-29/condition-three')
})

//Routes for query condtion4

router.post('/sprint-29/condition-four', (req, res, next) => {
  console.log('/sprint-29/condition-four', req.session.data)
  const name = req.session.data['condition-query']
  const section = req.session.data.source
  const queriesCondition = req.session.data.queriesCondition || []
  queriesCondition.push({ name, section })
  req.session.data.queriesCondition = queriesCondition
  res.redirect('/sprint-29/set-action/set-action-condition-four')
})

router.post('/sprint-29/set-action/set-action-condition-four', (req, res, next) => {
  console.log('this is condition four')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-29/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-29/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-29/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-29/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-29/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-29/none-these-action';
    break;
  }

  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].content = req.session.data['condition-query']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-29/task-list')
})

//Routes for query condtion5

router.post('/sprint-29/condition-five', (req, res, next) => {
  console.log('/sprint-29/condition-five', req.session.data)
  const name = req.session.data['condition-query']
  const section = req.session.data.source
  const queriesCondition = req.session.data.queriesCondition || []
  queriesCondition.push({ name, section })
  req.session.data.queriesCondition = queriesCondition
  res.redirect('/sprint-29/set-action/set-action-condition-five')
})

router.post('/sprint-29/set-action/set-action-condition-five', (req, res, next) => {
  console.log('this is condition five')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-29/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-29/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-29/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-29/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-29/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-29/none-these-action';
    break;
  }

  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].content = req.session.data['condition-query']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-29/condition-five')
})

//Routes for query condtion6

router.post('/sprint-29/condition-six', (req, res, next) => {
  console.log('/sprint-29/condition-six', req.session.data)
  const name = req.session.data['condition-query']
  const section = req.session.data.source
  const queriesCondition = req.session.data.queriesCondition || []
  queriesCondition.push({ name, section })
  req.session.data.queriesCondition = queriesCondition
  res.redirect('/sprint-29/set-action/set-action-condition-six')
})

router.post('/sprint-29/set-action/set-action-condition-six', (req, res, next) => {
  console.log('this is condition six')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-29/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-29/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-29/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-29/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-29/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-29/none-these-action';
    break;
  }

  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].content = req.session.data['condition-query']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-29/condition-six')
})

//Routes for query condtion7

router.post('/sprint-29/condition-seven', (req, res, next) => {
  console.log('/sprint-29/condition-seven', req.session.data)
  const name = req.session.data['condition-query']
  const section = req.session.data.source
  const queriesCondition = req.session.data.queriesCondition || []
  queriesCondition.push({ name, section })
  req.session.data.queriesCondition = queriesCondition
  res.redirect('/sprint-29/set-action/set-action-condition-seven')
})

router.post('/sprint-29/set-action/set-action-condition-seven', (req, res, next) => {
  console.log('this is condition seven')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-29/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-29/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-29/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-29/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-29/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-29/none-these-action';
    break;
  }

  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].content = req.session.data['condition-query']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-29/condition-seven')
})

//Routes for query condtion8

router.post('/sprint-29/condition-eight', (req, res, next) => {
  console.log('/sprint-29/condition-eight', req.session.data)
  const name = req.session.data['condition-query']
  const section = req.session.data.source
  const queriesCondition = req.session.data.queriesCondition || []
  queriesCondition.push({ name, section })
  req.session.data.queriesCondition = queriesCondition
  res.redirect('/sprint-29/set-action/set-action-condition-eight')
})

router.post('/sprint-29/set-action/set-action-condition-eight', (req, res, next) => {
  console.log('this is condition eight')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-29/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-29/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-29/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-29/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-29/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-29/none-these-action';
    break;
  }

  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].content = req.session.data['condition-query']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-29/condition-eight')
})


// sprint 28 //***********************************************************************************************************


//Routes for tagging, questions and  out of scope for preparing food activity

//Start routes for preparing food: questions
router.post('/sprint-28/activities/preparing-food', (req, res, next) => {
    if (req.session.data['preparing-food-note'] == "question-about-this-condition" ) {
      console.log('/sprint-28/evidence-detail', req.session.data)
      const name = req.session.data['question-about-this-condition']
      const section = req.session.data.source

      const queriesPrepFood = req.session.data.queriesPrepFood || []
      queriesPrepFood.push({ name, section })
      req.session.data.queriesPrepFood = queriesPrepFood
      res.redirect('/sprint-28/set-action/set-action-preparing-food')

      //Routes for tagged documents linked to: preparing food
  } else if (req.session.data['preparing-food-note'] == "important-to-this-case" ){

        console.log('/sprint-28/activities/preparing-food', req.session.data)
        const tagOption = req.session.data['important-to-this-case']
        const section = req.session.data.source

        const taggingPrepFood = req.session.data.taggingPrepFood || []
        taggingPrepFood.push({ tagOption, section })
        req.session.data.taggingPrepFood = taggingPrepFood
        res.redirect('/sprint-28/tagging')

    } else {
      console.log('/sprint-28/activities/preparing-food', req.session.data)
      const name = req.session.data['out-of-scope']
      const scopeNote = req.session.data['query-content']
      const section = req.session.data.source

      const outScopePrepFood = req.session.data.outScopePrepFood || []
      outScopePrepFood.push({ name, section, scopeNote })
      req.session.data.outScopePrepFood = outScopePrepFood
      res.redirect('/sprint-28/activities/preparing-food')
    }
    })

    // follow up tagging code for: preparing food
    router.post('/sprint-28/tagging', (req, res, next) => {
      console.log('this is prepfood tagging')
      console.log(req.session.data)
      req.session.data.taggingPrepFood[req.session.data.taggingPrepFood.length - 1].tagContent = req.session.data['query-content']
      req.session.data.taggingPrepFood[req.session.data.taggingPrepFood.length - 1].action = req.session.data['tagConditionActivities']
    //  req.session.data.taggingPrepFood[req.session.data.taggingPrepFood.length - 1].page = req.session.data['page-URL'][1]['contact-claimant-page']
      console.log(1, req.session.data.taggingPrepFood)
      res.redirect('/sprint-28/activities/preparing-food')
    })

    // follow up code for out of scope for: preparing food
    router.post('/sprint-28/activities/preparing-food', (req, res, next) => {
      console.log('this is prepfood out of scope')
      console.log(req.session.data)

      req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].scopePrepFood = req.session.data['query-content']
    //  req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].action = req.session.data['set-an-action']
      //req.session.data.outScopePrepFood[req.session.data.outScopePrepFood.length - 1].href = href;
      console.log(1, req.session.data)
      res.redirect('/sprint-28/activities/preparing-food')
    })

// follow up route for linking questions to: preparing food
router.post('/sprint-28/set-action/set-action-preparing-food', (req, res, next) => {
  console.log('this is prep food questions')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-28/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-28/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-28/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-28/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-28/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-28/none-these-action';
    break;
  }

  req.session.data.queriesPrepFood[req.session.data.queriesPrepFood.length - 1].content = req.session.data['query-content']
  req.session.data.queriesPrepFood[req.session.data.queriesPrepFood.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesPrepFood[req.session.data.queriesPrepFood.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-28/activities/preparing-food')
})

//Start routes for scoring
router.post('/sprint-28/set-descriptor', (req, res, next) => {
  //  if (req.session.data['set-descriptor'] == "Can prepare and cook a simple meal unaided" ) {
    console.log('/sprint-28/set-descriptor', req.session.data)
    const descriptor = req.session.data['set-descriptor']

        let points;

        switch (req.session.data['set-descriptor']) {
          case('Can prepare and cook a simple meal unaided'):
          points = '0';
          break;
          case('Needs to use an aid or appliance to be able to either prepare or cook a simple meal'):
          points = '2';
          break;
          case('Cannot cook a simple meal using a conventional cooker but is able to do so using a microwave'):
          points = '2';
          break;
          case('Needs prompting to be able to either prepare or cook a simple meal'):
          points = '2';
          break;
          case('Needs supervision or assistance to either prepare or cook a simple meal'):
          points = '4';
          break;
          case('Cannot prepare and cook food at all'):
          points = '8';
          break;
        }

     const scoresChoice = req.session.data.scoresChoice || []
     scoresChoice.push({ descriptor, points })
      req.session.data.scoresChoice = scoresChoice
      res.redirect('/sprint-28/review-activity-descriptors')
    //}
})

router.post('/sprint-28/review-activity-descriptors', (req, res, next) => {
  console.log('this is scoring')
  console.log(req.session.data)

  req.session.data.scoresChoice[req.session.data.scoresChoice.length - 1].points = points;

  console.log(1, req.session.data.scoresChoice)
  res.redirect('/sprint-28/review-activity-descriptors')
})



//Create query taking nutrition activity
router.post('/sprint-28/activities/taking-nutrition', (req, res, next) => {
  console.log('/sprint-28/activities/taking-nutrition', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-28/set-action/set-action-taking-nutrition')
})

router.post('/sprint-28/set-action/set-action-taking-nutrition', (req, res, next) => {
  console.log('this is taking nutrition')
  console.log(req.session.data)
  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-28/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-28/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-28/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-28/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-28/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-28/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-28/activities/taking-nutrition')
})

//Create query managing therapy activity
router.post('/sprint-28/activities/managing-therapy', (req, res, next) => {
  console.log('/sprint-28/activities/managing-therapy', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-28/set-action/set-action-managing-therapy')
})

router.post('/sprint-28/set-action/set-action-managing-therapy', (req, res, next) => {
  console.log('this is managing therapy')
  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-28/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-28/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-28/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-28/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-28/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-28/none-these-action';
    break;
  }

  console.log(req.session.data)
  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-28/activities/managing-therapy')
})

//Create query washing and bathing activity
router.post('/sprint-28/activities/washing-and-bathing', (req, res, next) => {
  console.log('/sprint-28/activities/washing-and-bathing', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-28/set-action/set-action-washing-and-bathing')
})

router.post('/sprint-28/set-action/set-action-washing-and-bathing', (req, res, next) => {
  console.log('this is washing and bathing')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-28/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-28/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-28/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-28/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-28/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-28/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-28/activities/washing-and-bathing')
})

//Create query managing toilet needs activity
router.post('/sprint-28/activities/managing-toilet-needs', (req, res, next) => {
  console.log('/sprint-28/activities/managing-toilet-needs', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-28/set-action/set-action-managing-toilet-needs')
})

router.post('/sprint-28/set-action/set-action-managing-toilet-needs', (req, res, next) => {
  console.log('this is managing toilet needs')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-28/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-28/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-28/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-28/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-28/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-28/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-28/activities/managing-toilet-needs')
})

//Create query dressing and undressing activity
router.post('/sprint-28/activities/dressing-and-undressing', (req, res, next) => {
  console.log('/sprint-28/activities/dressing-and-undressing', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-28/set-action/set-action-dressing-and-undressing')
})

router.post('/sprint-28/set-action/set-action-dressing-and-undressing', (req, res, next) => {
  console.log('this is dressing and undressing')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-28/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-28/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-28/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-28/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-28/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-28/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-28/activities/dressing-and-undressing')
})

//Create query communicating verbally activity
router.post('/sprint-28/activities/communicating-verbally', (req, res, next) => {
  console.log('/sprint-28/activities/communicating-verbally', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-28/set-action/set-action-communicating-verbally')
})

router.post('/sprint-28/set-action/set-action-communicating-verbally', (req, res, next) => {
  console.log('this is communicating verbally')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-28/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-28/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-28/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-28/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-28/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-28/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-28/activities/communicating-verbally')
})

//Create query reading and understanding activity
router.post('/sprint-28/activities/reading-and-understanding', (req, res, next) => {
  console.log('/sprint-28/activities/reading-and-understanding', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-28/set-action/set-action-reading-and-understanding')
})

router.post('/sprint-28/set-action/set-action-reading-and-understanding', (req, res, next) => {
  console.log('this is reading and understanding')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-28/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-28/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-28/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-28/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-28/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-28/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-28/activities/reading-and-understanding')
})

//Create query engaging face to face activity
router.post('/sprint-28/activities/engaging-face-to-face', (req, res, next) => {
  console.log('/sprint-28/activities/engaging-face-to-face', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-28/set-action/set-action-engage-face-to-face')
})

router.post('/sprint-28/set-action/set-action-engage-face-to-face', (req, res, next) => {
  console.log('this is engaging face to face')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-28/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-28/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-28/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-28/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-28/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-28/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-28/activities/engaging-face-to-face')
})

//Create query budgeting activity
router.post('/sprint-28/activities/budgeting', (req, res, next) => {
  console.log('/sprint-28/activities/budgeting', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-28/set-action/set-action-budgeting')
})

router.post('/sprint-28/set-action/set-action-budgeting', (req, res, next) => {
  console.log('this is budgeting')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-28/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-28/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-28/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-28/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-28/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-28/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-28/activities/budgeting')
})

//Create query planning and following journeys activity
router.post('/sprint-28/activities/planning-and-following-journeys', (req, res, next) => {
  console.log('/sprint-28/activities/planning-and-following-journeys', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-28/set-action/set-action-planning-and-following-journeys')
})

router.post('/sprint-28/set-action/set-action-planning-and-following-journeys', (req, res, next) => {
  console.log('this is planning and following journeys')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-28/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-28/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-28/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-28/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-28/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-28/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-28/activities/planning-and-following-journeys')
})

//Create query moving around activity
router.post('/sprint-28/activities/moving-around', (req, res, next) => {
  console.log('/sprint-28/activities/moving-around', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-28/set-action/set-action-moving-around')
})

router.post('/sprint-28/set-action/set-action-moving-around', (req, res, next) => {
  console.log('this is moving around')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-28/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-28/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-28/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-28/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-28/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-28/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-28/activities/moving-around')
})

//**************************************************************************************************************************************
//Routes for queries linked to Evidence number 1

router.post('/sprint-28/evidence-detail', (req, res, next) => {
    if (req.session.data['tagging-evidence'] == "evidence-query" ) {
      console.log('/sprint-28/evidence-detail', req.session.data)
      const name = req.session.data['evidence-query']
      const section = req.session.data.source

      const queriesEvidence = req.session.data.queriesEvidence || []
      queriesEvidence.push({ name, section })
      req.session.data.queriesEvidence = queriesEvidence
      res.redirect('/sprint-28/set-action/set-action-evidence')

  } else {

    //Routes for tagged documents linked to Evidence
        console.log('/sprint-28/evidence-detail', req.session.data)
        const name = req.session.data['evidence-query']
        const pageURL = req.session.data['page-URL'][1]['contact-claimant-page']
        console.log(pageURL)
        const section = req.session.data.source

        const conditionsEvidence = req.session.data.conditionsEvidence || []
        conditionsEvidence.push({ name, section, pageURL })
        req.session.data.conditionsEvidence = conditionsEvidence
        res.redirect('/sprint-28/tagging')
    }
    })

    router.post('/sprint-28/tagging', (req, res, next) => {
      console.log('this is evidence')
      console.log(req.session.data)
      req.session.data.conditionsEvidence[req.session.data.conditionsEvidence.length - 1].evidence = req.session.data['evidence-query']
      req.session.data.conditionsEvidence[req.session.data.conditionsEvidence.length - 1].action = req.session.data['conditions']
      req.session.data.conditionsEvidence[req.session.data.conditionsEvidence.length - 1].page = req.session.data['page-URL'][1]['contact-claimant-page']
      console.log(1, req.session.data.conditionsEvidence)
      res.redirect('/sprint-28/evidence-detail')
    })

// follow up route for linking queries to evidence number 1
router.post('/sprint-28/set-action/set-action-evidence', (req, res, next) => {
  console.log('this is evidence query')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-28/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-28/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-28/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-28/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-28/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-28/none-these-action';
    break;
  }

  req.session.data.queriesEvidence[req.session.data.queriesEvidence.length - 1].evidence = req.session.data['evidence-query']
  req.session.data.queriesEvidence[req.session.data.queriesEvidence.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesEvidence[req.session.data.queriesEvidence.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-28/evidence-detail')
})


//Routes for queries linked to Evidence number 2

router.post('/sprint-28/evidence-detail-two', (req, res, next) => {
    if (req.session.data['tagging-evidence'] == "evidence-query" ) {
      console.log('/sprint-28/evidence-detail', req.session.data)
      const name = req.session.data['evidence-query']
      const section = req.session.data.source

      const queriesEvidence = req.session.data.queriesEvidence || []
      queriesEvidence.push({ name, section })
      req.session.data.queriesEvidence = queriesEvidence
      res.redirect('/sprint-28/set-action/set-action-evidence-two')

  } else {

    //Routes for tagged documents linked to Evidence number 2
        console.log('/sprint-28/evidence-detail-two', req.session.data)
        const name = req.session.data['evidence-query']
        const pageURL = req.session.data['page-URL'][1]['contact-claimant-page']
        console.log(pageURL)
        const section = req.session.data.source

        const conditionsEvidence = req.session.data.conditionsEvidence || []
        conditionsEvidence.push({ name, section, pageURL })
        req.session.data.conditionsEvidence = conditionsEvidence
        res.redirect('/sprint-28/tagging-two')
    }
    })

    router.post('/sprint-28/tagging-two', (req, res, next) => {
      console.log('this is evidence two')
      console.log(req.session.data)
      req.session.data.conditionsEvidence[req.session.data.conditionsEvidence.length - 1].evidence = req.session.data['evidence-query']
      req.session.data.conditionsEvidence[req.session.data.conditionsEvidence.length - 1].action = req.session.data['conditions']
      req.session.data.conditionsEvidence[req.session.data.conditionsEvidence.length - 1].page = req.session.data['page-URL'][1]['contact-claimant-page']
      console.log(1, req.session.data.conditionsEvidence)
      res.redirect('/sprint-28/evidence-detail-two')
    })

// follow up route for linking queries to evidence number 1
router.post('/sprint-28/set-action/set-action-evidence', (req, res, next) => {
  console.log('this is evidence query')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-28/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-28/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-28/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-28/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-28/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-28/none-these-action';
    break;
  }

  req.session.data.queriesEvidence[req.session.data.queriesEvidence.length - 1].evidence = req.session.data['evidence-query']
  req.session.data.queriesEvidence[req.session.data.queriesEvidence.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesEvidence[req.session.data.queriesEvidence.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-28/task-list')
})


// follow up route for linking queries to evidence number 2*****************************************************************************************
router.post('/sprint-28/set-action/set-action-evidence-two', (req, res, next) => {
  console.log('this is evidence query')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-28/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-28/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-28/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-28/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-28/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-28/none-these-action';
    break;
  }

  req.session.data.queriesEvidence[req.session.data.queriesEvidence.length - 1].evidence = req.session.data['evidence-query']
  req.session.data.queriesEvidence[req.session.data.queriesEvidence.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesEvidence[req.session.data.queriesEvidence.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-28/evidence-detail-two')
})





//Routes for queries appearing on action page

router.post('/sprint-28/contact-claimant-action', (req, res, next) => {
  console.log('/sprint-28/contact-claimant-action', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-28/contact-claimant-action')
})

router.post('/sprint-28/contact-claimant-action', (req, res, next) => {
  console.log('this is contact claimant action')
  console.log(req.session.data)
  req.session.data.queries[req.session.data.queries.length - 1].contentQ = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  console.log(1, req.session.data)
  res.redirect('/sprint-28/contact-claimant-action')
})

//Routes for query condtion1

router.post('/sprint-28/condition-one', (req, res, next) => {
  console.log('/sprint-28/condition-one', req.session.data)
  const name = req.session.data['condition-query']
  const section = req.session.data.source
  const queriesCondition = req.session.data.queriesCondition || []
  queriesCondition.push({ name, section })
  req.session.data.queriesCondition = queriesCondition
  res.redirect('/sprint-28/set-action/set-action-condition-one')
})

router.post('/sprint-28/set-action/set-action-condition-one', (req, res, next) => {
  console.log('this is condition one')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-28/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-28/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-28/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-28/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-28/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-28/none-these-action';
    break;
  }

  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].content = req.session.data['condition-query']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-28/condition-one')
})

//Routes for query condtion2

router.post('/sprint-28/condition-two', (req, res, next) => {
  console.log('/sprint-28/condition-two', req.session.data)
  const name = req.session.data['condition-query']
  const section = req.session.data.source
  const queriesCondition = req.session.data.queriesCondition || []
  queriesCondition.push({ name, section })
  req.session.data.queriesCondition = queriesCondition
  res.redirect('/sprint-28/set-action/set-action-condition-two')
})

router.post('/sprint-28/set-action/set-action-condition-two', (req, res, next) => {
  console.log('this is condition two')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-28/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-28/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-28/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-28/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-28/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-28/none-these-action';
    break;
  }

  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].content = req.session.data['condition-query']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-28/condition-two')
})

//Routes for query condtion3

router.post('/sprint-28/condition-three', (req, res, next) => {
  console.log('/sprint-28/condition-three', req.session.data)
  const name = req.session.data['condition-query']
  const section = req.session.data.source
  const queriesCondition = req.session.data.queriesCondition || []
  queriesCondition.push({ name, section })
  req.session.data.queriesCondition = queriesCondition
  res.redirect('/sprint-28/set-action/set-action-condition-three')
})

router.post('/sprint-28/set-action/set-action-condition-three', (req, res, next) => {
  console.log('this is condition three')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-28/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-28/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-28/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-28/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-28/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-28/none-these-action';
    break;
  }

  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].content = req.session.data['condition-query']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-28/condition-three')
})

//Routes for query condtion4

router.post('/sprint-28/condition-four', (req, res, next) => {
  console.log('/sprint-28/condition-four', req.session.data)
  const name = req.session.data['condition-query']
  const section = req.session.data.source
  const queriesCondition = req.session.data.queriesCondition || []
  queriesCondition.push({ name, section })
  req.session.data.queriesCondition = queriesCondition
  res.redirect('/sprint-28/set-action/set-action-condition-four')
})

router.post('/sprint-28/set-action/set-action-condition-four', (req, res, next) => {
  console.log('this is condition four')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-28/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-28/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-28/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-28/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-28/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-28/none-these-action';
    break;
  }

  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].content = req.session.data['condition-query']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-28/task-list')
})

//Routes for query condtion5

router.post('/sprint-28/condition-five', (req, res, next) => {
  console.log('/sprint-28/condition-five', req.session.data)
  const name = req.session.data['condition-query']
  const section = req.session.data.source
  const queriesCondition = req.session.data.queriesCondition || []
  queriesCondition.push({ name, section })
  req.session.data.queriesCondition = queriesCondition
  res.redirect('/sprint-28/set-action/set-action-condition-five')
})

router.post('/sprint-28/set-action/set-action-condition-five', (req, res, next) => {
  console.log('this is condition five')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-28/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-28/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-28/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-28/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-28/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-28/none-these-action';
    break;
  }

  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].content = req.session.data['condition-query']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-28/condition-five')
})

//Routes for query condtion6

router.post('/sprint-28/condition-six', (req, res, next) => {
  console.log('/sprint-28/condition-six', req.session.data)
  const name = req.session.data['condition-query']
  const section = req.session.data.source
  const queriesCondition = req.session.data.queriesCondition || []
  queriesCondition.push({ name, section })
  req.session.data.queriesCondition = queriesCondition
  res.redirect('/sprint-28/set-action/set-action-condition-six')
})

router.post('/sprint-28/set-action/set-action-condition-six', (req, res, next) => {
  console.log('this is condition six')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-28/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-28/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-28/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-28/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-28/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-28/none-these-action';
    break;
  }

  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].content = req.session.data['condition-query']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-28/condition-six')
})

//Routes for query condtion7

router.post('/sprint-28/condition-seven', (req, res, next) => {
  console.log('/sprint-28/condition-seven', req.session.data)
  const name = req.session.data['condition-query']
  const section = req.session.data.source
  const queriesCondition = req.session.data.queriesCondition || []
  queriesCondition.push({ name, section })
  req.session.data.queriesCondition = queriesCondition
  res.redirect('/sprint-28/set-action/set-action-condition-seven')
})

router.post('/sprint-28/set-action/set-action-condition-seven', (req, res, next) => {
  console.log('this is condition seven')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-28/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-28/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-28/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-28/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-28/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-28/none-these-action';
    break;
  }

  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].content = req.session.data['condition-query']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-28/condition-seven')
})

//Routes for query condtion8

router.post('/sprint-28/condition-eight', (req, res, next) => {
  console.log('/sprint-28/condition-eight', req.session.data)
  const name = req.session.data['condition-query']
  const section = req.session.data.source
  const queriesCondition = req.session.data.queriesCondition || []
  queriesCondition.push({ name, section })
  req.session.data.queriesCondition = queriesCondition
  res.redirect('/sprint-28/set-action/set-action-condition-eight')
})

router.post('/sprint-28/set-action/set-action-condition-eight', (req, res, next) => {
  console.log('this is condition eight')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-28/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-28/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-28/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-28/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-28/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-28/none-these-action';
    break;
  }

  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].content = req.session.data['condition-query']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-28/condition-eight')
})

// sprint 27 //***********************************************************************************************************

//Create query preparing food activity
// router.post('/sprint-27/activities/preparing-food', (req, res, next) => {
router.post('/sprint-27/activities/preparing-food', (req, res, next) => {
  console.log('/sprint-27/activities/preparing-food', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-27/set-action/set-action-preparing-food')
})

router.post('/sprint-27/set-action/set-action-preparing-food', (req, res, next) => {
  console.log('this is preparing food')
  console.log(req.session.data)
  const section = req.session.data.source
  let href;


  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-27/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-27/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-27/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-27/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-27/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-27/none-these-action';
    break;
  }
  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  req.session.data.queries[req.session.data.queries.length - 1].section = section;
  console.log(1, req.session.data)
  res.redirect('/sprint-27/activities/preparing-food')
})


//Create query taking nutrition activity
router.post('/sprint-27/activities/taking-nutrition', (req, res, next) => {
  console.log('/sprint-27/activities/taking-nutrition', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-27/set-action/set-action-taking-nutrition')
})

router.post('/sprint-27/set-action/set-action-taking-nutrition', (req, res, next) => {
  console.log('this is taking nutrition')
  console.log(req.session.data)
  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-27/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-27/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-27/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-27/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-27/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-27/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-27/activities/taking-nutrition')
})

//Create query managing therapy activity
router.post('/sprint-27/activities/managing-therapy', (req, res, next) => {
  console.log('/sprint-27/activities/managing-therapy', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-27/set-action/set-action-managing-therapy')
})

router.post('/sprint-27/set-action/set-action-managing-therapy', (req, res, next) => {
  console.log('this is managing therapy')
  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-27/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-27/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-27/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-27/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-27/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-27/none-these-action';
    break;
  }

  console.log(req.session.data)
  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-27/activities/managing-therapy')
})

//Create query washing and bathing activity
router.post('/sprint-27/activities/washing-and-bathing', (req, res, next) => {
  console.log('/sprint-27/activities/washing-and-bathing', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-27/set-action/set-action-washing-and-bathing')
})

router.post('/sprint-27/set-action/set-action-washing-and-bathing', (req, res, next) => {
  console.log('this is washing and bathing')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-27/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-27/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-27/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-27/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-27/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-27/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-27/activities/washing-and-bathing')
})

//Create query managing toilet needs activity
router.post('/sprint-27/activities/managing-toilet-needs', (req, res, next) => {
  console.log('/sprint-27/activities/managing-toilet-needs', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-27/set-action/set-action-managing-toilet-needs')
})

router.post('/sprint-27/set-action/set-action-managing-toilet-needs', (req, res, next) => {
  console.log('this is managing toilet needs')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-27/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-27/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-27/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-27/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-27/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-27/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-27/activities/managing-toilet-needs')
})

//Create query dressing and undressing activity
router.post('/sprint-27/activities/dressing-and-undressing', (req, res, next) => {
  console.log('/sprint-27/activities/dressing-and-undressing', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-27/set-action/set-action-dressing-and-undressing')
})

router.post('/sprint-27/set-action/set-action-dressing-and-undressing', (req, res, next) => {
  console.log('this is dressing and undressing')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-27/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-27/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-27/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-27/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-27/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-27/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-27/activities/dressing-and-undressing')
})

//Create query communicating verbally activity
router.post('/sprint-27/activities/communicating-verbally', (req, res, next) => {
  console.log('/sprint-27/activities/communicating-verbally', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-27/set-action/set-action-communicating-verbally')
})

router.post('/sprint-27/set-action/set-action-communicating-verbally', (req, res, next) => {
  console.log('this is communicating verbally')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-27/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-27/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-27/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-27/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-27/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-27/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-27/activities/communicating-verbally')
})

//Create query reading and understanding activity
router.post('/sprint-27/activities/reading-and-understanding', (req, res, next) => {
  console.log('/sprint-27/activities/reading-and-understanding', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-27/set-action/set-action-reading-and-understanding')
})

router.post('/sprint-27/set-action/set-action-reading-and-understanding', (req, res, next) => {
  console.log('this is reading and understanding')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-27/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-27/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-27/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-27/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-27/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-27/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-27/activities/reading-and-understanding')
})

//Create query engaging face to face activity
router.post('/sprint-27/activities/engaging-face-to-face', (req, res, next) => {
  console.log('/sprint-27/activities/engaging-face-to-face', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-27/set-action/set-action-engage-face-to-face')
})

router.post('/sprint-27/set-action/set-action-engage-face-to-face', (req, res, next) => {
  console.log('this is engaging face to face')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-27/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-27/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-27/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-27/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-27/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-27/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-27/activities/engaging-face-to-face')
})

//Create query budgeting activity
router.post('/sprint-27/activities/budgeting', (req, res, next) => {
  console.log('/sprint-27/activities/budgeting', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-27/set-action/set-action-budgeting')
})

router.post('/sprint-27/set-action/set-action-budgeting', (req, res, next) => {
  console.log('this is budgeting')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-27/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-27/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-27/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-27/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-27/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-27/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-27/activities/budgeting')
})

//Create query planning and following journeys activity
router.post('/sprint-27/activities/planning-and-following-journeys', (req, res, next) => {
  console.log('/sprint-27/activities/planning-and-following-journeys', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-27/set-action/set-action-planning-and-following-journeys')
})

router.post('/sprint-27/set-action/set-action-planning-and-following-journeys', (req, res, next) => {
  console.log('this is planning and following journeys')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-27/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-27/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-27/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-27/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-27/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-27/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-27/activities/planning-and-following-journeys')
})

//Create query moving around activity
router.post('/sprint-27/activities/moving-around', (req, res, next) => {
  console.log('/sprint-27/activities/moving-around', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-27/set-action/set-action-moving-around')
})

router.post('/sprint-27/set-action/set-action-moving-around', (req, res, next) => {
  console.log('this is moving around')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-27/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-27/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-27/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-27/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-27/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-27/none-these-action';
    break;
  }

  req.session.data.queries[req.session.data.queries.length - 1].content = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  req.session.data.queries[req.session.data.queries.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-27/activities/moving-around')
})

//**************************************************************************************************************************************
//Routes for queries linked to Evidence number 1

router.post('/sprint-27/evidence-detail', (req, res, next) => {
    if (req.session.data['tagging-evidence'] == "evidence-query" ) {
      console.log('/sprint-27/evidence-detail', req.session.data)
      const name = req.session.data['evidence-query']
      const section = req.session.data.source

      const queriesEvidence = req.session.data.queriesEvidence || []
      queriesEvidence.push({ name, section })
      req.session.data.queriesEvidence = queriesEvidence
      res.redirect('/sprint-27/set-action/set-action-evidence')

  } else {

    //Routes for tagged documents linked to Evidence
        console.log('/sprint-27/evidence-detail', req.session.data)
        const name = req.session.data['evidence-query']
        const pageURL = req.session.data['page-URL'][1]['contact-claimant-page']
        console.log(pageURL)
        const section = req.session.data.source

        const conditionsEvidence = req.session.data.conditionsEvidence || []
        conditionsEvidence.push({ name, section, pageURL })
        req.session.data.conditionsEvidence = conditionsEvidence
        res.redirect('/sprint-27/tagging')
    }
    })

    router.post('/sprint-27/tagging', (req, res, next) => {
      console.log('this is evidence')
      console.log(req.session.data)
      req.session.data.conditionsEvidence[req.session.data.conditionsEvidence.length - 1].evidence = req.session.data['evidence-query']
      req.session.data.conditionsEvidence[req.session.data.conditionsEvidence.length - 1].action = req.session.data['conditions']
      req.session.data.conditionsEvidence[req.session.data.conditionsEvidence.length - 1].page = req.session.data['page-URL'][1]['contact-claimant-page']
      console.log(1, req.session.data.conditionsEvidence)
      res.redirect('/sprint-27/evidence-detail')
    })

// follow up route for linking queries to evidence number 1
router.post('/sprint-27/set-action/set-action-evidence', (req, res, next) => {
  console.log('this is evidence query')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-27/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-27/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-27/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-27/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-27/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-27/none-these-action';
    break;
  }

  req.session.data.queriesEvidence[req.session.data.queriesEvidence.length - 1].evidence = req.session.data['evidence-query']
  req.session.data.queriesEvidence[req.session.data.queriesEvidence.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesEvidence[req.session.data.queriesEvidence.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-27/evidence-detail')
})


//Routes for queries linked to Evidence number 2

router.post('/sprint-27/evidence-detail-two', (req, res, next) => {
    if (req.session.data['tagging-evidence'] == "evidence-query" ) {
      console.log('/sprint-27/evidence-detail', req.session.data)
      const name = req.session.data['evidence-query']
      const section = req.session.data.source

      const queriesEvidence = req.session.data.queriesEvidence || []
      queriesEvidence.push({ name, section })
      req.session.data.queriesEvidence = queriesEvidence
      res.redirect('/sprint-27/set-action/set-action-evidence-two')

  } else {

    //Routes for tagged documents linked to Evidence number 2
        console.log('/sprint-27/evidence-detail-two', req.session.data)
        const name = req.session.data['evidence-query']
        const pageURL = req.session.data['page-URL'][1]['contact-claimant-page']
        console.log(pageURL)
        const section = req.session.data.source

        const conditionsEvidence = req.session.data.conditionsEvidence || []
        conditionsEvidence.push({ name, section, pageURL })
        req.session.data.conditionsEvidence = conditionsEvidence
        res.redirect('/sprint-27/tagging-two')
    }
    })

    router.post('/sprint-27/tagging-two', (req, res, next) => {
      console.log('this is evidence two')
      console.log(req.session.data)
      req.session.data.conditionsEvidence[req.session.data.conditionsEvidence.length - 1].evidence = req.session.data['evidence-query']
      req.session.data.conditionsEvidence[req.session.data.conditionsEvidence.length - 1].action = req.session.data['conditions']
      req.session.data.conditionsEvidence[req.session.data.conditionsEvidence.length - 1].page = req.session.data['page-URL'][1]['contact-claimant-page']
      console.log(1, req.session.data.conditionsEvidence)
      res.redirect('/sprint-27/evidence-detail-two')
    })

// follow up route for linking queries to evidence number 1
router.post('/sprint-27/set-action/set-action-evidence', (req, res, next) => {
  console.log('this is evidence query')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-27/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-27/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-27/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-27/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-27/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-27/none-these-action';
    break;
  }

  req.session.data.queriesEvidence[req.session.data.queriesEvidence.length - 1].evidence = req.session.data['evidence-query']
  req.session.data.queriesEvidence[req.session.data.queriesEvidence.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesEvidence[req.session.data.queriesEvidence.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-27/task-list')
})


// follow up route for linking queries to evidence number 2*****************************************************************************************
router.post('/sprint-27/set-action/set-action-evidence-two', (req, res, next) => {
  console.log('this is evidence query')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-27/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-27/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-27/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-27/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-27/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-27/none-these-action';
    break;
  }

  req.session.data.queriesEvidence[req.session.data.queriesEvidence.length - 1].evidence = req.session.data['evidence-query']
  req.session.data.queriesEvidence[req.session.data.queriesEvidence.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesEvidence[req.session.data.queriesEvidence.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-27/evidence-detail-two')
})





//Routes for queries appearing on action page

router.post('/sprint-27/contact-claimant-action', (req, res, next) => {
  console.log('/sprint-27/contact-claimant-action', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source
  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-27/contact-claimant-action')
})

router.post('/sprint-27/contact-claimant-action', (req, res, next) => {
  console.log('this is contact claimant action')
  console.log(req.session.data)
  req.session.data.queries[req.session.data.queries.length - 1].contentQ = req.session.data['query-content']
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  console.log(1, req.session.data)
  res.redirect('/sprint-27/contact-claimant-action')
})

//Routes for query condtion1

router.post('/sprint-27/condition-one', (req, res, next) => {
  console.log('/sprint-27/condition-one', req.session.data)
  const name = req.session.data['condition-query']
  const section = req.session.data.source
  const queriesCondition = req.session.data.queriesCondition || []
  queriesCondition.push({ name, section })
  req.session.data.queriesCondition = queriesCondition
  res.redirect('/sprint-27/set-action/set-action-condition-one')
})

router.post('/sprint-27/set-action/set-action-condition-one', (req, res, next) => {
  console.log('this is condition one')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-27/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-27/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-27/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-27/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-27/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-27/none-these-action';
    break;
  }

  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].content = req.session.data['condition-query']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-27/condition-one')
})

//Routes for query condtion2

router.post('/sprint-27/condition-two', (req, res, next) => {
  console.log('/sprint-27/condition-two', req.session.data)
  const name = req.session.data['condition-query']
  const section = req.session.data.source
  const queriesCondition = req.session.data.queriesCondition || []
  queriesCondition.push({ name, section })
  req.session.data.queriesCondition = queriesCondition
  res.redirect('/sprint-27/set-action/set-action-condition-two')
})

router.post('/sprint-27/set-action/set-action-condition-two', (req, res, next) => {
  console.log('this is condition two')
  console.log(req.session.data)

  let href;  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-27/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-27/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-27/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-27/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-27/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-27/none-these-action';
    break;
  }

  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].content = req.session.data['condition-query']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-27/condition-two')
})

//Routes for query condtion3
router.post('/sprint-27/condition-three', (req, res, next) => {
  console.log('/sprint-27/condition-three', req.session.data)
  const name = req.session.data['condition-query']
  const section = req.session.data.source
  const queriesCondition = req.session.data.queriesCondition || []
  queriesCondition.push({ name, section })
  req.session.data.queriesCondition = queriesCondition
  res.redirect('/sprint-27/set-action/set-action-condition-three')
})

router.post('/sprint-27/set-action/set-action-condition-three', (req, res, next) => {
  console.log('this is condition three')
  console.log(req.session.data)

  let href;
  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-27/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-27/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-27/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-27/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-27/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-27/none-these-action';
    break;
  }

  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].content = req.session.data['condition-query']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-27/condition-three')
})

//Routes for query condtion4

router.post('/sprint-27/condition-four', (req, res, next) => {
  console.log('/sprint-27/condition-four', req.session.data)
  const name = req.session.data['condition-query']
  const section = req.session.data.source
  const queriesCondition = req.session.data.queriesCondition || []
  queriesCondition.push({ name, section })
  req.session.data.queriesCondition = queriesCondition
  res.redirect('/sprint-27/set-action/set-action-condition-four')
})

router.post('/sprint-27/set-action/set-action-condition-four', (req, res, next) => {
  console.log('this is condition four')
  console.log(req.session.data)

  let href;  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-27/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-27/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-27/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-27/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-27/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-27/none-these-action';
    break;
  }

  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].content = req.session.data['condition-query']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-27/task-list')
})

//Routes for query condtion5

router.post('/sprint-27/condition-five', (req, res, next) => {
  console.log('/sprint-27/condition-five', req.session.data)
  const name = req.session.data['condition-query']
  const section = req.session.data.source
  const queriesCondition = req.session.data.queriesCondition || []
  queriesCondition.push({ name, section })
  req.session.data.queriesCondition = queriesCondition
  res.redirect('/sprint-27/set-action/set-action-condition-five')
})

router.post('/sprint-27/set-action/set-action-condition-five', (req, res, next) => {
  console.log('this is condition five')
  console.log(req.session.data)

  let href;
  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-27/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-27/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-27/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-27/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-27/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-27/none-these-action';
    break;
  }

  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].content = req.session.data['condition-query']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-27/condition-five')
})

//Routes for query condtion6

router.post('/sprint-27/condition-six', (req, res, next) => {
  console.log('/sprint-27/condition-six', req.session.data)
  const name = req.session.data['condition-query']
  const section = req.session.data.source
  const queriesCondition = req.session.data.queriesCondition || []
  queriesCondition.push({ name, section })
  req.session.data.queriesCondition = queriesCondition
  res.redirect('/sprint-27/set-action/set-action-condition-six')
})

router.post('/sprint-27/set-action/set-action-condition-six', (req, res, next) => {
  console.log('this is condition six')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-27/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-27/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-27/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-27/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-27/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-27/none-these-action';
    break;
  }

  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].content = req.session.data['condition-query']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-27/condition-six')
})

//Routes for query condtion7

router.post('/sprint-27/condition-seven', (req, res, next) => {
  console.log('/sprint-27/condition-seven', req.session.data)
  const name = req.session.data['condition-query']
  const section = req.session.data.source
  const queriesCondition = req.session.data.queriesCondition || []
  queriesCondition.push({ name, section })
  req.session.data.queriesCondition = queriesCondition
  res.redirect('/sprint-27/set-action/set-action-condition-seven')
})

router.post('/sprint-27/set-action/set-action-condition-seven', (req, res, next) => {
  console.log('this is condition seven')
  console.log(req.session.data)

  let href;

  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-27/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-27/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-27/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-27/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-27/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-27/none-these-action';
    break;
  }

  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].content = req.session.data['condition-query']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-27/condition-seven')
})

//Routes for query condtion8

router.post('/sprint-27/condition-eight', (req, res, next) => {
  console.log('/sprint-27/condition-eight', req.session.data)
  const name = req.session.data['condition-query']
  const section = req.session.data.source
  const queriesCondition = req.session.data.queriesCondition || []
  queriesCondition.push({ name, section })
  req.session.data.queriesCondition = queriesCondition
  res.redirect('/sprint-27/set-action/set-action-condition-eight')
})

router.post('/sprint-27/set-action/set-action-condition-eight', (req, res, next) => {
  console.log('this is condition eight')
  console.log(req.session.data)

  let href;
  switch (req.session.data['set-an-action']) {
    case('The claimant'):
    href = '/sprint-27/contact-claimant-action';
    break;
    case("The claimant's doctor"):
    href = '/sprint-27/contact-hcp1-action';
    break;
    case("The claimant's urologist"):
    href = '/sprint-27/contact-hcp2-action';
    break;
    case("The claimant's consultant clinical urologist"):
    href = '/sprint-27/contact-hcp3-action';
    break;
    case('VAL'):
    href = '/sprint-27/contact-val-action';
    break;
    case('Resolve this issue another way'):
    href = '/sprint-27/none-these-action';
    break;
  }

  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].content = req.session.data['condition-query']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action = req.session.data['set-an-action']
  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].href = href;
  console.log(1, req.session.data)
  res.redirect('/sprint-27/condition-eight')
})


// sprint 24 and 25 // *****************************************************************************************************************
router.post('/sprint-24-25/queries/create-query', (req, res, next) => {
  console.log('/sprint-24-25/queries/create-query', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source

  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('/sprint-24-25/set-action/set-action-preparing-food')
})

router.post('/sprint-24-25/set-action/set-action-preparing-food', (req, res, next) => {
  console.log('this is preparing food')
  console.log(req.session.data)
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  console.log(1, req.session.data)
  res.redirect('/sprint-24-25/task-list')
})
