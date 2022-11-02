class PagesController < ApplicationController
    skip_before_action :verify_authenticity_token, only: [:submit_lead, :download_brocher]
    # before_action :download_brocher, only: [:thankyou]


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
        uri = URI("https://dukeleads.leadbyte.co.uk/api/submit.php?returnjson=yes&campid=GCC-REALTORS&email=#{params[:email]}&firstname=#{params[:first_name]}&lastname=#{params[:last_name]}&phone1=#{params[:phone]}&sid=#{params[:sid]}&project=#{params[:project]}&propertytype=#{params[:propertytype]}&area=#{params[:area]}&purchasepurpose=#{params[:purchasepurpose]}&budget=#{params[:budget]}&phonecode=#{params[:phonecode]}&phonelocal=#{params[:phone]}&sid=#{params[:sid]}&optinurl=#{"https://gccrealtors.com/" + params[:project1]}")
        res = Net::HTTP.get_response(uri)

        redirect_to "/thankyou/?project=#{params[:project]}&project1=#{params[:project1]}"
    end

    def download_brocher
        if !params[:project1].blank?
            send_file(
            "#{Rails.root}/pdf/#{params[:project1]}.pdf",
            filename: "#{params[:project1]}.pdf",
            type: "application/pdf",
            disposition: "attachment"
            )
        end
    end
    
end
