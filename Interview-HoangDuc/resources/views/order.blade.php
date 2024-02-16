<!DOCTYPE html>
<html lang="en" >
<head>
    <meta charset="UTF-8">
    <title>CodePen - Multi-step form</title>
    <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'>
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.0.3/css/font-awesome.css'><link rel="stylesheet" href="{{asset('css/style.css')}}">

</head>
<body>
<!-- partial:index.partial.html -->
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-11 col-sm-10 col-md-10 col-lg-6 col-xl-5 text-center p-0 mt-3 mb-2">
            <div class="card px-0 pt-4 pb-0 mt-3 mb-3">
                <h2 id="heading">Order</h2>
                <form id="msform">
                    <div class="progress">
                        <div class="progress-bar progress   -bar-striped progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100"></div>
                    </div> <br> <!-- fieldsets -->
                    <fieldset>
                        <div class="form-card">
                            <div class="row">
                                <div class="col-7">
                                    <h2 class="fs-title"></h2>
                                </div>
                                <div class="col-5">
                                    <h2 class="steps">Step 1 - 4</h2>
                                </div>
                            </div> <label class="fieldlabels">Please Select A Meal: *</label>
                            <br/>
                            <select name="meal" id='meal-categories'>
                                <option value=""></option>
                            </select>
                            <br/>
                            <span id="meal-error" class="error-message"></span> <!-- Thêm thông báo lỗi -->
                            <br/>
                            <label class="fieldlabels">Please Enter Number Of People: *</label>
                            <input type="number" name="numberOfPeople" placeholder="Enter number of people" required min="1" max="10" />
                            <span id="numberOfPeople-error" class="error-message"></span> <!-- Thêm thông báo lỗi -->
                        </div>
                        <input type="button" name="next" class="next action-button step1" value="Next" />
                    </fieldset>
                    <fieldset>
                        <div class="form-card">
                            <div class="row">
                                <div class="col-7">
                                    <h2 class="fs-title"></h2>
                                </div>
                                <div class="col-5">
                                    <h2 class="steps">Step 2 - 4</h2>
                                </div>
                            </div>
                            <label class="fieldlabels">Please Select A Restaurant: *</label>
                            <br/>
                            <select name="restaurant" id="restaurant" required>
                                   <option value=""></option>
                            </select>
                            <br/>
                            <span id="restaurant-error" class="error-message"></span> <!-- Thêm thông báo lỗi -->
                            <br/>
                        </div>
                        <input type="button" name="next" class="next action-button step2" value="Next" />
                        <input type="button" name="previous" class="previous action-button-previous" value="Previous" />
                    </fieldset>
                    <fieldset>
                        <div class="form-card">
                            <div class="row">
                                <div class="col-7">
                                    <h2 class="fs-title"></h2>
                                </div>
                                <div class="col-5">
                                    <h2 class="steps">Step 3 - 4</h2>
                                </div>
                            </div>
                            <div id='main_content'>
                                <div id="content-clone-0">
                                    <label class="fieldlabels">Please Select A Dish: *</label>
                                    <br/>
                                    <select name="dishes" class='dishes' required>
                                        <option value=""></option>
                                    </select>
                                    <br/>
                                    <span id="dishes-error" class="error-message"></span> <!-- Thêm thông báo lỗi -->
                                    <br/>
                                    <label class="fieldlabels">Please Enter No. Of Servings: *</label>
                                    <input type="number" name="numberOfDishes" class="numberOfDishes" placeholder="Enter number of dishes" required min="1" max="10" />
                                    <span id="numberOfDishes-error" class="error-message"></span> <!-- Thêm thông báo lỗi -->
                                </div>
                            </div>
                            <button type='button' class='button_add'>
                                Add items
                            </button>
                        </div>
                        <input type="button" name="next" class="next action-button step3" value="Next" />
                        <input type="button" name="previous" class="previous action-button-previous" value="Previous" />
                    </fieldset>
                    <fieldset>
                        <div class="form-card">
                            <div class="row">
                                <div class="col-7">
                                    <h2 class="fs-title"></h2>
                                </div>
                                <div class="col-5">
                                    <h2 class="steps">Review</h2>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-7">
                                    <h2 class="fs-title">Meal:</h2>
                                </div>
                                <div class="col-5">
                                    <h2 class="preview meal-pre"></h2>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-7">
                                    <h2 class="fs-title">No. Of People:</h2>
                                </div>
                                <div class="col-5">
                                    <h2 class="preview no-of-people-pre"></h2>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-7">
                                    <h2 class="fs-title">Restaurant:</h2>
                                </div>
                                <div class="col-5">
                                    <h2 class="preview restaurant-pre"></h2>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-7">
                                    <h2 class="fs-title">Dishes:</h2>
                                </div>
                                <div class="col-5">
                                    <p class="preview-h2 dishes-pre"></p>
                                </div>
                            </div>
                        </div>
                        <input type="button" name="next" class="next action-button submit step4" value="Submit"/>
                        <input type="button" name="previous" class="previous action-button-previous step4-previous" value="Previous" />
                    </fieldset>
                    <fieldset>
                        <div class="form-card">
                            <div class="row">
                                <div class="col-7">
                                    <h2 class="fs-title">Finish:</h2>
                                </div>
                                <div class="col-5">
                                    <h2 class="steps"></h2>
                                </div>
                            </div> <br><br>
                            <h2 class="purple-text text-center"><strong>SUCCESS !</strong></h2> <br>
                            <div class="row justify-content-center">
                                <div class="col-3"> <img src="https://i.imgur.com/GwStPmg.png" class="fit-image"> </div>
                            </div> <br><br>
                            <div class="row justify-content-center">
                                <div class="col-7 text-center">
                                    <h5 class="purple-text text-center">You Have Successfully Orders</h5>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
</div>
<!-- partial -->
<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js'></script><script  src="{{asset('js/script.js')}}"></script>

</body>
</html>
