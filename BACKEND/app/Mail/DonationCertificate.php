<?php

// app/Mail/DonationCertificate.php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class DonationCertificate extends Mailable
{
    use Queueable, SerializesModels;

    public $datosCorreo;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($datosCorreo, $rutaPdf)
    {
        
        $this->rutaPdf = $rutaPdf;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('noreply@procreditec.com', 'Banco ProCredit')
            ->subject('🌳 Certificado Chaquiñán 6K - Banco Procredit')
            ->view('emails.donation_certificate')
            ->attach($this->rutaPdf, [
                'as' => 'certificado.pdf',
                'mime' => 'application/pdf',
            ]);
    }
}