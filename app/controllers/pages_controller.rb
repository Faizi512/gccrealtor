class PagesController < ApplicationController
    skip_before_action :verify_authenticity_token, only: [:submit_lead]


    def index
    end

    def chictower
    end

    def jumeriah
    end

    def thankyou
    end

    def peninsula
    end

    def submit_lead
        uri = URI("https://dukeleads.leadbyte.co.uk/api/submit.php?returnjson=yes&campid=GCC-REALTORS&email=#{params[:email]}&firstname=#{params[:first_name]}&lastname=#{params[:last_name]}&phone1=#{params[:phone]}&sid=#{params[:sid]}&project=#{params[:project]}&propertytype=#{params[:propertytype]}&area=#{params[:area]}&purchasepurpose=#{params[:purchasepurpose]}&budget=#{params[:budget]}&phonecode=#{params[:phonecode]}&phonelocal=#{params[:phone]}&sid=#{params[:sid]}&optinurl=#{"https://gccrealtors.com/" + request.fullpath}")
        res = Net::HTTP.get_response(uri)
        # if JSON.parse(res.body)["code"] == 1
        #     redirect_to "/thankyou"
        # else
        #     flash[:notice]="something went wrong while submitting the form."
        #     if params[:project] == "homepage"
        #         redirect_to "/"
        #     else
        #         redirect_to "/#{params[:project]}"
        #     end
        # end
        redirect_to "/thankyou"
    end
    
end
